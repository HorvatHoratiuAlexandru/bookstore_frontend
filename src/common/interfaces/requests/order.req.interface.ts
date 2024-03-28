export interface PlaceOrderDataReq {
  address: string;
  promoCode?: string;
  items: {
    [itemId: string]: number;
  };
}
