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
  MenuItem
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ModalArea({ updateSquadsData }) {
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
            Adicionar setor
        </Button>
      </AnimateButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Formik
                initialValues={{
                    name: '',
                    areaUp: -1,
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
                                area_up_id: values.areaUp == -1 ? null : values.areaUp
                            })
                        });

                        const data = await response.json();
                
                        if (response.ok) {
                            toast.success('Setor adicionado com sucesso!');
                            updateSquadsData();
                            fetchData();
                            setStatus({ success: true });
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
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-area">Nome da setor*</InputLabel>
                                    <OutlinedInput
                                        id="name-area"
                                        type="name"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Setor de desenvolvimento"
                                        fullWidth
                                        error={Boolean(touched.name && errors.name)}
                                    />
                                    {touched.name && errors.name && (
                                        <FormHelperText error id="helper-text-name-machine">
                                            {errors.name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="area-up">Setor superior</InputLabel>
                                    <Select
                                        id="area-up"
                                        onChange={handleChange}
                                        value={values.areaUp}
                                        name="areaUp"
                                    >
                                        <MenuItem value={-1}>Sem setor superior</MenuItem>
                                        {squadsData.map((el) => (
                                            <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                                        ))}
                                    </Select>
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
