export interface PlaceOrderDataReq {
  address: string;
  promoCode?: string;
  items: {
    [itemId: string]: number;
  };
}

export interface PayOrderDataReq {
  billingName: string;
  cardNumber: string;
  expDate: string;
  cardCode: string;
}
