import type { APIRoute } from "astro";
import bcrypt from "bcrypt";
import { Pool } from "pg";
import { serialize } from "cookie";

const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL,
});

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email")?.toString();
  const contraseña = form.get("contraseña")?.toString();

  if (!email || !contraseña) {
    return new Response("Faltan datos", { status: 400 });
  }

  try {
    // Consulta para obtener al usuario por el email
    const res = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    const usuario = res.rows[0];

    // Verificar si el usuario existe
    if (!usuario) {
      return new Response("Usuario no encontrado", { status: 404 });
    }

    // Comparar la contraseña ingresada con la hasheada
    const contrasenaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    
    if (!contrasenaValida) {
      return new Response("Credenciales incorrectas", { status: 401 });
    }

    // Si las credenciales son correctas, generar la cookie
    const cookie = serialize("session", usuario.id.toString(), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      sameSite: "strict",
    });

    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": cookie,
        Location: "/perfil", // Redirigir al perfil después de iniciar sesión
      },
    });

  } catch (err) {
    console.error("Error al acceder a la base de datos:", err);
    return new Response("Error interno del servidor", { status: 500 });
  }
};
