export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export type ProductCart = {
  quantity: number;
} & Product;
