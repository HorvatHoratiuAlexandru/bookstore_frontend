import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { BACKEND_BASE_URL } from "../../common/config";
import {
  addByKey,
  removeAllItems,
  removeItem,
} from "../../store/shoppingcart/shoppingcartSlice";

const ShoppingCart = () => {
  const cartData = useSelector((rootState: RootState) => rootState.cartData);
  const dispatch: AppDispatch = useDispatch();

  const handleRemove = (key: string) => {
    dispatch(removeItem(key));
  };

  const handleAdd = (key: string) => {
    dispatch(addByKey(key));
  };

  const handleDelete = (key: string) => {
    dispatch(removeAllItems(key));
  };

  return (
    <Container>
      <Stack gap={1}>
        <Paper>
          {Object.keys(cartData).length === 0 && (
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="h3">Cart is empty</Typography>
            </Box>
          )}
          <List>
            {Object.keys(cartData).length !== 0 &&
              Object.keys(cartData).map((item) => {
                return (
                  <>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            BACKEND_BASE_URL +
                            "book/image/" +
                            cartData[item].img
                          }
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            <Typography gutterBottom variant="h6">
                              {cartData[item].title}
                            </Typography>
                            <Typography gutterBottom variant="body2">
                              {"Price: " + cartData[item].price + " $"}
                            </Typography>
                            <Typography gutterBottom variant="body2">
                              {"Amount: " + cartData[item].amount}
                            </Typography>
                            <Typography gutterBottom variant="body2">
                              {"Total: " +
                                cartData[item].amount * cartData[item].price +
                                " $"}
                            </Typography>
                          </>
                        }
                      />

                      <IconButton
                        onClick={() => {
                          handleAdd(item);
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                      <Typography>{cartData[item].amount}</Typography>
                      <IconButton
                        onClick={() => {
                          handleRemove(item);
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleDelete(item);
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            {Object.keys(cartData).length !== 0 && (
              <ListItem>
                <ListItemText
                  primary={
                    <Typography>
                      {"Total: " +
                        Object.keys(cartData).reduce((total, item) => {
                          return (
                            cartData[item].amount * cartData[item].price + total
                          );
                        }, 0) +
                        " $"}
                    </Typography>
                  }
                />
              </ListItem>
            )}
          </List>
        </Paper>
        <Box>
          <Paper>
            <Typography>NextStep</Typography>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
};

export default ShoppingCart;
