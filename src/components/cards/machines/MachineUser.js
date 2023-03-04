import PropTypes from 'prop-types';

import { Box, Grid, Typography, CardMedia } from '@mui/material';

import MainCard from 'components/MainCard';

import avatar1 from 'assets/images/users/avatar-1.png';

const MachineUser = ({ title, count, }) => (
    <MainCard title="Sample Card" contentSX={{ p: 2.25, display: "flex" }}>
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 48, borderRadius: 50 }}
          image={avatar1}
          alt="Live from space album cover"
        />
      </Box>
      
      <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 2 }}>
        <Typography variant="h4" color="inherit">
            {title}
        </Typography>
        <Grid container alignItems="center">
            <Grid item>
                <Typography variant="h6" color="textSecondary">
                    {count}
                </Typography>
            </Grid>
        </Grid>
      </Box>
    </MainCard>
);

MachineUser.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

MachineUser.defaultProps = {
    color: 'primary'
};

export default MachineUser;
