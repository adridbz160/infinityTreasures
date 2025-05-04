import { serialize } from 'cookie';
import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const headers = new Headers();

  // Eliminar la cookie 'session' para cerrar la sesión
  headers.append(
    'Set-Cookie',
    serialize('session', '', {
      path: '/',
      httpOnly: true,
      maxAge: -1, // La cookie se elimina
    })
  );

  // Crear una respuesta que redirige al usuario a la página de acceso
  const response = new Response(null, {
    status: 302, // Código de estado para redirección
    headers: {
      Location: '/acceso', // Redirigir al usuario a la página de acceso
      ...Object.fromEntries(headers), // Añadir las cabeceras (como la cookie eliminada)
    },
  });

  return response;
};
