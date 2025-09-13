import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import provincesList from "../../utils/cityNames";

function ProvinceAndCity({ form, setForm }) {
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const provinceIndex = provincesList.findIndex(
    (item) => item[0] === form.province
  );
  const cityList = provincesList[provinceIndex];

  return (
    <>
      <Grid2>
        <FormControl fullWidth required>
          <InputLabel id="demo-simple-select-label">استان</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.province || ""}
            name="province"
            label="استان"
            onChange={changeHandler}
          >
            {provincesList?.map((item) => {
              return (
                <MenuItem key={item[0]} value={item[0]}>
                  {item[0]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2>
        <FormControl fullWidth required>
          <InputLabel id="demo-simple-select-label">شهرستان</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.city || ""}
            name="city"
            label="شهرستان"
            onChange={changeHandler}
          >
            {cityList &&
              cityList[1].map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Grid2>
    </>
  );
}

export default ProvinceAndCity;
