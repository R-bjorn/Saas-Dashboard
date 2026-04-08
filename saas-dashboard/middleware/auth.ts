import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function verifyUser(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split("Bearer ")[1];
  const decoded = await adminAuth.verifyIdToken(token);

  const userRef = adminDb.collection("users").doc(decoded.uid);
  const userDoc = await userRef.get();

  // If user does not exist → create it
  if (!userDoc.exists) {
    await userRef.set({
      role: "viewer",
      email: decoded.email,
      createdAt: new Date(),
    });

    return {
      uid: decoded.uid,
      role: "viewer",
    };
  }

  return {
    uid: decoded.uid,
    ...userDoc.data(),
  };
}

export function requireRole(user: any, role: string) {
  if (!user || user.role !== role) {
    throw new Error("Forbidden");
  }
}