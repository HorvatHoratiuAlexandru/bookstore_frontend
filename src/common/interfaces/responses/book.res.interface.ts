export interface bookData {
  id: number;
  title: string;
  description: string;
  pageNumber: number;
  price: number;
  stock: number;
  grade: string;
  authors: string[]; // Assuming authors are represented as strings
  tags: string[];
  images: string[];
}
