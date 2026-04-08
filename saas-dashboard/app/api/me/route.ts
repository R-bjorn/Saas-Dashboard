import { verifyUser } from "@/middleware/auth";

export async function GET(req: Request) {
  const user = await verifyUser(req);

  return Response.json({
    uid: user.uid,
    role: user.role,
  });
}