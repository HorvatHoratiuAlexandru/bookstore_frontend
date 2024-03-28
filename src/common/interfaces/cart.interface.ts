export interface CartData {
  [key: string]: CartItem;
}

export interface CartItem {
  amount: number;
  title: string;
  price: number;
  img: string;
}
