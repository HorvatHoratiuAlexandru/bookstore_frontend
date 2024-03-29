import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Input,
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
import { useState } from "react";
import { Link } from "react-router-dom";

const steps = ["Billing Data", "Card Payment", "Confirm"];

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

  //STEPPER
  // type OrderDetails = {
  //   email: string;
  //   fullName: string;
  //   address: string;
  //   cardNumber?: string;
  //   ccv?: string;
  //   cardHolderName?: string;
  // };
  // const { orderDetail, setOrderDetail } = useState<OrderDetails>({
  //   email: "Mock",
  //   fullName: "MockFullName",
  //   address: "MockAddress",
  // });

  // const bilingDataExists;
  // const cardDataExists;

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
                        <Button onClick={handleNext}>
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
      </Stack>
    </Container>
  );
};

export default ShoppingCart;
