import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/user";
import { Grid2 } from "@mui/material";
import { sp } from "../../utils/formatNumbers";
import { CityContext } from "../../context/CityProvider";
import styles from "./main.module.css";

function Main() {
  const baseURL = "http://localhost:3400/";

  const { selectedCities, setSelectedCities } = useContext(CityContext);

  const { data, isPending, isError } = useQuery({
    queryKey: ["all-posts"],
    queryFn: getAllPosts,
  });

  // فیلتر کردن آگهی‌ها بر اساس شهرهای انتخاب شده
  const filteredPosts = data?.posts.filter((post) =>
    selectedCities.includes(post.options.city)
  );

  return (
    <Grid2 container mt={4} spacing={2} size={{ xs: 12, sm: 10 }}>
      {filteredPosts?.length === 0 && <h3>آگهی در این شهر وجود ندارد</h3>}
      {!isPending &&
        data &&
        filteredPosts?.map((post) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={post._id}>
            <div className={styles.card}>
              <div className={styles.content}>
                <p>{post.options.title}</p>
                <div className={styles.detail}>
                  <p>{`${sp(post.amount.toString())} تومان`}</p>
                  <p>{post.options.city}</p>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
              </div>
              <div className={styles.image}>
                <img src={`${baseURL}${post.images[0]}`} />
              </div>
            </div>
          </Grid2>
        ))}
    </Grid2>
  );
}

export default Main;
