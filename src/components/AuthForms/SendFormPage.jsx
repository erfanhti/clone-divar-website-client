import { ToastContainer, toast } from "react-toastify";
import { sendOtp } from "../../services/auth";
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";

function SendFormPage({ mobile, setMobile, setStep, setCode }) {
  const mobileRegex = /((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (mobileRegex.test(mobile) === false) {
      toast.warn("لطفا یک شماره موبایل معتبر وارد کنید", {
        position: "top-center",
        draggable: true,
      });
    } else {
      const { response, error } = await sendOtp(mobile);
      if (error) {
        toast.error("خطا در ارسال کد تأیید", {
          position: "top-center",
          draggable: true,
        });
      } else {
        setStep(2);
        setCode("");
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "72vh",
      }}
    >
      <Grid2 container spacing={3}>
        <Grid2
          size={{ xs: 12 }}
          sx={{
            p: 4,
            boxShadow: " 0 6px 20px 0 rgba(0, 0, 0, 0.16)",
            borderRadius: "24px",
          }}
        >
          <form onSubmit={submitHandler}>
            <Typography component="h2" variant="h6" color="#a62626">
              ورود به حساب کاربری
            </Typography>

            <Typography mt={2} mb={2} component="p" variant="p">
              قبل از ثبت آگهی، لطفاً وارد حساب خود شوید.
            </Typography>
            <Divider />
            <Typography mt={2} mb={2} component="p" variant="p">
              شمارهٔ موبایل خود را وارد کنید
            </Typography>
            <TextField
              inputProps={{ maxLength: 11 }}
              label="شماره موبایل"
              fullWidth
              variant="outlined"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
            />
            <FormControlLabel
              sx={{ "& .MuiSvgIcon-root": { fontSize: 20 }, margin: "16px 0" }}
              required
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#a62626",
                    },
                  }}
                />
              }
              label="شرایط استفاده از خدمات و حریم خصوصی دیوار را می‌پذیرم."
            />

            <br />
            <Button
              sx={{ width: "100px", backgroundColor: "#a62626" }}
              type="submit"
              variant="contained"
            >
              تایید
            </Button>
          </form>
        </Grid2>
      </Grid2>
      <ToastContainer />
    </Container>
  );
}

export default SendFormPage;
