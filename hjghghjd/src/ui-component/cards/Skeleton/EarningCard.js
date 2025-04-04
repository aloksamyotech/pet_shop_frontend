// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const EarningCard = () => (
  <Card>
    <CardContent>
      <Grid container direction="column">
        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Skeleton variant="rectangular" width={14} height={14} />
            </Grid>
            <Grid item>
              <Skeleton variant="rectangular" width={14} height={14} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" sx={{ my: 2 }} height={20} />
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" height={10} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default EarningCard;
