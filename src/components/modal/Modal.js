import { useState } from 'react';

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

// ant-design
import { UserAddOutlined } from '@ant-design/icons';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';


export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <UserAddOutlined />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Formik
                initialValues={{
                    name: '',
                    role: '',
                    ipAddress: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('É necessário preencher o nome'),
                    role: Yup.string().max(255).required('É necessário preencher o cargo'),
                    ipAddress: Yup.string().max(255).required('É necessário preencher o endereço IP'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                      console.log(values)
                        // setStatus({ success: false });
                        // setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        // setStatus({ success: false });
                        // setErrors({ submit: err.message });
                        // setSubmitting(false);
                    }
                }}
                
            >
                {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-machine">Nome*</InputLabel>
                                    <OutlinedInput
                                        id="name-machine"
                                        type="name"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="John"
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
                                    <InputLabel htmlFor="role-machine">Cargo*</InputLabel>
                                    <OutlinedInput
                                        id="role-machine"
                                        type="role"
                                        value={values.role}
                                        name="role"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Desenvolvedor"
                                        fullWidth
                                        error={Boolean(touched.role && errors.role)}
                                    />
                                    {touched.role && errors.role && (
                                        <FormHelperText error id="helper-text-role-machine">
                                            {errors.role}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="ipAddress-machine">Endereço IP*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.ipAddress && errors.ipAddress)}
                                        id="ipAddress-machine"
                                        value={values.ipAddress}
                                        name="ipAddress"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="182.098.0.1"
                                        inputProps={{}}
                                    />
                                    {touched.ipAddress && errors.ipAddress && (
                                        <FormHelperText error id="helper-text-ipAddress-machine">
                                            {errors.ipAddress}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="team-machine">Setor</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.team && errors.team)}
                                        id="team-machine"
                                        value={values.team}
                                        name="team"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                        disabled
                                    />
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
