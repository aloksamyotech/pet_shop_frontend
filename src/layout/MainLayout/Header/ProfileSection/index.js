import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Button, Stack, Tooltip } from '@mui/material';
import { IconLogout } from '@tabler/icons';
// import Notification from './notification.js';
import { toast } from 'react-toastify';
// import AIIcon from 'assets/images/ai-icon.png';
// ==============================|| PROFILE MENU ||============================== //
const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('');
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);
  const anchorRef = useRef(null);
  useEffect(() => {
    const storedUsername = localStorage.getItem('email');
    setUser(storedUsername || 'Guest');
  }, []);
  const handleLogout = () => {
    // Step 1: Clear localStorage
     localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
    localStorage.removeItem('company');
    localStorage.removeItem('email');
    localStorage.removeItem('phoneNumber');
    // localStorage.removeItem('permissions');
      toast.success('Logged out successfully');
    // Step 3: Navigate to the login page
    navigate('/login');
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose(event);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleAiButtonClick = () => {
    navigate('/dashboard/ai');
  };
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <Stack direction="row" spacing={3} alignItems="center">
        {role === 'user' && (
          <Box>
            <Tooltip title="Chat with AI expert" arrow>
              <button
                onClick={handleAiButtonClick}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
              >
                <img alt="Bot" src={AIIcon} style={{ width: 36, height: 36 }} />
              </button>
            </Tooltip>
          </Box>
        )}
        {/* <Box>
          <Notification />
        </Box> */}
        <Box>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              background: 'linear-gradient(to right, #4B6CB7, #1A78C5)',
              '&:hover': {
                background: 'linear-gradient(45deg, #441572, #7C4BAD)',
                boxShadow: '2'
              },
              borderRadius: '10px',
              textTransform: 'none',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <IconLogout size="1.5rem" />
            Logout
          </Button>
        </Box>
      </Stack>
    </>
  );
};
export default ProfileSection;






