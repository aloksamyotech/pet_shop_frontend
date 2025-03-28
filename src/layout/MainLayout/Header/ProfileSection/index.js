import { useState } from "react";
import { Box, Button, Stack, SwipeableDrawer, Tooltip } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { IconLogout } from "@tabler/icons";
import { toast } from "react-toastify";
import ChatGPTClone from "views/AIChatBord/index";
import { useNavigate } from "react-router";

const ProfileSection = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
    toast.success("Logged out successfully");
  };

  return (
    <>
      <Stack direction="row" spacing={3} alignItems="center">
        <Tooltip title="Chat with AI expert" arrow>
          <Button onClick={() => setOpenDrawer(true)} sx={{ background: "transparent", border: "none" }}>
            <SmartToyIcon sx={{ fontSize: "2rem", color: "#6A9C89" }} />
          </Button>
        </Tooltip>

        <SwipeableDrawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => setOpenDrawer(true)}
        >
          <Box sx={{ width: 400, padding: 2, bgcolor: "white" }}>
           
            <ChatGPTClone />
          </Box>
        </SwipeableDrawer>

        <Button variant="contained" onClick={handleLogout} sx={{ background: "#6A9C89", borderRadius: "10px" }}>
          <IconLogout size="1.5rem" />
          Logout
        </Button>
      </Stack>
    </>
  );
};

export default ProfileSection;
