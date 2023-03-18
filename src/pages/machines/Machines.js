import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography, Link } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';
import Modal from 'components/modal/Modal';
import ModalArea from 'components/modal/ModalArea';

// data
import squads from 'data/squads.json'


function ShadowBox({ addMachine, name, role, sx }) {
    if (addMachine) {
        return (
            <MainCard border={true} sx={sx} >
                <Stack spacing={1} justifyContent="center" alignItems="center">
                    <Modal />
                </Stack>
            </MainCard>
        );
    } else {
        return (
            <Link href="free/machines/info" underline="none">
                <MainCard border={true} sx={sx} >
                    <Stack spacing={1} justifyContent="center" alignItems="center">
                        <Typography variant="h6">{name}</Typography>
                        <Typography variant="subtitle1">{role}</Typography>
                    </Stack>
                </MainCard>
            </Link>
        );
    }
};

ShadowBox.propTypes = {
    addMachine: PropTypes.bool,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    sx: PropTypes.object,
};

const Machines = () => {
    return (
        <ComponentSkeleton>
            <Grid item xs={12} sx={{ mb: 2.25 }}>
                <Stack
                    direction="row"
                    spacing={1}
                >
                    <ModalArea />
                </Stack>
            </Grid>
            <Grid container spacing={3}>
                {
                    squads.data.map((el) => (
                        <Grid item xs={12}>
                            <MainCard title={el.team}>
                                <Grid container spacing={3}>
                                    <Grid item xs={1} sm={1} md={1} lg={1} >
                                        <ShadowBox 
                                            addMachine 
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
