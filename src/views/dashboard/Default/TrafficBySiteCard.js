import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired
};

export default function AppTrafficBySite({ title, subheader, list, ...other }) {
  return (
    <Card
      {...other}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: 'background.default',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardHeader 
        title={title} 
        subheader={subheader} 
        sx={{ textAlign: 'center', mb: 2 }}
      />

      <CardContent>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-thumb': { backgroundColor: 'grey.400', borderRadius: 3 },
          }}
        >
          {list.map((site) => (
            <Paper
              key={site.name}
              sx={{
                minWidth: 100,
                maxWidth: 220,
                flex: '0 0 auto',
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                background: 'linear-gradient(to bottom, #4facfe, #00f2fe)',
                color: '#fff',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                '&:hover': { transform: 'scale(1.08)', boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.2)' }
              }}
            >
              <Box sx={{ fontSize: 40, mb: 1 }}>{site.icon}</Box>

              <Typography variant="h4" fontWeight={700}>
                {fShortenNumber(site.value)}
              </Typography>

              <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.9 }}>
                {site.name}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
