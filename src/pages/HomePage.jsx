import { Container, Grid2 } from "@mui/material";
import SideBar from "../components/HomePage/SideBar";
import Main from "../components/HomePage/Main";

function HomePage() {
  return (
    <Container maxWidth="1400px">
      <Grid2 container spacing={6}>
        <SideBar />
        <Main />
      </Grid2>
    </Container>
  );
}

export default HomePage;
