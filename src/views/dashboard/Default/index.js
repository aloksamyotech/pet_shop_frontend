import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import TotalProduct from './TotalProduct';

import EarningCard from './EarningCard';
import PieAnimation from './PopularCard';

import TotalCustomer from './TotalCustomer';

import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import AppTrafficBySite from './TrafficBySiteCard';
import Iconify from '../../../ui-component/iconify';
import AppTasks from './AppTask';
import AppConversionRates from './AppConversionCard';
import AppCurrentVisits from './AppCurrentVisitCard';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';
import TotalCompany from '../TotalCompany';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getApi(urls.category.get);
      setCategory(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalCustomer isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalProduct isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalCompany isLoading={isLoading} />
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <EarningCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PieAnimation isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}></Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}></Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
