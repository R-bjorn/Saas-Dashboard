export type Product = {
  id?: string;
  name: string;
  category: string;
  price: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt?: Date;
};