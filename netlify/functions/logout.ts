import { serialize } from "cookie";

export const handler = async () => {
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

  return {
    statusCode: 302,
    headers: {
      "Set-Cookie": headers.get("Set-Cookie")!,
      Location: "/acceso",
    },
  };
};
