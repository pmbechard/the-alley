export interface Product {
  name: string;
  price: number;
  description: string;
  img: string;
  tags: string[];
  quantity?: number;
}

export interface ModifiedProduct {
  name?: string;
  price?: number;
  description?: string;
  img?: string;
  tags?: string[];
}
