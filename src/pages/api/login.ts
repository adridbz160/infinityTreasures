import type { APIRoute } from "astro";
import bcrypt from "bcrypt";
import { Pool } from "pg";
import { serialize } from "cookie";

const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL,
});

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const email = form.get("email")?.toString();
  const contraseña = form.get("contraseña")?.toString();

  if (!email || !contraseña) {
    return new Response("Faltan datos", { status: 400 });
  }

  const res = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
  const usuario = res.rows[0];

  if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
    return new Response("Credenciales incorrectas", { status: 401 });
  }

  const cookie = serialize("session", usuario.id.toString(), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict", // esto ayuda a Netlify
  });

  return new Response(null, {
    status: 302,
    headers: {
      "Set-Cookie": cookie,
      Location: "/perfil",
    },
  });
};
