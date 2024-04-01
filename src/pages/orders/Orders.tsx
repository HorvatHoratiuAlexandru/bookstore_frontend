import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useGetOrdersQuery } from "../../store/api/orderapi/order.api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { GetOrdersDataRes } from "../../common/interfaces/responses/order.res.interface";
import { Link } from "react-router-dom";

const OrderRow = (props: { orderDetail: GetOrdersDataRes }) => {
  return (
    <TableRow key={"order" + props.orderDetail.id}>
      <TableCell>
        {props.orderDetail.date.toString().replace(/:\d{2}\.\d{3}$/, "")}
      </TableCell>
      <TableCell>{props.orderDetail.id}</TableCell>
      <TableCell>{props.orderDetail.totalPrice}</TableCell>
      <TableCell>{props.orderDetail.isPayed ? "yes" : "no"}</TableCell>
      <TableCell>{props.orderDetail.isProcessed ? "yes" : "no"}</TableCell>
      <TableCell>{props.orderDetail.isFinished ? "yes" : "no"}</TableCell>
      <TableCell>
        <Link to={"/order/" + props.orderDetail.id}>
          <Button>View</Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

const Orders = () => {
  const authData = useSelector((state: RootState) => state.userAuth);
  const { data, isError, error } = useGetOrdersQuery(authData.uid);

  return (
    <Box margin={2}>
      <Paper>
        <Box padding={2} display={"flex"} justifyContent={"center"}>
          <Typography variant="h6" color={"primary"}>
            You can view your orders below
          </Typography>
          {isError && (
            <Typography variant="body1" color={"error"}>
              {JSON.stringify(error)}
            </Typography>
          )}
        </Box>
        <Box margin={2} padding={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>OrderId</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>Payed?</TableCell>
                  <TableCell>Processed? </TableCell>
                  <TableCell>Finished?</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((order) => {
                    return <OrderRow orderDetail={order} />;
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default Orders;
