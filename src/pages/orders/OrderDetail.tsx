import { Box, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../../store/api/orderapi/order.api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const authData = useSelector((state: RootState) => state.userAuth);
  const parsedOrderId = orderId ? Number.parseInt(orderId) : undefined;

  const { data, error, isError } = useGetOrderQuery({
    userUid: authData.uid,
    orderId: parsedOrderId,
  });

  return (
    <Box margin={2} padding={2}>
      <Paper>
        {isError && (
          <Typography variant="body1" color={"error"}>
            {" "}
            {JSON.stringify(error)}
          </Typography>
        )}
        {data && (
          <Grid container gap={1} justifyContent={"center"}>
            <Grid item xs={10}>
              <Paper>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexWrap={"wrap"}
                  padding={3}
                  margin={2}
                >
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography variant="body1" color={"primary"}>
                      Order Id:
                    </Typography>
                    <Typography variant="body1">{data.id} </Typography>
                  </Box>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography variant="body1" color={"primary"}>
                      Date:
                    </Typography>
                    <Typography variant="body1">
                      {data.date.toString().replace(/:\d{2}\.\d{3}$/, "")}{" "}
                    </Typography>
                  </Box>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography variant="body1" color={"primary"}>
                      Total:
                    </Typography>
                    <Typography variant="body1">{data.totalPrice} </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={10}>
              <Grid container gap={1} justifyContent={"space-evenly"}>
                <Grid item xs={4}>
                  <Typography gutterBottom>Ordered Items:</Typography>
                  <Paper elevation={3}>
                    <Box padding={3} margin={2}>
                      {Object.entries(data.items).map(
                        ([itemName, quantity]) => (
                          <Box
                            key={itemName}
                            display="flex"
                            justifyContent="center"
                            padding={1}
                          >
                            <Typography variant="body1" color="primary">
                              {itemName}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              marginLeft={1}
                            >
                              (x{quantity})
                            </Typography>
                          </Box>
                        )
                      )}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Typography gutterBottom>Details:</Typography>
                  <Paper elevation={3} sx={{ bgcolor: "#1976d2" }}>
                    <Box padding={3} margin={2}>
                      <Typography color={"#fff"}>
                        Status:{" "}
                        {data.isPayed
                          ? "payed"
                          : data.isProcessed
                          ? "processed"
                          : data.isFinished
                          ? "finished"
                          : "NA"}
                      </Typography>
                      <Typography color={"#fff"}>
                        Deliver Address: {data.address}
                      </Typography>
                      <Typography color={"#fff"}>
                        Promotional Code Used: {data.promoCode}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default OrderDetail;
