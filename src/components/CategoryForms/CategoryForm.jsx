import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { createCategory } from "../../services/createCategory";

function CategoryForm() {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("دسته بندی با موفقیت ایجاد شد", {
        position: "top-center",
        draggable: true,
      });
      setForm({ name: "", slug: "", icon: "" });
      queryClient.invalidateQueries("categories");
    },
    onError: () => {
      toast.error("خطا در ایجاد دسته بندی", {
        position: "top-center",
        draggable: true,
      });
    },
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.slug || !form.icon) {
      toast.warn("لطفا تمامی فیلدها را پر کنید", {
        position: "top-center",
        draggable: true,
      });
      return;
    }
    mutate(form);
  };

  return (
    <Grid2>
      <form onSubmit={submitHandler} onChange={changeHandler}>
        <Grid2
          container
          spacing={4}
          size={{ xs: 12 }}
          display="flex"
          flexDirection="column"
        >
          <Grid2 width="fit-content">
            <Typography component="h6" variant="h6" color="#a62626">
              ایجاد دسته بندی جدید
            </Typography>
            <hr
              color="#a62626"
              style={{ height: "4px", borderRadius: "50px" }}
            />
          </Grid2>
          <Grid2>
            <TextField
              label="نام دسته بندی"
              variant="outlined"
              size="small"
              name="name"
              value={form.name || ""}
            ></TextField>
          </Grid2>
          <Grid2>
            <TextField
              label="اسلاگ"
              variant="outlined"
              size="small"
              name="slug"
              value={form.slug || ""}
            ></TextField>
          </Grid2>
          <Grid2>
            <TextField
              label="آیکون"
              variant="outlined"
              size="small"
              name="icon"
              value={form.icon || ""}
            ></TextField>
          </Grid2>

          <Grid2>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#a62626" }}
            >
              ایجاد دسته بندی
            </Button>
          </Grid2>
        </Grid2>
      </form>
      <ToastContainer />
    </Grid2>
  );
}

export default CategoryForm;
