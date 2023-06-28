// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import backgroundImage from 'assets/images/logo/logo.png';

const AuthBackground = () => {
    const theme = useTheme();
    return (
        <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: 0 }}>
            <img
                src={backgroundImage}
                alt="Background"
                style={{ width: '100%', marginLeft: '-100px', marginBottom: '200px' }}
            />
        </Box>
    );
};

export default AuthBackground;
