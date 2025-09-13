import { ToastContainer, toast } from "react-toastify";
import { checkOtp, sendOtp } from "../../services/auth";
import { setCookie } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/user";
import { useQuery } from "@tanstack/react-query";
import { Button, Container, Grid2, TextField, Typography } from "@mui/material";

function CheckForm({ code, setCode, mobile, setStep, setMobile }) {
  const navigate = useNavigate();

  const { refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    const { response, error } = await checkOtp(mobile, code);
    if (error) {
      toast.error("خطا در اعتبارسنجی کد", {
        position: "top-center",
        draggable: true,
      });
    } else {
      setCookie(response);
      navigate("/dashboard");
      refetch();

      toast.success("ورود موفقیت‌آمیز بود", {
        position: "top-center",
        draggable: true,
        autoClose: 2000,
      });
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
            <Typography mt={2} mb={2} component="h3" variant="h6">
              کد تأیید را وارد کنید
            </Typography>
            <Typography mt={2} mb={3} component="p" variant="p">
              {`کد پیامک‌شده به شمارۀ << ${mobile} >> را وارد کنید.

`}
            </Typography>
            <TextField
              inputProps={{ maxLength: 5 }}
              label="کد تأیید"
              fullWidth
              variant="outlined"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
            <Button
              sx={{
                width: "100px",
                backgroundColor: "#a62626",
                margin: "24px 0 0 8px",
              }}
              type="submit"
              variant="contained"
            >
              تایید
            </Button>
            <Button
              sx={{
                width: "fit-content",
                color: "#a62626",
                borderColor: "#a62626",
                margin: "24px 0 0 8px",
              }}
              variant="outlined"
              onClick={() => {
                setStep(1);
                setMobile("");
              }}
            >
              تغییر شماره موبایل
            </Button>
            <Button
              sx={{
                width: "fit-content",
                color: "#a62626",
                borderColor: "#a62626",
                marginTop: "24px",
              }}
              variant="outlined"
              onClick={() => sendOtp(mobile)}
            >
              درخواست کد جدید
            </Button>
          </form>
        </Grid2>
      </Grid2>
      <ToastContainer />
    </Container>
  );
}

export default CheckForm;
