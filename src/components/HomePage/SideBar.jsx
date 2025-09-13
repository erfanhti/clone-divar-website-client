import { useQuery } from "@tanstack/react-query";
import fetchCategories from "../../services/getCategories";
import {
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

function SideBar() {
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categories = data?.response;

  return (
    <Grid2 display="flex" flexDirection="column" size={{ xs: 12, sm: 2 }}>
      <Grid2 width="fit-content">
        <Typography color="#a62626">دسته بندی ها</Typography>
        <hr color="#a62626" style={{ height: "4px", borderRadius: "50px" }} />
      </Grid2>
      <Grid2>
        <List component="nav" aria-label="main mailbox folders">
          {categories?.map((item) => {
            return (
              <ListItem disablePadding key={item._id}>
                <ListItemButton sx={{ padding: "8px", borderRadius: "8px" }}>
                  <ListItemIcon>
                    <img
                      src={`${item.icon}.svg`}
                      alt={item.name}
                      style={{ width: "32px", height: "32px" }}
                    />
                  </ListItemIcon>
                  <ListItemText secondary={item.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Grid2>
    </Grid2>
  );
}

export default SideBar;
