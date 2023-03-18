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
  DialogActions,
  Select,
  MenuItem
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// data
import squads from 'data/squads.json'

export default function ModalArea() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
                    areaUp: 99,
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('É necessário preencher o nome do setor'),
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
                                        <MenuItem value={99}>Sem setor superior</MenuItem>
                                        {
                                            squads.data.map((el) => (
                                                <MenuItem value={el.team}>{el.team}</MenuItem>
                                            ))
                                        }
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
