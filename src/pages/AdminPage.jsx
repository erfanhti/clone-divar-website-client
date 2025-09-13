import { Container, Grid2 } from "@mui/material";
import CategoryForm from "../components/CategoryForms/CategoryForm";
import CategoryList from "../components/CategoryForms/CategoryList";

function AdminPage() {
  return (
    <Container>
      <Grid2
        container
        spacing={4}
        display="flex"
        justifyContent="space-between"
      >
        <Grid2 size={{ xs: 6, md: 4 }}>
          <CategoryForm />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4 }}>
          <CategoryList />
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default AdminPage;
