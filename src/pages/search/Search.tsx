import { Paper, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Paper>
      <Typography variant="h3">Search: {searchParams.get("search")}</Typography>
    </Paper>
  );
};

export default SearchPage;
