import { useState } from "react";
import ProvinceAndCity from "./ProvinceAndCity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPost } from "../../services/createPost";
import fetchCategories from "../../services/getCategories";
import styles from "./addPost.module.css";
import { sp } from "../../utils/formatNumbers";
import {
  Button,
  Container,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getAllPosts } from "../../services/user";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: null,
    province: "",
    city: "",
    category: "",
    images: null,
  });

  const queryClient = useQueryClient();

  const [alert, setAlert] = useState("");
  const [permission, setPermission] = useState(false);

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { refetch } = useQuery({
    queryKey: ["all-posts"],
    queryFn: getAllPosts,
  });

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("آگهی با موفقیت ایجاد شد", {
        position: "top-center",
        draggable: true,
      });
      setForm({
        title: "",
        content: "",
        amount: null,
        province: "",
        city: "",
        category: "",
        images: null,
      });
      queryClient.invalidateQueries("categories");
      queryClient.invalidateQueries("all-posts");
    },
    onError: () => {
      toast.error("خطا در ایجاد آگهی", {
        position: "top-center",
        draggable: true,
      });
    },
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name !== "images") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      const file = event.target.files[0];

      if (file.size > 2000000) {
        setAlert("حجم عکس انتخاب شده بیش از حد مجاز است (حجم مجاز: 2MB)");
        setPermission(false);
      } else {
        setAlert("");
        setPermission(true);
        setForm({ ...form, [name]: file });
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }
    if (permission) {
      mutate(formData);
      queryClient.invalidateQueries("userPosts");
    }
  };

  const categories = data?.response;
  return (
    <Container maxWidth="sm">
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
              افزودن آگهی
            </Typography>
            <hr
              color="#a62626"
              style={{ height: "4px", borderRadius: "50px" }}
            />
          </Grid2>
          <Grid2>
            <TextField
              required
              fullWidth
              label="عنوان"
              variant="outlined"
              size="small"
              name="title"
              value={form.title || ""}
            />
          </Grid2>
          <Grid2>
            <TextField
              required
              fullWidth
              multiline
              rows={5}
              label="توضیحات"
              variant="outlined"
              size="small"
              name="content"
              value={form.content || ""}
            />
          </Grid2>
          <Grid2>
            <TextField
              type="number"
              required
              fullWidth
              label="مبلغ به تومان"
              variant="outlined"
              size="small"
              name="amount"
              value={form.amount || ""}
              className={styles.noSpinner}
            />
            <Typography fontSize="16px" mt={1}>
              {form.amount && `${sp(form.amount)} تومان`}
            </Typography>
          </Grid2>
          {/* //فرم انتخاب استان و شهرستان */}
          <ProvinceAndCity form={form} setForm={setForm} />
          <Grid2>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">دسته بندی</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form.category || ""}
                name="category"
                label="دسته بندی"
                onChange={changeHandler}
              >
                {categories?.map((category) => (
                  <MenuItem value={category._id} key={category.slug}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2>
            <div className={styles.upload}>
              <input
                required
                id="upload-image"
                name="images"
                type="file"
                accept="image/*"
              />
              <label htmlFor="upload-image">تصویر آگهی</label>
            </div>
            {alert && (
              <Typography fontSize="16px" mt={1} color="error">
                {alert}
              </Typography>
            )}
          </Grid2>
          <Grid2>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#a62626" }}
            >
              ثبت آگهی
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
}

export default AddPost;
