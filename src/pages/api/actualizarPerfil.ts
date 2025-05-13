import type { APIRoute } from "astro";
import { parse } from "cookie";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL,
});

export const POST: APIRoute = async ({ request }) => {
  const cookies = parse(request.headers.get("cookie") || "");
  const sessionId = cookies.session;

  if (!sessionId) {
    return new Response("No autorizado", { status: 401 });
  }

  const formData = await request.formData();
  const nombre = formData.get("nombre");
  const apellido = formData.get("apellido");
  const email = formData.get("email");
  const telefono = formData.get("telefono");
  const fecha_nacimiento = formData.get("nacimiento");
  const genero = formData.get("genero") || "";
  const direccion = formData.get("direccion");
  const biografia = formData.get("biografia");
  const twitter = formData.get("twitter");
  const instagram = formData.get("instagram");
  const linkedin = formData.get("linkedin");
  const github = formData.get("github");

  // Obtener el Base64 de la foto de perfil (si está presente)
  const foto_perfil = formData.get("foto_perfil")?.toString() || null;

  try {
    // Actualizar los datos del usuario en la base de datos
    await pool.query(
      `
      UPDATE usuarios SET
        nombre = $1,
        apellido = $2,
        email = $3,
        telefono = $4,
        fecha_nacimiento = $5,
        genero = $6,
        direccion = $7,
        biografia = $8,
        twitter = $9,
        instagram = $10,
        linkedin = $11,
        github = $12,
        foto_perfil = $13
      WHERE id = $14
    `,
      [
        nombre,
        apellido,
        email,
        telefono,
        fecha_nacimiento,
        genero,
        direccion,
        biografia,
        twitter,
        instagram,
        linkedin,
        github,
        foto_perfil, // Guardamos la foto en Base64
        sessionId,
      ]
    );

    return new Response(null, {
      status: 303,
      headers: {
        Location: "/perfil", // Redirigimos al perfil después de guardar
      },
    });
  } catch (err) {
    console.error("Error al actualizar perfil:", err);
    return new Response("Error del servidor", { status: 500 });
  }
};
