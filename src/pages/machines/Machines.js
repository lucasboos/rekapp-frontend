import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { UserAddOutlined } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';

// data
import squads from 'data/squads.json'


function ShadowBox({ add, name, role, sx }) {
    return (
        <MainCard border={true} sx={sx} >
            <Stack spacing={1} justifyContent="center" alignItems="center">
                { add ?
                    <UserAddOutlined />
                :
                    <>
                        <Typography variant="h6">{name}</Typography>
                        <Typography variant="subtitle1">{role}</Typography>
                    </>
                }
            </Stack>
        </MainCard>
    );
};

ShadowBox.propTypes = {
    add: PropTypes.bool,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    sx: PropTypes.object,
};

const Machines = () => {
    return (
        <ComponentSkeleton>
            <Grid container spacing={3}>
                {
                    squads.data.map((el) => (
                        <Grid item xs={12}>
                            <MainCard title={el.team}>
                                <Grid container spacing={3}>
                                    <Grid item xs={1} sm={1} md={1} lg={1} >
                                        <ShadowBox 
                                            add 
                                            sx={{
                                                height: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        />
                                    </Grid>
                                    {
                                        el.machines.map((machines) => (
                                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                                <ShadowBox name={machines.name} role={machines.role} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </MainCard>
                        </Grid>
                    ))
                }
                
            </Grid>
        </ComponentSkeleton>
    );
};

export default Machines;
