import { Grid, Typography } from '@mui/material';

import MachineUser from 'components/cards/machines/MachineUser';

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h3">Equipe 1</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MachineUser title="Clebinho Testo" count="Desenvolvedor" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MachineUser title="Clebinho Testo" count="Desenvolvedor" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MachineUser title="Clebinho Testo" count="Desenvolvedor" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MachineUser title="Clebinho Testo" count="Desenvolvedor" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MachineUser title="Clebinho Testo" count="Desenvolvedor" percentage={59.3} extra="35,000" />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h3">Equipe 2</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MachineUser title="Clebinho Testo" count="Desenvolvedor" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MachineUser title="Clebinho Testo" count="Desenvolvedor" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MachineUser title="Clebinho Testo" count="Desenvolvedor" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MachineUser title="Clebinho Testo" count="Desenvolvedor" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MachineUser title="Clebinho Testo" count="Desenvolvedor" percentage={59.3} extra="35,000" />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        </Grid>
    );
};

export default DashboardDefault;
