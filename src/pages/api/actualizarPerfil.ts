import { parse } from "cookie";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL,
});

export async function post({ request }: { request: Request }) {
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
  const genero = formData.get("genero");
  const direccion = formData.get("direccion");
  const biografia = formData.get("biografia");
  const twitter = formData.get("twitter");
  const instagram = formData.get("instagram");
  const linkedin = formData.get("linkedin");
  const github = formData.get("github");

  try {
    await pool.query(`
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
        github = $12
      WHERE id = $13
    `, [
      nombre, apellido, email, telefono,
      fecha_nacimiento, genero, direccion,
      biografia, twitter, instagram, linkedin,
      github, sessionId
    ]);

    return Response.redirect("/perfil", 303);
  } catch (err) {
    console.error("Error al actualizar perfil:", err);
    return new Response("Error del servidor", { status: 500 });
  }
}
