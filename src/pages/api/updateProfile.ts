import type { APIRoute } from 'astro';
import { Pool } from "pg";
import { parse } from "cookie";

const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL,
});

export const POST: APIRoute = async ({ request }) => {
  const cookies = parse(request.headers.get("cookie") || "");
  const session = cookies.session;

  if (!session) {
    return new Response("No estás autorizado", { status: 403 });
  }

  const form = await request.formData();
  const id = form.get("id")?.toString();
  const nombre_usuario = form.get("nombre_usuario")?.toString();
  const nombre = form.get("nombre")?.toString();
  const apellido = form.get("apellido")?.toString();
  const email = form.get("email")?.toString();
  const foto_perfil = form.get("foto_perfil");

  // Validación de los campos
  if (!id || !nombre_usuario || !nombre || !apellido || !email) {
    return new Response("Faltan campos obligatorios", { status: 400 });
  }

  let foto_perfil_buffer: Buffer | null = null;
  if (foto_perfil) {
    // Convertir la foto a un buffer binario
    const foto_perfil_file = foto_perfil as File;
    foto_perfil_buffer = Buffer.from(await foto_perfil_file.arrayBuffer());
  }

  // Actualizar los datos en la base de datos
  try {
    await pool.query(
      `UPDATE usuarios SET nombre_usuario = $1, nombre = $2, apellido = $3, email = $4, foto_perfil = $5 WHERE id = $6`,
      [nombre_usuario, nombre, apellido, email, foto_perfil_buffer, id]
    );

    return new Response("Perfil actualizado", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error al actualizar perfil", { status: 500 });
  }
};
