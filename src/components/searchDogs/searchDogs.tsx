import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getBreeds,
  getDogsByIds,
  searchDogs,
  searchDogsByURL,
} from "../../utils/api";
import { Dog, SearchResults } from "../../utils/types";

export const SearchDogs: React.FC = () => {
  const [filter, openFilter] = useState(false);
  //default id list
  const [dogIds, setDogIds] = useState<string[]>([
    "VXGFTIcBOvEgQ5OCx40W",
    "V3GFTIcBOvEgQ5OCx40W",
    "WHGFTIcBOvEgQ5OCx40W",
    "W3GFTIcBOvEgQ5OCx40W",
    "YnGFTIcBOvEgQ5OCx40W",
    "Y3GFTIcBOvEgQ5OCx40W",
    "aHGFTIcBOvEgQ5OCx40W",
    "aXGFTIcBOvEgQ5OCx40W",
    "bHGFTIcBOvEgQ5OCx40W",
    "bnGFTIcBOvEgQ5OCx40W",
    "cXGFTIcBOvEgQ5OCx40W",
    "c3GFTIcBOvEgQ5OCx40W",
    "dHGFTIcBOvEgQ5OCx40W",
    "dnGFTIcBOvEgQ5OCx40W",
    "eHGFTIcBOvEgQ5OCx40W",
    "h3GFTIcBOvEgQ5OCx40W",
    "iHGFTIcBOvEgQ5OCx40W",
    "jnGFTIcBOvEgQ5OCx40W",
  ]);
  const [breeds, setBreeds] = useState<string>();
  const [dogs, setDogs] = useState<Dog[]>();
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  console.log("next url, prev url", nextPage, prevPage);
  console.log("dogIds", dogIds);
  //console.log("breeds", breeds);
  console.log("dogs", dogs);

  const getNewDogsWithURL = async (url: string) => {
    let newDogIdList = await searchDogsByURL(url);
    setDogIds(newDogIdList.resultIds);
    setNextPage(newDogIdList.next);
    setPrevPage(newDogIdList.prev);
    const dogsResult = getDogsByIds(newDogIdList.resultIds);
    dogsResult.then((res) => setDogs(res));
  };

  // load initial results, need to add error catching
  useEffect(() => {
    let dogsIDsResult = searchDogs({});
    dogsIDsResult.then((res) => {
      setDogIds(res.resultIds);
      setNextPage(res.next);
      setPrevPage(res.prev);
    });
    const breedResults = getBreeds();
    breedResults.then((res) => setBreeds(res));
    const dogsResult = getDogsByIds(dogIds);
    dogsResult.then((res) => setDogs(res));
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
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
          textAlign={"center"}
          px={".5rem"}
        >
          {prevPage && (
            <Typography
              sx={{ cursor: "pointer", color: "white" }}
              onClick={() => getNewDogsWithURL(prevPage)}
            >
              &larr; Previous Page
            </Typography>
          )}
          <Typography
            sx={{ cursor: "pointer", color: "white" }}
            onClick={() => openFilter(!filter)}
          >
            filter -
          </Typography>
          {nextPage && (
            <Typography
              sx={{ cursor: "pointer", color: "white" }}
              onClick={() => getNewDogsWithURL(nextPage)}
            >
              Next Page &rarr;
            </Typography>
          )}
        </Box>
        {dogs !== undefined && (
          <>
            <ImageList
              cols={6}
              rowHeight={"auto"}
              sx={{ display: { xs: "none", md: "grid" } }}
            >
              {dogs &&
                dogs.map((item) => (
                  <ImageListItem key={item.id}>
                    <img src={`${item.img}`} alt={item.name} loading="lazy" />
                  </ImageListItem>
                ))}
            </ImageList>
            <ImageList
              cols={3}
              rowHeight={"auto"}
              sx={{ display: { xs: "grid", md: "none" } }}
            >
              {dogs &&
                dogs.map((item) => (
                  <ImageListItem key={item.id}>
                    <img src={`${item.img}`} alt={item.name} loading="lazy" />
                  </ImageListItem>
                ))}
            </ImageList>
          </>
        )}
      </Grid>
    </>
  );
};
