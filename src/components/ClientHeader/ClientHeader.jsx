import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Button from "@mui/material/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { styled } from '@mui/material/styles';
import "./ClientHeader.scss";

const ClientHeader = () => {

    const EditButton = styled(Button)(() => ({
        color: "#273F70",
        fontWeight: 700,
        backgroundColor: "white",
        textTransform: "capitalize",
        '&:hover': {
          backgroundColor: "white",
        },
      }));

      const CancelButton = styled(Button)(() => ({
        color: "#273F70",
        width: '35px',
        minWidth: '5px',
        fontWeight: 700,
        backgroundColor: "white",
        textTransform: "capitalize",
        '&:hover': {
          backgroundColor: "white",
        },
      }));



  return (
    <section className="client-header-container">
      <div className="client-header-container__info">
        <AccountCircleOutlinedIcon sx={{ fontSize: 40 }} />
        <h1>Nombre completo</h1>
      </div>
      <div className="client-header-container__btns">
        <EditButton
          variant="contained"
          startIcon={<EditOutlinedIcon sx={{ color: "#273F70" }} />}
          sx={{
            width: 90
          }}
        >
          Editar
        </EditButton>
        <CancelButton variant="contained">
          <CloseOutlinedIcon sx={{ color: "#A30000", fontSize: 20 }} />
        </CancelButton>
      </div>
    </section>
  );
};

export default ClientHeader;
