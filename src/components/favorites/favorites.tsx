import { useEffect, useState } from "react";
import { Dog } from "../../utils/types";
import { getFavoriteDogs } from "../../utils/userSession";
import { Box, Button, Grid, Modal, Typography, styled } from "@mui/material";
import { DogModal } from "../dogModal";
import { getDogMatch } from "../../utils/api";
import Confetti from "react-confetti";

// copied from MUI component example
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  color: "white",
};

const FavContainer = styled("div")({
  width: "auto",
  height: "50px",
  display: "flex",
});

export const Favorites: React.FC = () => {
  const [favoritesList, setFavoritesList] = useState<Dog[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [matchDog, setMatchDog] = useState<Dog>();
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  //console.log("matchDog:", matchDog);

  useEffect(() => {
    const handleStorage = () => {
      const newDogs = getFavoriteDogs();
      setFavoritesList(newDogs);
    };
    handleStorage();
    window.addEventListener("newFavs", () => {
      handleStorage();
    });
    return () => window.removeEventListener("newFavs", () => handleStorage());
  }, []);

  const handleGetMatch = async () => {
    const ids = favoritesList.map((dog) => dog.id);
    const myMatch = await getDogMatch(ids);
    const dogByID = findMatch(favoritesList, myMatch);
    //console.log("matched id: ", myMatch, dogByID);
    setMatchDog(dogByID);
    handleOpen();

    function findMatch(dogs: Dog[], searchID: string) {
      let match;
      for (let i = 0; i < dogs.length; i++) {
        if (dogs[i].id === searchID) {
          match = dogs[i];
        }
      }
      return match;
    }
  };

  return (
    <>
      {openModal && <Confetti width={window.innerWidth} />}
      {favoritesList.length > 0 && (
        <>
          <Typography color={"white"} ml={1}>
            Favorites:
          </Typography>
          <Grid
            display={"flex"}
            flexWrap={"wrap"}
            flexDirection={"row"}
            mx={2}
            mb={1}
            gap={1}
          >
            {favoritesList.length > 0 &&
              favoritesList.map((dog, i) => {
                return (
                  <FavContainer key={i}>
                    <DogModal dog={dog} method="remove" />
                  </FavContainer>
                );
              })}
            <Button variant="contained" onClick={() => handleGetMatch()}>
              GET MATCHED
            </Button>
          </Grid>
        </>
      )}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            CONGRATULATIONS!
          </Typography>
          <img
            src={`${matchDog?.img}`}
            alt={matchDog?.name}
            loading="lazy"
            width={"100%"}
          />
          <Typography id="modal-modal-description">
            You matched with {matchDog?.name}!
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
