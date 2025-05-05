import type { APIRoute } from 'astro';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL,
});

export const POST: APIRoute = async ({ request }) => {
  const form = await request.json();

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
  } catch (err: any) {
    if (err.code === '23505') {
      // Error de clave duplicada
      if (err.constraint === 'usuarios_email_key') {
        return new Response(JSON.stringify({ success: false, message: 'Este correo ya está registrado.' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (err.constraint === 'usuarios_nombre_usuario_key') {
        return new Response(JSON.stringify({ success: false, message: 'Este nombre de usuario ya está en uso.' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Cualquier otro error
    return new Response(JSON.stringify({ success: false, message: 'Error al registrar: ' + err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
