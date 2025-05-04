import type { APIRoute } from 'astro';
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { createCanvas } from "canvas";  // Importamos canvas

const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL,
});

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();

  const nombre_usuario = form.get("nombre_usuario")?.toString();
  const nombre = form.get("nombre")?.toString();
  const apellido = form.get("apellido")?.toString();
  const email = form.get("email")?.toString();
  const contraseña = form.get("contraseña")?.toString();

  if (!nombre_usuario || !nombre || !apellido || !email || !contraseña) {
    return new Response("Faltan campos obligatorios", { status: 400 });
  }

  // Generamos la inicial de nombre y apellido
  const iniciales = `${nombre[0]}${apellido[0]}`.toUpperCase();

  // Generamos una imagen con esas iniciales
  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext("2d");

  // Fondo de la imagen (puedes elegir el color que desees)
  ctx.fillStyle = "#4CAF50";  // Color de fondo
  ctx.fillRect(0, 0, 100, 100);

  // Establecemos el color del texto (blanco) y la fuente
  ctx.fillStyle = "#fff";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Dibujamos las iniciales
  ctx.fillText(iniciales, 50, 50);

  // Convertimos la imagen a un Buffer
  const foto_perfil_buffer = canvas.toBuffer("image/png");

  // Hash de la contraseña
  const hash = await bcrypt.hash(contraseña, 10);

  // Guardamos el nuevo usuario en la base de datos, incluyendo la foto de perfil generada
  try {
    await pool.query(
      `INSERT INTO usuarios (nombre_usuario, nombre, apellido, email, contraseña, foto_perfil) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [nombre_usuario, nombre, apellido, email, hash, foto_perfil_buffer]
    );

    return new Response("Usuario registrado correctamente", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error al registrar usuario", { status: 500 });
  }
};
