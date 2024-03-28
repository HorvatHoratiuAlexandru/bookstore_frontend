import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ShoppingCart = () => {
  const cartData = useSelector((rootState: RootState) => rootState.cartData);

  return <Typography>{JSON.stringify(cartData)}</Typography>;
};

export default ShoppingCart;
