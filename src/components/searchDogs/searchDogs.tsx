import { Box, Grid, ImageList, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getBreeds,
  getDogsByIds,
  searchDogs,
  searchDogsByURL,
} from "../../utils/api";
import { Dog } from "../../utils/types";
import { FilterForm } from "./filterForm";
import { DogModal } from "../dogModal";
import { Favorites } from "../favorites";

export const SearchDogs: React.FC = () => {
  const [filter, openFilter] = useState(false);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [totalDogs, setTotalDogs] = useState<string>("");
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");

  const getNewDogsWithURL = async (url: string) => {
    let newDogIdList = await searchDogsByURL(url);
    setNextPage(newDogIdList.next);
    setPrevPage(newDogIdList.prev);
    setTotalDogs(newDogIdList.total);
    const dogsResult = getDogsByIds(newDogIdList.resultIds);
    dogsResult.then((res) => setDogs(res));
  };

  // load initial results, need to add error catching
  useEffect(() => {
    const fetchDogs = async () => {
      let dogsIDsResult = await searchDogs({});
      setNextPage(dogsIDsResult.next);
      setPrevPage(dogsIDsResult.prev);
      setTotalDogs(dogsIDsResult.total);

      const breedResults = await getBreeds();
      setBreeds(breedResults);

      const dogsResult = await getDogsByIds(dogsIDsResult.resultIds);
      setDogs(dogsResult);
    };
    fetchDogs();
  }, []);

  return (
    <>
      <Grid
        sx={{ flexDirection: "column", backgroundColor: "#00000090" }}
        display={"flex"}
        justifyContent={"center"}
        item
        maxWidth={"100%"}
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Favorites />
        {filter && (
          <FilterForm
            breeds={breeds}
            zipcodes={[]}
            setDogs={setDogs}
            setSort={setSort}
            setNext={setNextPage}
            setPrev={setPrevPage}
            setTotal={setTotalDogs}
          />
        )}

        <>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            mx={1}
            mb={1}
            mt={0.5}
          >
            <Typography
              sx={{ cursor: "pointer" }}
              color={filter ? "primary.main" : "white"}
              onClick={() => openFilter(!filter)}
            >
              filter {!filter ? "+" : "-"}
            </Typography>
            <Typography fontSize={".75rem"} color={"white"}>
              Dogs Found: {totalDogs}
            </Typography>
          </Box>
          <ImageList
            cols={6}
            rowHeight={"auto"}
            sx={{ display: { xs: "none", md: "grid" }, mt: 0 }}
          >
            {dogs &&
              dogs.map((item) => (
                <DogModal key={item.id} dog={item} method="add" />
              ))}
          </ImageList>
          <ImageList
            cols={3}
            rowHeight={"auto"}
            sx={{ display: { xs: "grid", md: "none" }, mt: 0 }}
          >
            {dogs &&
              dogs.map((item) => (
                <DogModal key={item.id} dog={item} method="add" />
              ))}
          </ImageList>
        </>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
          textAlign={"center"}
          px={".5rem"}
          mt={"-.5rem"}
          mb={".5rem"}
        >
          {prevPage ? (
            <Typography
              sx={{ cursor: "pointer", color: "white" }}
              onClick={() => getNewDogsWithURL(prevPage)}
            >
              &larr; Previous Page
            </Typography>
          ) : (
            <div></div>
          )}
          {nextPage ? (
            <Typography
              sx={{ cursor: "pointer", color: "white" }}
              onClick={() => getNewDogsWithURL(nextPage)}
            >
              Next Page &rarr;
            </Typography>
          ) : (
            <div></div>
          )}
        </Box>
      </Grid>
    </>
  );
};
