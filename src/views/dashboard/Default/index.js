import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
//import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import AppTrafficBySite from './TrafficBySiteCard';
import Iconify from '../../../ui-component/iconify';
import AppTasks from './AppTask';
import AppConversionRates from './AppConversionCard';
import AppCurrentVisits from './AppCurrentVisitCard';
import { getApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [category,setCategory] = useState([])


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
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalOrderLineChartCard isLoading={isLoading} />
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
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="Category"
              subheader="than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 }
              ]}
            />
          </Grid> */}
          {/* <Grid item xs={12} md={4} lg={6}>
            <AppCurrentVisits
              title="Category"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 }
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main]}
            />
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} lg={5}>
          <AppTrafficBySite title="Category" list={category} />

          </Grid>
          <Grid item xs={12} md={7}>
            <AppTasks
              title="Benefits"
              list={[
                { id: '1', label: 'Quality Products & Variety' },
                { id: '2', label: 'Healthy & Well-Cared-for Pets ' },
                { id: '3', label: 'Excellent Customer Service' },
                
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
