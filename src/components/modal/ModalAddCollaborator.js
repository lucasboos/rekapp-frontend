import { useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';

// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// material-ui
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Grid,
} from '@mui/material';


// ant-design
import { UserAddOutlined } from '@ant-design/icons';
import AnimateButton from 'components/@extended/AnimateButton';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function ModalAddCollaborator({ id, updateSquadsData }) {
  const token = localStorage.getItem('token')
  const [open, setOpen] = useState(false);
  const [collaborator, setCollaborator] = useState([]);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/user/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      });
      const data = await response.json();

      if (response.ok) {
        setCollaborator(data);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const updateUser = async () => {
    if (selectedCollaborator) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/user/${selectedCollaborator.email}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              name: selectedCollaborator.name,
              new_email: selectedCollaborator.email,
              windows_user: selectedCollaborator.windows_user || null,
              ip: selectedCollaborator.ip || null,
              job_role: selectedCollaborator.job_role,
              area_id: id
          })
        });
        const data = await response.json();
        if (response.ok) {
          updateSquadsData();
          toast.success('Colaborador vinculado com sucesso!');
        }
      } catch (error) {
        console.log(error)
      }
    }
    else {
      toast.error('Selecione um colaborador.');
    }
  };

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  function renderRow(props) {
    const { index, style } = props;
    const collaboratorData = collaborator[index];
    const collaboratorName = collaboratorData ? collaboratorData.name : '';

    const handleItemClick = () => {
      setSelectedCollaborator(collaboratorData);
    };

    const isSelected = collaboratorData === selectedCollaborator;

    return (
      <ListItem
        style={isSelected ? { backgroundColor: '#e0e0e0' } : {}}
        key={index}
        component="div"
        disablePadding
      >
        <ListItemButton onClick={handleItemClick}>
          <ListItemText primary={collaboratorName} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <div>
        <ToastContainer />
        <Button onClick={handleClickOpen}>
            <UserAddOutlined />
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={null}
                    options={collaborator}
                    getOptionLabel={(collaborator) => collaborator.name}
                    sx={{ width: 360 }}
                    renderInput={(params) => <TextField {...params} label="Colaboradores" />}
                />
                <Box
                    sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <FixedSizeList
                        height={400}
                        width={360}
                        itemSize={46}
                        itemCount={collaborator.length}
                        overscanCount={5}
                    >
                        {renderRow}
                    </FixedSizeList>
                </Box>
            </DialogContent>
            <DialogActions>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <AnimateButton>
                  <Button
                      disableElevation
                      size="large"
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={updateUser}
                  >
                      Adicionar colaborador
                  </Button>
                </AnimateButton>
              </Grid>
            </DialogActions>
        </Dialog>
    </div>
  );
}
