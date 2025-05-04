// import { parse } from 'cookie';
// import type { APIRoute } from 'astro';

// export const GET: APIRoute = async ({ request, redirect }) => {
//   const cookies = parse(request.headers.get('cookie') || '');
//   const session = cookies.session; // Verifica si hay sesión activa

//   if (!session) {
//     // Si no está logueado, redirigimos a la página de acceso
//     return redirect('/acceso');
//   }

//   // Si está logueado, mostramos el perfil
//   return new Response(
//     `
//       <!DOCTYPE html>
//       <html lang="es">
//         <head><title>Perfil</title></head>
//         <body>
//           <h1>Bienvenido a tu perfil</h1>
//           <a href="/api/logout">Cerrar sesión</a>
//         </body>
//       </html>
//     `,
//     { headers: { 'Content-Type': 'text/html' } }
//   );
// };
