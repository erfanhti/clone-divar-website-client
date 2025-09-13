import { Box, Fade, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import ChoseLocation from "../components/Location/ChoseLocation";

function ModalSec({ openModal, closeHandler }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: "3px 6px 25px -11px rgba(0,0,0,0.75)",
    p: 4,
    outline: "none",
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={closeHandler}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <ChoseLocation closeHandler={closeHandler} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalSec;
