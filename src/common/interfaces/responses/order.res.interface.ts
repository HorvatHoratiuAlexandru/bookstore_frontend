export interface PlaceOrderDataRes {
  orderId: number;
  isPayed: boolean;
  total: number;
}

export interface GetOrdersDataRes {
  id: number;
  date: Date;
  totalPrice: number;
  items: OrdersResItemData;
  address: string;
  promoCode: string;
  isPayed: boolean;
  isProcessed: boolean;
  isFinished: boolean;
}

interface OrdersResItemData {
  [key: string]: number;
}
