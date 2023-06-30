import {
  Box,
  Button,
  ImageListItem,
  Modal,
  Typography,
  styled,
} from "@mui/material";
import { Dog, updateFavoriteDogMethod } from "../../utils/types";
import { useState } from "react";
import { updateFavoriteDogs } from "../../utils/userSession";

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

const FavImg = styled("img")({
  border: "50%",
});

export interface IDogModal {
  dog: Dog;
  method: updateFavoriteDogMethod;
}

export const DogModal: React.FC<IDogModal> = ({ dog, method }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFavoriteUpdate = () => {
    updateFavoriteDogs(dog, method);
    const favEvent = new CustomEvent("newFavs");
    window.dispatchEvent(favEvent);
  };

  return (
    <>
      <ImageListItem
        key={dog.id}
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
        }}
      >
        <img src={`${dog.img}`} alt={dog.name} loading="lazy" />
      </ImageListItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={`${dog.img}`}
            alt={dog.name}
            loading="lazy"
            width={"100%"}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {dog.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{}}>
            {dog.breed}
          </Typography>
          <Typography id="modal-modal-description" sx={{}}>
            {dog.age} years old
          </Typography>
          <Typography id="modal-modal-description" sx={{ mb: 1 }}>
            Located in {dog.zip_code}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleFavoriteUpdate()}
          >
            {method.toUpperCase()} FAVORITE
          </Button>
        </Box>
      </Modal>
    </>
  );
};
