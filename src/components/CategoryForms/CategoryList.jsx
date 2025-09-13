import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import fetchCategories from "../../services/getCategories";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Grid2,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCategoryById } from "../../services/user";
import { toast } from "react-toastify";
import { useState } from "react";

function CategoryList() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [saveEvent, setSaveEvent] = useState({ id: "", name: "" });

  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { mutate } = useMutation({
    mutationFn: deleteCategoryById,
    onSuccess: () => {
      toast.success("دسته بندی با موفقیت حذف شد", {
        position: "top-center",
        draggable: true,
      });
      queryClient.invalidateQueries("categories");
    },
    onError: () => {
      toast.error("خطا در حذف آگهی", {
        position: "top-center",
        draggable: true,
      });
    },
  });

  const categories = data?.response;

  const deleteCategory = (event) => {
    const id = event;
    mutate(id);
  };

  const deleteHandler = (event) => {
    event.stopPropagation();
    setSaveEvent({
      id: event.currentTarget.id,
      name: event.currentTarget.name,
    });
    setOpen(true);
  };

  if (isPending || isFetching)
    return (
      <Grid2 container spacing={2} display="flex" flexDirection="column">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width={300} height={40} />
        <Skeleton variant="rounded" width={300} height={40} />
        <Skeleton variant="rounded" width={300} height={40} />
        <Skeleton variant="rounded" width={300} height={40} />
        <Skeleton variant="rounded" width={300} height={40} />
      </Grid2>
    );

  return (
    <>
      <Grid2 container size={{ xs: 12 }} display="flex" flexDirection="column">
        <Grid2 width="fit-content">
          <Typography component="h6" variant="h6" color="#a62626">
            دسته بندی ها
          </Typography>
          <hr color="#a62626" style={{ height: "4px", borderRadius: "50px" }} />
        </Grid2>
        <Grid2>
          <List component="nav" aria-label="main mailbox folders">
            {categories?.map((item) => {
              return (
                <ListItem disablePadding key={item._id}>
                  <ListItemButton
                    id={item._id}
                    sx={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <Tooltip title="حذف دسته بندی" placement="left-start">
                      <IconButton
                        id={item._id}
                        name={item.name}
                        edge="end"
                        aria-label="delete"
                        onClick={deleteHandler}
                      >
                        <DeleteIcon
                          sx={{
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </IconButton>
                    </Tooltip>

                    <ListItemIcon>
                      <img
                        src={`${item.icon}.svg`}
                        alt={item.name}
                        style={{ width: "32px", height: "32px" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ position: "absolute", right: 8 }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid2>
      </Grid2>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSaveEvent({ id: "", name: "" });
        }}
      >
        <Grid2
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
          }}
        >
          <DeleteIcon color="action" />
          <DialogTitle
            sx={{ padding: "8px", color: "#3f3f3f" }}
          >{`دسته بندی ${saveEvent.name} حذف شود؟`}</DialogTitle>
        </Grid2>
        <Divider />
        <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            size="large"
            onClick={() => {
              setOpen(false);
              setSaveEvent({ id: "", name: "" });
            }}
          >
            خیر
          </Button>
          <Button
            size="large"
            color="error"
            onClick={() => {
              setOpen(false);
              deleteCategory(saveEvent.id);
              setSaveEvent({ id: "", name: "" });
            }}
          >
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CategoryList;
