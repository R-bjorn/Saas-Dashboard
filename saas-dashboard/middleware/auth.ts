import { adminAuth } from "@/lib/firebaseAdmin";
import { adminDb } from "@/lib/firebaseAdmin";

export async function verifyUser(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split("Bearer ")[1];

  const decoded = await adminAuth.verifyIdToken(token);

  const userDoc = await adminDb.collection("users").doc(decoded.uid).get();

  return {
    uid: decoded.uid,
    ...userDoc.data(),
  };
}

export function requireRole(user: any, role: string) {
  if (user.role !== role) {
    throw new Error("Forbidden");
  }
}