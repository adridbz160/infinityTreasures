import { serialize } from "cookie";

export const GET = async () => {
  const headers = new Headers();

  headers.append(
    "Set-Cookie",
    serialize("session", "", {
      httpOnly: true,
      path: "/",
      maxAge: -1,
      sameSite: "strict",
    })
  );

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/acceso",
      ...Object.fromEntries(headers),
    },
  });
};
