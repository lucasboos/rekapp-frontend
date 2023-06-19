import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// material-ui
import {
    Box,
    Button,
    Grid,
    Stack,
    Typography,
    TextField
} from '@mui/material';

import AnimateButton from 'components/@extended/AnimateButton';

// project import
import MainCard from 'components/MainCard';
import ModalEditMachine from 'components/modal/ModalEditMachine';

const DashboardDefault = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [iframeSrc, setIframeSrc] = useState('');
    const location = useLocation();
    const { state } = location;

    const getTime = (date) => {
        const currentDate = date ? new Date(date) : new Date();

        if (date) {
            currentDate.setDate(currentDate.getDate() + 1)
        }

        currentDate.setHours(0, 0, 0, 0);
        const startOfDayTimestamp = currentDate.getTime();

        currentDate.setHours(23, 59, 59, 999);
        const endOfDayTimestamp = currentDate.getTime();

        return { start: startOfDayTimestamp, end: endOfDayTimestamp };
    };

    const handleExclude = () => {
        // Excluir máquina
    };

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        const dateTime = getTime(selectedDate);
        setSelectedDateTime(dateTime);
        setSelectedDate(selectedDate);
    };

    const handleApply = () => {
        const updatedIframeSrc = `https://grafana.rekapp.net/d-solo/${state.dashboard_uid}/${state.windows_user}?orgId=1&from=${selectedDateTime.start}&to=${selectedDateTime.end}&theme=light&panelId=`;
        setIframeSrc(updatedIframeSrc);
    };

    useEffect(() => {
        const time = getTime();
        const updatedIframeSrc = `https://grafana.rekapp.net/d-solo/${state.dashboard_uid}/${state.windows_user}?orgId=1&from=${time.start}&to=${time.end}&theme=light&panelId=`;
        setIframeSrc(updatedIframeSrc);
    }, []);

    return (
        <Grid container rowSpacing={1.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent={'flex-end'}
                >
                    <ModalEditMachine user={state} />
                    <AnimateButton>
                        <Button
                            disableElevation
                            size="large"
                            type="button"
                            variant="contained"
                            color="error"
                            onClick={handleExclude}
                        >
                            Excluir máquina
                        </Button>
                    </AnimateButton>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">Selecione uma data para filtrar</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: -1.25 }}>
                <TextField
                    type="date"
                    value={selectedDate || ''}
                    onChange={handleDateChange}
                />
                <Button
                    variant="contained"
                    onClick={handleApply}
                    disabled={!selectedDate}
                    sx={{ marginLeft: '10px' }}
                >
                    Aplicar
                </Button>
            </Grid>
            <Grid item xs={12} md={12}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3 }}>
                        <iframe src={iframeSrc + '1'} width="100%" height="400" frameBorder="0" title="Atividade" />
                    </Box>
                </MainCard>
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}
            <Grid item xs={6} md={6} lg={6}>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ p: 3 }}>
                        <iframe src={iframeSrc + '2'} width="100%" height="330" frameBorder="0" title="Ociosidade por pacote" />
                    </Box>
                </MainCard>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
                <MainCard sx={{ mt: 1.5 }} content={false}>
                    <Box sx={{ p: 3 }}>
                        <iframe src={iframeSrc + '3'} width="100%" height="330" frameBorder="0" title="Atividade por pacote" />
                    </Box>
                </MainCard>
            </Grid>

            {/* row 3 */}
            <Grid item xs={6} md={6} lg={6}>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ p: 3 }}>
                        <iframe src={iframeSrc + '4'} width="100%" height="600" frameBorder="0" title="Horas trabalhadas" />
                    </Box>
                </MainCard>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
                <MainCard sx={{ mt: 1.5 }} content={false}>
                    <Box sx={{ p: 3 }}>
                        <iframe src={iframeSrc + '5'} width="100%" height="600" frameBorder="0" title="Programas mais utilizados" />
                    </Box>
                </MainCard>
            </Grid>

            {/* row 4 */}
            <Grid item xs={12} md={12} lg={12}>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ p: 3 }}>
                        <iframe src={iframeSrc + '6'} width="100%" height="350" frameBorder="0" title="Programas mais utilizados por pacote" />
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
