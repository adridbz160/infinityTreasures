import type { APIRoute } from 'astro';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL,
});

export const POST: APIRoute = async ({ request }) => {
  const form = await request.json(); // ← usamos JSON, no formData

  const { nombre_usuario, nombre, apellido, email, contraseña } = form;

  if (!nombre_usuario || !nombre || !apellido || !email || !contraseña) {
    return new Response(JSON.stringify({ success: false, message: 'Faltan campos obligatorios' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const hash = await bcrypt.hash(contraseña, 10);

  try {
    await pool.query(
      `INSERT INTO usuarios (nombre_usuario, nombre, apellido, email, contraseña) 
       VALUES ($1, $2, $3, $4, $5)`,
      [nombre_usuario, nombre, apellido, email, hash]
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(JSON.stringify({ success: false, message: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Error desconocido' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
};
