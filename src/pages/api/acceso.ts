// import { parse } from 'cookie';
// import type { APIRoute } from 'astro';

// export const GET: APIRoute = async ({ request, redirect }) => {
//   const cookies = parse(request.headers.get('cookie') || '');
//   const session = cookies.session; // Verifica si ya está logueado

//   if (session) {
//     // Si está logueado, redirigimos al perfil
//     return redirect('/perfil');
//   }

//   // Si no está logueado, mostramos el formulario de acceso
//   return new Response(
//     await (await fetch(import.meta.env.SITE + '/acceso')).text(), // La página de acceso sigue accesible
//     {
//       headers: { 'Content-Type': 'text/html' },
//     }
//   );
// };
