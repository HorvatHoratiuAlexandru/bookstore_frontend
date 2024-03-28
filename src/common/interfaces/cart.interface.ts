export interface CartData {
  [key: string]: CartItem;
}

export interface CartItem {
  ammount: number;
  title: string;
  price: number;
  img: string;
}
