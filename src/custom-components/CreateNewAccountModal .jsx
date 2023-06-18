import React from 'react'
import { useState } from 'react';
import { styled } from "@mui/material/styles";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {

    const columnsAddDirection = [{header: 'LINK DIRECCION', accessorKey: 'Addresses'}, ...columns]

    const [values, setValues] = useState(() =>
    columnsAddDirection.reduce((acc, column) => {
        acc[column.accessorKey ?? ''] = '';
        return acc;
      }, {}),
    );

  
    const handleSubmit = () => {
      //put your validation logic here
      onSubmit(values);
      onClose();
    };

    const CreateNewAccountButton = styled(Button)(() => ({
        color: "white",
        minWidth: "5px",
        padding: "0.5rem 1rem",
        backgroundColor: "#273F70",
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: "#476094",
        },
      }));

      const CancelButton = styled(Button)(() => ({
        color: "white",
        minWidth: "5px",
        fontWeight: 700,
        backgroundColor: "#A30000",
        padding: "0.5rem 1rem",
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: "#d64949",
        },
      }));
  
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Crear Nuevo Domicilio</DialogTitle>
        <DialogContent sx={{padding: { xs: '5px 15px', sm: '5px 15px', md: '5px 35px' }}}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
                paddingTop: '10px',
              }}
            >
              {columnsAddDirection.map((column) => (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                  sx={{padding: 0, margin: 0}}
                />
              ))}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <CreateNewAccountButton onClick={handleSubmit}>
            Create New Account
          </CreateNewAccountButton>
        </DialogActions>
      </Dialog>
    );
  };

export default CreateNewAccountModal 