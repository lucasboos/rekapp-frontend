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
    DialogActions
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ModalEditMachine({ user }) {
    const token = localStorage.getItem('token')
    const [open, setOpen] = useState(false);
    const [machineInfo, setMachineInfo] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRequisition = () => {
        console.log('handleRequisition')
        // TODO: Faz a requisição para testar comunicação.
    };

    const fetchMachinesInfo = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/v1/machine/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                setMachineInfo(data);
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchMachinesInfo()
    }, [])

    return (
        <div>
            <ToastContainer />
            <AnimateButton>
                <Button
                    disableElevation
                    size="large"
                    type="button"
                    variant="contained"
                    color="warning"
                    onClick={handleClickOpen}
                >
                    Editar máquina
                </Button>
            </AnimateButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Formik
                        initialValues={{
                            receiver_ip: machineInfo.receiver_ip || 'rekapp.net',
                            receiver_port: machineInfo.receiver_port || 8090,
                            package_capture_time: machineInfo.package_capture_time || 30,
                            package_capture_interval: machineInfo.package_capture_interval || 1,
                            inactivity_threshold: machineInfo.inactivity_threshold || 5,
                        }}
                        validationSchema={Yup.object().shape({
                            receiver_ip: Yup.string().max(255).required('É necessário preencher o IP do receptor'),
                            receiver_port: Yup.string().max(255).required('É necessário preencher a porta do receptor'),
                            package_capture_time: Yup.string().max(255).required('É necessário preencher o tempo de captura dos pacotes'),
                            package_capture_interval: Yup.string().max(255).required('É necessário preencher o intervalo de captura dos pacotes'),
                            inactivity_threshold: Yup.string().max(255).required('É necessário preencher o limite de inatividade'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                setStatus({ success: false });
                                setSubmitting(true);

                                const response = await fetch('http://127.0.0.1:5000/api/v1/machine/create', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    },
                                    body: JSON.stringify({
                                        user_id: user.id,
                                        receiver_ip: values.receiver_ip,
                                        receiver_port: values.receiver_port,
                                        package_capture_time: values.package_capture_time,
                                        package_capture_interval: values.package_capture_interval,
                                        inactivity_threshold: values.inactivity_threshold,
                                    })
                                });

                                const data = await response.json();

                                if (response.ok) {
                                    toast.success('Máquina vinculada com sucesso!');
                                    fetchMachinesInfo()
                                    setStatus({ success: true });
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
                                    <Grid item xs={6} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="receiverip-machine">IP do receptor*</InputLabel>
                                            <OutlinedInput
                                                id="receiverip-machine"
                                                type="ip"
                                                value={values.receiver_ip}
                                                name="receiver_ip"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="rekapp.net"
                                                fullWidth
                                                error={Boolean(touched.receiver_ip && errors.receiver_ip)}
                                            />
                                            {touched.receiver_ip && errors.receiver_ip && (
                                                <FormHelperText error id="helper-text-receiverip-machine">
                                                    {errors.receiver_ip}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="receiverport-machine">Porta do receptor*</InputLabel>
                                            <OutlinedInput
                                                id="receiverport-machine"
                                                type="port"
                                                value={values.receiver_port}
                                                name="receiver_port"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="8090"
                                                fullWidth
                                                error={Boolean(touched.receiver_port && errors.receiver_port)}
                                            />
                                            {touched.receiver_port && errors.receiver_port && (
                                                <FormHelperText error id="helper-text-receiverport-machine">
                                                    {errors.receiver_port}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="capturetime-machine">Tempo de captura dos pacotes*</InputLabel>
                                            <OutlinedInput
                                                id="capturetime-machine"
                                                value={values.package_capture_time}
                                                name="package_capture_time"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="30"
                                                fullWidth
                                                error={Boolean(touched.package_capture_time && errors.package_capture_time)}
                                            />
                                            {touched.package_capture_time && errors.package_capture_time && (
                                                <FormHelperText error id="helper-text-capturetime-machine">
                                                    {errors.package_capture_time}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="captureinterval-machine">Intervalo de captura de pacotes*</InputLabel>
                                            <OutlinedInput
                                                id="captureinterval-machine"
                                                value={values.package_capture_interval}
                                                name="package_capture_interval"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="1"
                                                fullWidth
                                                error={Boolean(touched.package_capture_interval && errors.package_capture_interval)}
                                            />
                                            {touched.package_capture_interval && errors.package_capture_interval && (
                                                <FormHelperText error id="helper-text-captureinterval-machine">
                                                    {errors.package_capture_interval}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="inactivitythreshold-machine">Limite de inatividade*</InputLabel>
                                            <OutlinedInput
                                                id="inactivitythreshold-machine"
                                                value={values.inactivity_threshold}
                                                name="inactivity_threshold"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="5"
                                                fullWidth
                                                error={Boolean(touched.inactivity_threshold && errors.inactivity_threshold)}
                                            />
                                            {touched.inactivity_threshold && errors.inactivity_threshold && (
                                                <FormHelperText error id="helper-text-inactivitythreshold-machine">
                                                    {errors.inactivity_threshold}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel>Faz uma requisição teste para o receptor</InputLabel>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    fullWidth
                                                    size="large"
                                                    type="button"
                                                    variant="contained"
                                                    color="success"
                                                    onClick={handleRequisition}
                                                >
                                                    Testar comunicação
                                                </Button>
                                            </AnimateButton>
                                        </Stack>
                                    </Grid>
                                    {errors.submit && (
                                        <Grid item xs={12}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Grid>
                                    )}
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
                                                Salvar
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
