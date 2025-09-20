import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid2,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "../services/user";
import { getCookie, removeCookie } from "../utils/cookies";
import ModalSec from "./ModalSec";
import { CityContext } from "../context/CityProvider";
import { e2p } from "../utils/formatNumbers";
import styles from "./Header.module.css";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { selectedCities, setSelectedCities } = useContext(CityContext);

  const [openModal, setOpenModal] = useState(false);
  const openHandler = () => setOpenModal(true);
  const closeHandler = () => setOpenModal(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const cookies = getCookie("accessToken");

  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
  });

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (event.target.id === "login") {
      navigate("/auth");
      setAnchorEl(null);
    }
  };
  const handleClose = async (event) => {
    if (event.target.id === "admin") {
      navigate("/admin");
      setAnchorEl(null);
    }
    if (event.target.id === "profile") {
      navigate("/dashboard");
      setAnchorEl(null);
    }
    if (event.target.id === "logout") {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      await queryClient.invalidateQueries("user");
      navigate("/auth");
    }
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} component="header" mb={4}>
      <AppBar
        position="static"
        sx={{
          boxShadow: " 0 3px 24px 0 rgba(0, 0, 0, 0.11)",
          borderRadius: "50px",
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "16px",
            height: "72px",
          }}
        >
          <Grid2 display="flex" gap={2}>
            <Link to="/">
              <Avatar src="../../public/divar.svg" sx={{ width: "70px" }} />
            </Link>
            <div onClick={openHandler} className={styles.locationSec}>
              <Avatar src="../../public/location.svg" />
              {selectedCities.length === 1 && <p>{selectedCities[0]}</p>}
              {selectedCities.length > 1 && (
                <p>{`${e2p(selectedCities.length)} شهر`}</p>
              )}
            </div>
            <ModalSec openModal={openModal} closeHandler={closeHandler} />
          </Grid2>
          <Box display="flex" gap={4} alignItems="center">
            <div>
              <Box
                display="flex"
                alignItems="center"
                sx={{ cursor: "pointer" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {cookies ? (
                  <PersonIcon
                    sx={{ color: "#a62626", width: "26px", height: "26px" }}
                  />
                ) : (
                  <Person2OutlinedIcon
                    sx={{ color: "#989898", width: "26px", height: "26px" }}
                  />
                )}
                <Typography color="#989898">دیوار من</Typography>
              </Box>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {cookies ? (
                  <div>
                    {data && data.role === "ADMIN" && (
                      <MenuItem
                        sx={{ fontSize: "18px" }}
                        id="admin"
                        onClick={(event) => handleClose(event)}
                      >
                        پنل ادمین
                      </MenuItem>
                    )}
                    <MenuItem
                      sx={{ fontSize: "18px" }}
                      id="profile"
                      onClick={(event) => handleClose(event)}
                    >
                      حساب کاربری
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: "18px" }}
                      id="logout"
                      onClick={(event) => handleClose(event)}
                    >
                      خروج از حساب کاربری
                    </MenuItem>
                  </div>
                ) : (
                  <MenuItem
                    sx={{ fontSize: "18px" }}
                    id="login"
                    onClick={(event) => handleClick(event)}
                  >
                    ورود به حساب کاربری
                  </MenuItem>
                )}
              </Menu>
            </div>

            <Link to="/dashboard">
              <Button variant="contained" sx={{ backgroundColor: "#a62626" }}>
                ثبت آگهی
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
