import { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid2,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { getPosts } from "../../services/user";
import styles from "./postList.module.css";
import { sp } from "../../utils/formatNumbers";
import deletePost from "../../services/deletePost";

function PostList() {
  const [open, setOpen] = useState(false);
  const [saveEvent, setSaveEvent] = useState({ id: "", name: "" });

  const queryClient = useQueryClient();

  const baseURL = "http://localhost:3400/";

  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["userPosts"],
    queryFn: getPosts,
  });

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("آگهی با موفقیت حذف شد", {
        position: "top-center",
        draggable: true,
      });
      queryClient.invalidateQueries("userPosts");
    },
    onError: () => {
      toast.error("مشکلی در حذف آگهی به وجود آمد", {
        position: "top-center",
        draggable: true,
      });
    },
  });

  const deletePostHandler = () => {
    mutate(saveEvent.id);
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
      <Container maxWidth="lg">
        <Grid2
          container
          mt={4}
          spacing={2}
          size={{ xs: 12 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Skeleton variant="rounded" width={300} height={150} />
          <Skeleton variant="rounded" width={300} height={150} />
          <Skeleton variant="rounded" width={300} height={150} />
          <Skeleton variant="rounded" width={300} height={150} />
          <Skeleton variant="rounded" width={300} height={150} />
          <Skeleton variant="rounded" width={300} height={150} />
          <Skeleton variant="rounded" width={300} height={150} />
          <Skeleton variant="rounded" width={300} height={150} />
          <Skeleton variant="rounded" width={300} height={150} />
        </Grid2>
      </Container>
    );

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 6 }}>
        <Grid2
          container
          spacing={4}
          size={{ xs: 12 }}
          display="flex"
          flexDirection="column"
        >
          <Grid2 width="fit-content">
            <Typography component="h6" variant="h6" color="#a62626">
              آگهی های شما
            </Typography>
            <hr
              color="#a62626"
              style={{ height: "4px", borderRadius: "50px" }}
            />
          </Grid2>
        </Grid2>
      </Container>
      <Container maxWidth="lg">
        <Grid2 container mt={4} spacing={2} size={{ xs: 12 }}>
          {!isPending &&
            data &&
            data.posts.map((post) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={post._id}>
                <div className={styles.card}>
                  <div className={styles.content}>
                    <p>{post.options.title}</p>
                    <div className={styles.detail}>
                      <p>{`${sp(post.amount.toString())} تومان`}</p>
                      <p>{post.options.city}</p>
                      <div className={styles.deleteSec}>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString("fa-IR")}
                        </span>
                        <Tooltip title="حذف آگهی" placement="left-start">
                          <IconButton
                            id={post._id}
                            name={post.options.title}
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
                      </div>
                    </div>
                  </div>
                  <div className={styles.image}>
                    <img src={`${baseURL}${post.images[0]}`} />
                  </div>
                </div>
              </Grid2>
            ))}
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
            >{`آگهی ${saveEvent.name} حذف شود؟`}</DialogTitle>
          </Grid2>
          <Divider />
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
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
                deletePostHandler();
                setSaveEvent({ id: "", name: "" });
              }}
            >
              بله
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default PostList;
