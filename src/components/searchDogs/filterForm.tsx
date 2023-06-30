import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Theme,
  SelectChangeEvent,
  Slider,
  Typography,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import theme from "../../theme";
import { Dog, SearchQueryParams } from "../../utils/types";
import { getDogsByIds, searchDogs } from "../../utils/api";

// copied from MUI example component
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      "& .Mui-selected": {
        backgroundColor: "pink",
      },
    },
  },
};
function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 25,
    label: "25",
  },
];

interface IFilterForm {
  breeds: string[];
  zipcodes?: string[];
  setDogs: (dogs: Dog[]) => void;
  setSort: (sort: "asc" | "desc") => void;
  setNext: (next: string) => void;
  setPrev: (prev: string) => void;
  setTotal: (total: string) => void;
}

/*
breeds - array - an array of breeds doesn't seem to work, need to figure out how param is formatted
zipcodes - array - currently just a string of single zip code
ageMin - number string
ageMax - number string

*/

export const FilterForm: React.FC<IFilterForm> = ({
  breeds,
  setDogs,
  setPrev,
  setNext,
  setTotal,
}) => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [selectedZipcodes, setSelectedZipcodes] = useState<string>("");
  const [ageRange, setAgeRange] = useState<number[]>([0, 25]);
  const [sortBy, setSortBy] = React.useState<string>("none");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const minDistance = 1;
  const sortByFields = ["none", "id", "name", "age", "zip_code", "breed"];
  const sortDirectionFields = ["asc", "desc"];

  const handleSortByFieldChange = (event: SelectChangeEvent<typeof sortBy>) => {
    const {
      target: { value },
    } = event;

    setSortBy(value);
  };

  const handleSortDirectionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSortDirection((event.target as HTMLInputElement).value);
  };

  function valuetext(value: number) {
    return `${value} years`;
  }

  const handleBreedChange = (
    event: SelectChangeEvent<typeof selectedBreeds>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedBreeds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // const handleZipcodeChange = (
  //   event: SelectChangeEvent<typeof selectedZipcodes>
  // ) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setSelectedZipcodes(typeof value === "string" ? value.split(",") : value);
  // };

  const handleAgeChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setAgeRange([
        Math.min(newValue[0], ageRange[1] - minDistance),
        ageRange[1],
      ]);
    } else {
      setAgeRange([
        ageRange[0],
        Math.max(newValue[1], ageRange[0] + minDistance),
      ]);
    }
  };

  const validateZipcode = (zip: string) => {
    const regex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    return zip.match(regex) !== null || zip === "";
  };

  const HandleNewSearch = async () => {
    const params: SearchQueryParams = {};
    let newBreeds = selectedBreeds.map((breed) => breed.replace(/\s/g, "_"));
    if (selectedBreeds.length > 0) {
      params.breeds = newBreeds.join(",");
      console.error("breeds selected: ", newBreeds.join(","));
    }
    if (selectedZipcodes !== "" && validateZipcode(selectedZipcodes)) {
      params.zipCodes = selectedZipcodes;
    }
    if (sortBy !== "none") {
      params.sortField = sortBy as typeof params.sortField;
      params.sortOrder = sortDirection as typeof params.sortOrder;
    }
    params.ageMax = ageRange[1].toString();
    params.ageMin = ageRange[0].toString();

    const newIDs = await searchDogs(params);
    console.log("NEW IDS: ", newIDs);
    setPrev(newIDs.prev);
    setNext(newIDs.next);
    setTotal(newIDs.total);

    const newDogs = await getDogsByIds(newIDs.resultIds);
    setDogs(newDogs);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="breeds-label" sx={{ color: "white" }}>
          Breeds
        </InputLabel>
        <Select
          labelId="breeds-label"
          id="breeds"
          multiple
          value={selectedBreeds}
          onChange={handleBreedChange}
          input={<OutlinedInput label="Breeds" />}
          MenuProps={{
            sx: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
              width: 250,
              "& .Mui-selected": {
                backgroundColor: "rgba(83, 217, 143, 0.28)",
              },
            },
          }}
          sx={{ color: "white" }}
        >
          {breeds.map((breed) => (
            <MenuItem
              key={breed}
              value={breed}
              style={getStyles(breed, selectedBreeds, theme)}
            >
              {breed}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <TextField
          id="outlined-basic"
          label="Zip Code"
          variant="outlined"
          error={!validateZipcode(selectedZipcodes)}
          value={selectedZipcodes}
          helperText={
            validateZipcode(selectedZipcodes) ? "" : "incorrect format"
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedZipcodes(event.target.value);
          }}
          sx={{
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiFormLabel-root": { color: "white" },
            "& .MuiFormLabel-root.Mui-focused": { color: "primary.main" },
            "& .MuiFormLabel-root.Mui-error": { color: "error.main" },
          }}
        />
        {/* <InputLabel id="zipcodes-label" sx={{ color: "white" }}>
          Zipcodes
        </InputLabel>
        <Select
          labelId="zipcodes-label"
          id="zipcodes"
          multiple
          value={selectedZipcodes}
          onChange={handleZipcodeChange}
          input={<OutlinedInput label="Zipcodes" />}
          MenuProps={MenuProps}
          sx={{ color: "white" }}
        >
          {zipcodes.map((zip) => (
            <MenuItem
              key={zip}
              value={zip}
              style={getStyles(zip, selectedZipcodes, theme)}
            >
              {zip}
            </MenuItem>
          ))}
        </Select> */}
      </FormControl>
      <FormControl sx={{ my: 1, mx: 2, width: 300 }}>
        <Typography fontSize={".75rem"} sx={{ color: "white" }}>
          Age Range
        </Typography>
        <Slider
          getAriaLabel={() => "Age Range"}
          value={ageRange}
          onChange={handleAgeChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          marks={marks}
          disableSwap
          min={0}
          max={25}
          sx={{
            color: "success.main",
            "& .MuiSlider-markLabel": { color: "primary.main" },
          }}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="search-by-label" sx={{ color: "white" }}>
          Sort By
        </InputLabel>
        <Select
          labelId="search-by-label"
          id="search-by"
          value={sortBy}
          label="sort by field"
          onChange={handleSortByFieldChange}
          sx={{ color: "white" }}
        >
          {sortByFields.map((field, i) => (
            <MenuItem key={i} value={field}>
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ my: 1, mx: 2, width: 300 }}>
        <RadioGroup
          aria-labelledby="sort-direction-radio-buttons-group"
          name="sort-direction-radio-buttons-group"
          value={sortDirection}
          onChange={handleSortDirectionChange}
          row
        >
          {sortDirectionFields.map((field, i) => (
            <FormControlLabel
              key={i}
              value={field}
              control={<Radio />}
              label={field}
              sx={{ color: "white" }}
              color="white"
            />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl sx={{ my: 1, mx: 2, width: 300 }}>
        <Button
          sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
          variant="contained"
          onClick={HandleNewSearch}
        >
          Refine Search
        </Button>
      </FormControl>
    </div>
  );
};
