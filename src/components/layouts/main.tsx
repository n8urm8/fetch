import { Container, Grid } from "@mui/material";
import { ResponsiveAppBar } from "../navbar";
import BackgroundDog from "/images/dogBeach.jpg";

export const MainLayout = ({
  name,
  updateName,
  children,
}: {
  name: string | null;
  updateName: (name: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <Grid
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: "url(/images/dogBeach.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <ResponsiveAppBar name={name} updateName={updateName} />
      <Grid>{children}</Grid>
    </Grid>
  );
};
