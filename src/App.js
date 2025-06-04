// import { useSelector } from 'react-redux';

// import { ThemeProvider } from '@mui/material/styles';
// import { CssBaseline, StyledEngineProvider } from '@mui/material';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router';

// // routing
// import Routes from 'routes';

// // defaultTheme
// import themes from 'themes';

// // project imports
// import NavigationScroll from 'layout/NavigationScroll';
// import { useEffect } from 'react';

// // ==============================|| APP ||============================== //

// const App = () => {
//   const customization = useSelector((state) => state.customization);
//   const navigate = useNavigate()


// useEffect(() =>{
//   const Token= localStorage.getItem("accessToken");
//   if(!Token){
//     navigate('/login')
//   }

// },[])

//   useEffect(() => {
//     const publicPaths = ['/PetWarehouse#'];
//     if (!Token) {
//       navigate('/PetWarehouse#');
//     }
//   }, []);


//   return (
//     <StyledEngineProvider injectFirst>
//       <ThemeProvider theme={themes(customization)}>
//         <CssBaseline />
//         <ToastContainer />
//         <NavigationScroll>
//           <Routes />
//         </NavigationScroll>
//       </ThemeProvider>
//     </StyledEngineProvider>
//   );
// };

// export default App;


import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router';
import Routes from 'routes';
import themes from 'themes';
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';

const App = () => {
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const publicPaths = ['/login', '/register', '/success', '/PetWarehouse'];

    const isPublicPath = publicPaths.includes(location.pathname);

    if (!token && !isPublicPath) {
      navigate('/login');
    }
  }, [location]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <ToastContainer />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

