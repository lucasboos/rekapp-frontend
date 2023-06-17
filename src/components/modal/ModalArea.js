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


export default function ModalArea({ updateSquadsData, userType }) {
  const [open, setOpen] = useState(false);
  const [squadsData, setSquadsData] = useState([]);
  const token = localStorage.getItem('token')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/area/squads', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
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

  useEffect(() => {
    fetchData();
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
            Cadastrar setor
        </Button>
      </AnimateButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Formik
                initialValues={{
                    name: '',
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('É necessário preencher o nome do setor'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(true);

                        const response = await fetch('http://127.0.0.1:5000/api/v1/area/create', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                name: values.name,
                                responsible_id: userType.id
                            })
                        });

                        const data = await response.json();
                
                        if (response.ok) {
                            toast.success('Setor adicionado com sucesso!');
                            updateSquadsData();
                            fetchData();
                            setStatus({ success: true });
                            handleClose();
                        } else if (response.status === 401) {
                            toast.error('Setor já existe.');
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
                {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={2}>
                                    <InputLabel htmlFor="name-area">Nome do setor*</InputLabel>
                                    <OutlinedInput
                                        id="name-area"
                                        type="name"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Digite o nome do setor"
                                        fullWidth
                                        error={Boolean(touched.name && errors.name)}
                                    />
                                    {touched.name && errors.name && (
                                        <FormHelperText error id="helper-text-name-machine">
                                            {errors.name}
                                        </FormHelperText>
                                    )}
                                    <Typography variant="subtitle1" color="textSecondary" style={{ width: 'auto' }}>
                                        Ao cadastrar um novo setor, ele estará atrelado a você.
                                        Isso significa que você será responsável por gerenciar e
                                        tomar decisões relacionadas a esse setor.
                                    </Typography>
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
