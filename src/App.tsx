import { useEffect, useState } from "react";
import { MainLayout } from "./components/layouts/main";
import { SignInSide } from "./components/auth";
import { getSessionName } from "./utils/userSession";
import { Box, Button } from "@mui/material";
import { SearchDogs } from "./components/searchDogs";

const App = () => {
  const [name, setName] = useState<null | string>(null);
  const [canSearch, setCanSearch] = useState(false);
  console.log("my name:", name);

  useEffect(() => {
    const userName = getSessionName();
    console.log("username?", userName);
    if (userName) {
      setName(userName);
    }
  }, []);

  return (
    <MainLayout name={name} updateName={setName}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
        }}
      >
        {!canSearch && (
          <Box display={"flex"} flexDirection={"column"} mt={6}>
            <Button
              variant="contained"
              onClick={() => setCanSearch(true)}
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                placeSelf: "center",
              }}
            >
              Go Fetch
            </Button>
          </Box>
        )}
        {canSearch && !name && (
          <Box mt={-2} sx={{ maxWidth: { md: "50%" }, mr: { md: "2rem" } }}>
            <SignInSide updateName={setName} />
          </Box>
        )}
        {canSearch && name && <SearchDogs />}
      </Box>
    </MainLayout>
  );
};

export default App;
