import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useGetBooksQuery } from "../../../store/api/bookapi/book.api";
import { bookData } from "../../interfaces/responses/book.res.interface";

interface TagFilterProps {
  tags: string[];
  onQueryData: (data: bookData[]) => void;
  presetFirstTag: boolean;
}

const TagFilter = (props: TagFilterProps) => {
  const [isDisabledTagButton, setIsDisabledTagButton] = useState<boolean>(true);
  const [activeTags, setActiveTags] = useState<string[]>(
    props.presetFirstTag ? [props.tags[0]] : []
  );

  const [value, setValue] = useState<string | null>("");
  const [inputValue, setInputValue] = useState("");

  const isInputNotATag = (inputTag: string) => {
    if (props.tags.includes(inputTag)) {
      if (isDisabledTagButton) {
        setIsDisabledTagButton(() => false);
      }
      return false;
    } else {
      if (!isDisabledTagButton) {
        setIsDisabledTagButton(() => true);
      }
      return true;
    }
  };

  const handleAddTagClick = () => {
    if (!isInputNotATag(inputValue) && !activeTags.includes(inputValue)) {
      setActiveTags((prevTags) => [...prevTags, inputValue]);
    }
  };

  const handleChipDelete = (chip: string) => {
    setActiveTags((state) => {
      return state.filter((item) => item !== chip);
    });
  };

  const { isLoading, isError, data, error } = useGetBooksQuery(activeTags);

  useEffect(() => {
    if (!isError && !isLoading && data) {
      props.onQueryData(data);
    }
  }, [isLoading, isError, data]);
  return (
    <>
      <Paper>
        {isError && (
          <Typography variant="body1">{JSON.stringify(error)}</Typography>
        )}
        <Box paddingX={1} paddingY={2} marginY={2}>
          <Stack gap={1}>
            <Autocomplete
              value={value}
              onChange={(event: any, newValue: string | null) => {
                isInputNotATag(newValue ? newValue : "");
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                isInputNotATag(newInputValue);
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={props.tags}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Add a tag" />
              )}
            />

            <Button
              disabled={isDisabledTagButton}
              onClick={() => handleAddTagClick()}
              variant="outlined"
            >
              Add
            </Button>
            <Box
              display={"flex"}
              flexDirection={"row"}
              flexWrap={"wrap"}
              gap={1}
            >
              {activeTags.map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleChipDelete(tag)}
                  />
                );
              })}
            </Box>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

export default TagFilter;
