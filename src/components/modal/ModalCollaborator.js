import { useEffect, useState } from 'react';

// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Dialog,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    Checkbox,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const system_role = [
    {
        id: 1,
        name: 'Admin'
    },
    {
        id: 2,
        name: 'Gestor'
    },
]


export default function ModalCollaborator() {
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [ownerlessUserData, setOwnerlessUserData] = useState({});
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const ownerlessUser = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/v1/user/configure`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setOwnerlessUserData(data);
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        ownerlessUser();
    }, []);

    return (
        <div>
            <ToastContainer />
            <AnimateButton>
                <Button
                    disableElevation
                    size="large"
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                >
                    Cadastrar colaborador
                </Button>
            </AnimateButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Formik
                        initialValues={{
                            email: '',
                            first_name: '',
                            last_name: '',
                            job_role: '',
                            password: '',
                            windows_user: '',
                            area_id: '',
                            role_id: '',
                            machine_id: ''
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().max(255).required('É necessário preencher o email'),
                            first_name: Yup.string().max(255).required('É necessário preencher o nome'),
                            last_name: Yup.string().max(255).required('É necessário preencher o sobrenome'),
                            windows_user: Yup.string().max(255).required('É necessário preencher o usuário do windows'),
                            job_role: Yup.string().max(255).required('É necessário preencher o cargo'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                setStatus({ success: false });
                                setSubmitting(true);

                                const response = await fetch('http://127.0.0.1:5000/api/v1/user/signup', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    },
                                    body: JSON.stringify({
                                        name: values.first_name + ' ' + values.last_name,
                                        email: values.email,
                                        windows_user: values.windows_user,
                                        job_role: values.job_role,
                                    })
                                });

                                const data = await response.json();

                                if (response.ok) {
                                    toast.success('Colaborador adicionado com sucesso!');
                                    setStatus({ success: true });
                                    handleClose();
                                } else if (response.status === 401) {
                                    toast.error('Colaborador já consta na base de dados.');
                                    setErrors({ submit: data.error });
                                    setStatus({ success: false });
                                }
                                else {
                                    toast.error(data.error);
                                    setErrors({ submit: data.error });
                                    setStatus({ success: false });
                                }
                            } catch (err) {
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                            }
                            setSubmitting(false);
                        }}

                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="fname-collaborator">Nome*</InputLabel>
                                            <OutlinedInput
                                                id="fname-collaborator"
                                                type="name"
                                                value={values.first_name}
                                                name="first_name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="John"
                                                fullWidth
                                                error={Boolean(touched.first_name && errors.first_name)}
                                            />
                                            {touched.first_name && errors.first_name && (
                                                <FormHelperText error id="helper-text-fname-collaborator">
                                                    {errors.first_name}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="lname-collaborator">Sobrenome*</InputLabel>
                                            <OutlinedInput
                                                id="lname-collaborator"
                                                type="name"
                                                value={values.last_name}
                                                name="last_name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Wick"
                                                fullWidth
                                                error={Boolean(touched.last_name && errors.last_name)}
                                            />
                                            {touched.last_name && errors.last_name && (
                                                <FormHelperText error id="helper-text-lname-collaborator">
                                                    {errors.last_name}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="wuser-collaborator">
                                                {isCheckboxChecked ? 'Selecione o usuário do windows' : 'Nome de usuário do windows'}
                                            </InputLabel>
                                            {isCheckboxChecked ? (
                                                <Select
                                                    id="wuser-collaborator"
                                                    value={values.windows_user}
                                                    name="windows_user"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    error={Boolean(touched.windows_user && errors.windows_user)}
                                                >
                                                    {ownerlessUserData.map((user) => (
                                                        <MenuItem key={user.windows_user} value={user.windows_user}>
                                                            {user.windows_user}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            ) : (
                                                <OutlinedInput
                                                    id="wuser-collaborator"
                                                    type="name"
                                                    value={values.windows_user}
                                                    name="windows_user"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="JOHN-92183"
                                                    fullWidth
                                                    error={Boolean(touched.windows_user && errors.windows_user)}
                                                />
                                            )}
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item>
                                                    <Checkbox
                                                        disableRipple
                                                        checked={isCheckboxChecked}
                                                        onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Selecione para adicionar um usuário existente
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            {touched.windows_user && errors.windows_user && (
                                                <FormHelperText error id="helper-text-wuser-collaborator">
                                                    {errors.windows_user}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email-collaborator">E-mail*</InputLabel>
                                            <OutlinedInput
                                                id="email-collaborator"
                                                type="email"
                                                value={values.email}
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="john@email.com"
                                                fullWidth
                                                error={Boolean(touched.email && errors.email)}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText error id="helper-text-email-collaborator">
                                                    {errors.email}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="job-role">Cargo*</InputLabel>
                                            <OutlinedInput
                                                id="job-role"
                                                type="job_role"
                                                value={values.job_role}
                                                name="job_role"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Desenvolvedor"
                                                fullWidth
                                                error={Boolean(touched.job_role && errors.job_role)}
                                            />
                                            {touched.job_role && errors.job_role && (
                                                <FormHelperText error id="helper-text-job-role">
                                                    {errors.job_role}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Adicionar
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
