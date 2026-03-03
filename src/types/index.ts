export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}
