import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
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
import { ChangeEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGetUserByIdQuery } from "../../store/api/userapi/user.api";

const steps = ["Billing Data", "Card Payment", "Confirm"];
const switchValues = [
  "EMAIL",
  "FULLNAME",
  "ADDRESS",
  "HOLDERNAME",
  "CARDNUMBER",
  "CCV",
];

const ShoppingCart = () => {
  const cartData = useSelector((rootState: RootState) => rootState.cartData);
  const authData = useSelector((rootState: RootState) => rootState.userAuth);

  const { data, error, isError, status } = useGetUserByIdQuery(authData.uid, {
    skip: authData.uid === "anon",
  });

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

  //STEPPER
  type OrderDetails = {
    email: string;
    fullName: string;
    address: string;
    cardNumber: string;
    ccv: string;
    cardHolderName: string;
  };
  const [orderDetail, setOrderDetail] = useState<OrderDetails>({
    email: data ? data.email : "",
    fullName: data ? data.fullName : "",
    address: data ? data.address : "",
    cardNumber: "",
    ccv: "",
    cardHolderName: data ? data.fullName : "",
  });

  const bilingDataExists = () => {
    if (
      orderDetail.email === "" ||
      orderDetail.fullName === "" ||
      orderDetail.address === ""
    ) {
      return false;
    }

    return true;
  };
  const cardDataExists = () => {
    if (
      orderDetail.cardNumber === "" ||
      orderDetail.cardHolderName === "" ||
      orderDetail.ccv === ""
    ) {
      return false;
    }

    return true;
  };

  const isBilingData = useMemo(() => bilingDataExists(), [orderDetail]);
  const isCardData = useMemo(() => cardDataExists(), [orderDetail]);

  const handleFormChange = (value: string, form: string) => {
    switch (form) {
      case switchValues[0]:
        setOrderDetail((state) => ({ ...state, email: value }));
        break;
      case switchValues[1]:
        setOrderDetail((state) => ({ ...state, fullName: value }));
        break;
      case switchValues[2]:
        setOrderDetail((state) => ({ ...state, address: value }));
        break;
      case switchValues[3]:
        setOrderDetail((state) => ({ ...state, cardHolderName: value }));
        break;
      case switchValues[4]:
        setOrderDetail((state) => ({ ...state, cardNumber: value }));
        break;
      case switchValues[5]:
        setOrderDetail((state) => ({ ...state, ccv: value }));
        break;
    }
  };

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  console.log(orderDetail);
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
        {Object.keys(cartData).length !== 0 && (
          <Paper>
            <Container maxWidth={"xs"}>
              <Box
                padding={3}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                columnGap={1}
              >
                {status === "uninitialized" && (
                  <Typography
                    align="center"
                    gutterBottom
                    variant="body2"
                    color={"error"}
                  >
                    You are not logged in, please register or log in to be able
                    to place an order.
                  </Typography>
                )}
                <Typography gutterBottom variant="h6" color={"primary"}>
                  Place Order:
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                      const stepProps: { completed?: boolean } = {};
                      const labelProps: {
                        optional?: React.ReactNode;
                      } = {};
                      if (isStepOptional(index)) {
                        labelProps.optional = (
                          <Typography variant="caption">Optional</Typography>
                        );
                      }
                      if (isStepSkipped(index)) {
                        stepProps.completed = false;
                      }
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  {activeStep === steps.length ? (
                    <>
                      <Typography
                        variant="h6"
                        color={"green"}
                        sx={{ mt: 2, mb: 1 }}
                      >
                        Order Placed
                      </Typography>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Link to="/">
                          <Button>Go back to main page</Button>
                        </Link>
                      </Box>
                    </>
                  ) : (
                    <>
                      {activeStep === 0 && (
                        <Box sx={{ width: "100%" }}>
                          <TextField
                            value={orderDetail.email}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleFormChange(
                                event.currentTarget.value,
                                switchValues[0]
                              )
                            }
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                          />
                          <TextField
                            value={orderDetail.address}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleFormChange(
                                event.currentTarget.value,
                                switchValues[2]
                              )
                            }
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            autoComplete="address"
                            autoFocus
                          />
                          <TextField
                            value={orderDetail.fullName}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleFormChange(
                                event.currentTarget.value,
                                switchValues[1]
                              )
                            }
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="FullName"
                            autoFocus
                          />
                        </Box>
                      )}
                      {activeStep === 1 && (
                        <Box sx={{ width: "100%" }}>
                          <Typography variant="body2" color={"text.secondary"}>
                            Mock data with whatever you like
                          </Typography>
                          <TextField
                            value={orderDetail.cardNumber}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleFormChange(
                                event.currentTarget.value,
                                switchValues[4]
                              )
                            }
                            margin="normal"
                            required
                            fullWidth
                            id="cnumber"
                            label="Card Number"
                            name="cnumber"
                            autoComplete="Card Number"
                            autoFocus
                          />
                          <TextField
                            value={orderDetail.cardHolderName}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleFormChange(
                                event.currentTarget.value,
                                switchValues[3]
                              )
                            }
                            margin="normal"
                            required
                            fullWidth
                            id="cname"
                            label="Card Holder Full Name"
                            name="cname"
                            autoComplete="FullName"
                            autoFocus
                          />
                          <TextField
                            value={orderDetail.ccv}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleFormChange(
                                event.currentTarget.value,
                                switchValues[5]
                              )
                            }
                            margin="normal"
                            required
                            fullWidth
                            id="ccv"
                            label="CCV"
                            name="ccv"
                            autoComplete="ccv"
                            autoFocus
                          />
                          <Typography variant="body2" color={"text.secondary"}>
                            Press skip if you want to pay on delivery*
                          </Typography>
                        </Box>
                      )}
                      {activeStep === 2 && (
                        <Box marginY={10} sx={{ width: "100%" }}>
                          <Typography variant="h6" color={"primary"}>
                            Place order by pressing finish
                          </Typography>
                          {!authData.isLoggedIn && (
                            <Typography variant="body2" color={"error"}>
                              Login to be able to place the order!
                            </Typography>
                          )}
                          <Typography variant="h6" color={"green"}>
                            Details:
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color={"text.secondary"}
                          >
                            Billing Name: {orderDetail.fullName}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color={"text.secondary"}
                          >
                            Address: {orderDetail.address}
                          </Typography>
                          {Object.keys(cartData).length !== 0 && (
                            <Typography>
                              {"Total: " +
                                Object.keys(cartData).reduce((total, item) => {
                                  return (
                                    cartData[item].amount *
                                      cartData[item].price +
                                    total
                                  );
                                }, 0) +
                                " $"}
                            </Typography>
                          )}
                        </Box>
                      )}
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        Step {activeStep + 1}
                      </Typography>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        {isStepOptional(activeStep) && (
                          <Button
                            color="inherit"
                            onClick={handleSkip}
                            sx={{ mr: 1 }}
                          >
                            Skip
                          </Button>
                        )}
                        <Button
                          disabled={
                            !(
                              (activeStep === 0 && isBilingData) ||
                              (activeStep === 1 && isCardData) ||
                              (activeStep > 1 && authData.isLoggedIn)
                            )
                          }
                          onClick={handleNext}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Container>
          </Paper>
        )}
        {data && <Typography>{JSON.stringify(data)}</Typography>}
      </Stack>
    </Container>
  );
};

export default ShoppingCart;
