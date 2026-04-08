import { verifyUser, requireRole } from "@/middleware/auth";
import {
  createProductService,
  getProductsService,
  updateProductService,
  deleteProductService,
} from "@/services/productService";

export async function GET(req: Request) {
  const user = await verifyUser(req);

  // both admin + viewer allowed
  const products = await getProductsService();

  return Response.json(products);
}

export async function POST(req: Request) {
  try {
    const user = await verifyUser(req);
    requireRole(user, "admin");

    const body = await req.json();
    const product = await createProductService(body);

    return Response.json(product);
  } catch (err: any) {
    return new Response(err.message, { status: 403 });
  }
}

export async function PUT(req: Request) {
  const user = await verifyUser(req);
  requireRole(user, "admin");

  const { id, ...data } = await req.json();

  await updateProductService(id, data);

  return Response.json({ success: true });
}

export async function DELETE(req: Request) {
  const user = await verifyUser(req);
  requireRole(user, "admin");

  const { id } = await req.json();

  await deleteProductService(id);

  return Response.json({ success: true });
}