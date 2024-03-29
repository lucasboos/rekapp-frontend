// packages
import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

// material-ui
import { Grid, Stack, Typography, Link } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';
import ModalCollaborator from 'components/modal/ModalCollaborator';
import ModalArea from 'components/modal/ModalArea';
import ModalAddCollaborator from 'components/modal/ModalAddCollaborator';


function ShadowBox({ addMachine, userData, id, name, role, updateSquadsData, sx }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/machines/info', { state: userData });
    };

    if (addMachine) {
        return (
            <MainCard border={true} sx={sx} >
                <Stack spacing={1} justifyContent="center" alignItems="center">
                    <ModalAddCollaborator id={id} updateSquadsData={updateSquadsData} />
                </Stack>
            </MainCard>
        );
    } else {
        return (
            <Link
                underline="none"
                onClick={handleClick}
                sx={{ cursor: 'pointer' }}
            >
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
    name: PropTypes.string,
    role: PropTypes.string,
    sx: PropTypes.object,
};

const Machines = () => {
    const [ squadsData, setSquadsData ] = useState();
    const accessToken = localStorage.getItem('token');
    const decodedToken = accessToken ? jwtDecode(accessToken) : null;
    const userType = decodedToken ? decodedToken : '';

    const fetchAreas = async () => {
        try {
          const response = await fetch(`https://api.rekapp.net/api/v1/area/user/area/${userType.id}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
              }
          });
          const data = await response.json();

          if (response.ok) {
            setSquadsData(data);
          }
        } catch (error) {
          console.log(error)
        }
    };

    const updateSquadsData = () => {
        fetchAreas();
    };

    useEffect(() => {
        if (userType.id) {
            fetchAreas()
        }
    }, [])

    return (
        <ComponentSkeleton>
            <Grid item xs={12} sx={{ mb: 2.25 }}>
                <Stack
                    direction="row"
                    spacing={1}
                >
                    <ModalArea updateSquadsData={updateSquadsData} userType={userType} />
                    <ModalCollaborator />
                </Stack>
            </Grid>
            <Grid container spacing={3}>
                { squadsData &&
                    squadsData.map((el, index) => (
                        <Grid item xs={12} key={index}>
                            <MainCard title={el.area.name}>
                                <Grid container spacing={3}>
                                    <Grid item xs={1} sm={1} md={1} lg={1} key={el.area.id}>
                                        <ShadowBox 
                                            addMachine
                                            id={el.area.id}
                                            updateSquadsData={updateSquadsData}
                                            sx={{
                                                height: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        />
                                    </Grid>
                                    {
                                        el.users.map((user, userIndex) => (
                                            <Grid item xs={6} sm={4} md={3} lg={2} key={userIndex}>
                                                <ShadowBox userData={user} name={user.name} role={user.job_role} />
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
