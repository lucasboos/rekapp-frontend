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


export default function ModalCollaborator() {
//   const axios = require('axios');
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
                    email: '',
                    firstName: '',
                    lastName: '',
                    role: '',
                    passwd: '',
                    area_id: '',
                    user_role: '',
                    machine_id: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().max(255).required('É necessário preencher o email'),
                    firstName: Yup.string().max(255).required('É necessário preencher o nome'),
                    lastName: Yup.string().max(255).required('É necessário preencher o sobrenome'),
                    role: Yup.string().max(255).required('É necessário preencher o cargo'),
                })}
                onSubmit={async (values) => {
                    try {
                      console.log(values)
                    //   await axios.post((`http://rekapp.net:8090/users`), values, {
                    //     headers: {
                    //     Authorization: `Bearer ${tag}`,
                    //     }
                    //     }).then(function (response) {
                    //         console.log(response)
                    //     }).catch(function (error) {
                    //         console.log(error)
                    //     });
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
                                    <InputLabel htmlFor="fname-collaborator">Nome*</InputLabel>
                                    <OutlinedInput
                                        id="fname-collaborator"
                                        type="name"
                                        value={values.firstName}
                                        name="firstName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="John"
                                        fullWidth
                                        error={Boolean(touched.firstName && errors.firstName)}
                                    />
                                    {touched.firstName && errors.firstName && (
                                        <FormHelperText error id="helper-text-fname-collaborator">
                                            {errors.firstName}
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
                                        value={values.lastName}
                                        name="lastName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Wick"
                                        fullWidth
                                        error={Boolean(touched.lastName && errors.lastName)}
                                    />
                                    {touched.lastName && errors.lastName && (
                                        <FormHelperText error id="helper-text-lname-collaborator">
                                            {errors.lastName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
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
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="role-collaborator">Cargo*</InputLabel>
                                    <OutlinedInput
                                        id="role-collaborator"
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
                                        <FormHelperText error id="helper-text-role-collaborator">
                                            {errors.role}
                                        </FormHelperText>
                                    )}
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
