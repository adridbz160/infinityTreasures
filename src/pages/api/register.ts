// import type { APIRoute } from 'astro';
// import bcrypt from 'bcrypt';
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: import.meta.env.DATABASE_URL,
// });

// export const POST: APIRoute = async ({ request, redirect }) => {
//   const form = await request.formData();

//   const nombre_usuario = form.get('nombre_usuario')?.toString();
//   const nombre = form.get('nombre')?.toString();
//   const apellido = form.get('apellido')?.toString();
//   const email = form.get('email')?.toString();
//   const contraseña = form.get('contraseña')?.toString();

//   if (!nombre_usuario || !nombre || !apellido || !email || !contraseña) {
//     return new Response('Faltan campos obligatorios', { status: 400 });
//   }

//   const hash = await bcrypt.hash(contraseña, 10);

//   try {
//     await pool.query(
//       `INSERT INTO usuarios (nombre_usuario, nombre, apellido, email, contraseña) 
//        VALUES ($1, $2, $3, $4, $5)`,
//       [nombre_usuario, nombre, apellido, email, hash]
//     );

//     return redirect('/');
// } catch (err) {
//     if (err instanceof Error) {
//       return new Response('Error al registrar: ' + err.message, { status: 500 });
//     } else {
//       return new Response('Error desconocido', { status: 500 });
//     }
//   }
// };
