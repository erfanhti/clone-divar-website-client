import { useContext, useEffect, useState } from "react";
import provincesList from "../../utils/cityNames";
import styles from "./ChoseLocation.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Grid2,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { CityContext } from "../../context/CityProvider";

function ChoseLocation({ closeHandler }) {
  const { selectedCities, setSelectedCities } = useContext(CityContext);
  const [city, setCity] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const allCities = provincesList.flatMap((i) => i[1]);

  useEffect(() => {
    setCheckedItems(selectedCities);
  }, [selectedCities]);

  const searchHandler = (event) => {
    const search = event.target.value;
    setSearchValue(search);

    const results = allCities.filter((city) => city.includes(search));
    setCity(results);
    if (search === "") setCity("");
  };

  const clickHandler = (event) => {
    const name = event.target.innerText;
    const cities = provincesList.find((i) => i[0] === name)[1];
    setCity(cities);
  };

  const handleToggle = (item) => {
    setCheckedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const deleteCityHandler = (event) => {
    const id = event.target.id;
    setCheckedItems((prev) => prev.filter((i) => i !== id));
  };

  const submitClick = () => {
    const city = checkedItems.flatMap((i) => i);
    setSelectedCities(city);
    if (city.length === 0) {
      setSelectedCities(["تهران"]);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid2 container spacing={2} display="flex" flexDirection="column">
        <div className={styles.deleteAll}>
          <Typography>انتخاب شهر</Typography>
          {checkedItems.length !== 0 && (
            <Button
              size="small"
              variant="text"
              color="divar"
              sx={{ padding: "2px 8px", borderRadius: "16px" }}
              onClick={() => setCheckedItems([])}
            >
              حذف همه
            </Button>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            height: "32px",
          }}
        >
          {checkedItems.length === 0 ? (
            <Typography variant="p" component="p">
              حداقل یک شهر انتخاب کنید
            </Typography>
          ) : (
            checkedItems.map((item, index) => {
              return (
                <div key={index} className={styles.cityToggle}>
                  <p>{item}</p>
                  <CloseIcon
                    id={item}
                    sx={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={(event) => deleteCityHandler(event)}
                  />
                </div>
              );
            })
          )}
        </div>
        <Grid2>
          <TextField
            sx={{ position: "relative" }}
            id="input-with-icon-textfield"
            placeholder="جستجو در شهرها"
            size="small"
            fullWidth
            value={searchValue}
            color="divar"
            variant="outlined"
            onChange={searchHandler}
            slotProps={{
              input: {
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <SearchOutlined />
                    </InputAdornment>
                    {searchValue && (
                      <InputAdornment
                        sx={{
                          position: "absolute",
                          left: 8,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSearchValue("");
                          setCity("");
                        }}
                      >
                        <CloseIcon />
                      </InputAdornment>
                    )}
                  </>
                ),
              },
            }}
          />
        </Grid2>
        <Divider />
        <Box
          className={styles.box}
          sx={{
            width: "100%",
            height: 400,
            overflowY: "auto",
          }}
        >
          <List>
            {city ? (
              <>
                <ListItem>
                  <ListItemButton
                    sx={{ textAlign: "right", gap: 1 }}
                    onClick={() => setCity("")}
                  >
                    <ArrowForwardIcon />
                    <ListItemText primary="همه شهرها" />
                  </ListItemButton>
                </ListItem>

                {city.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      sx={{
                        textAlign: "right",
                        borderBottom: "solid 1px #eeee",
                      }}
                      onClick={() => handleToggle(item)}
                    >
                      <ListItemText primary={item} />
                      <Checkbox
                        color="divar"
                        checked={checkedItems.includes(item)}
                        onChange={() => handleToggle(item)}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </>
            ) : (
              provincesList.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    sx={{
                      textAlign: "right",
                      borderBottom: "solid 1px #eeee",
                    }}
                    onClick={(event) => clickHandler(event)}
                  >
                    <ListItemText primary={item[0]} />
                    <ChevronLeftIcon sx={{ color: "#9f9f9f" }} />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Box>
        <Divider />
        <Grid2
          mt={1}
          display="flex"
          justifyContent="space-between"
          gap={1}
          className={styles.buttonSec}
        >
          <Button
            variant="outlined"
            onClick={() => {
              closeHandler();
            }}
          >
            انصراف
          </Button>
          {checkedItems.length === 0 ? (
            <Button disabled variant="contained">
              تایید
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#a62626" }}
              onClick={() => {
                submitClick();
                closeHandler();
              }}
            >
              تایید
            </Button>
          )}
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default ChoseLocation;
