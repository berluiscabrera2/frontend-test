import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Button from "@mui/material/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2/dist/sweetalert2.js";
import logo from '../../assets/images/logoreal.png'
import "./ClientHeader.scss";

const ClientHeader = () => {
  const [completeName, setCompleteName] = useState("Nombre completo");

  const handleSubmit = async () => {
    const { value: completeName } = await Swal.fire({
      title: "Nombre Completo",
      input: "text",
      inputLabel: "Escribe tu nombre completo en ",
      inputPlaceholder: "Ingresa tu nombre completo en el siguiente campo",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#273F70",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#A30000",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
        color: "red",
      },
    });

    if (completeName) {
      Swal.fire({
        title: `Ingresaste el nombre: ${completeName}`,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      setCompleteName(completeName);
    }
  };

  const handleCancel = async () => {
    Swal.fire({
      title: "Borrar Nombre",
      text: "¿Estas seguro de que quieres eliminar el nombre?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#A30000",
      confirmButtonText: "Si, eliminalo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      setCompleteName('');
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "El nombre ha sido eliminado", "success");
      }
    });
  };

  const EditButton = styled(Button)(() => ({
    color: "#273F70",
    fontWeight: 700,
    backgroundColor: "white",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "white",
    },
  }));

  const CancelButton = styled(Button)(() => ({
    color: "#273F70",
    width: "35px",
    minWidth: "5px",
    fontWeight: 700,
    backgroundColor: "white",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "white",
    },
  }));

  return (
    <section className="client-header-container">
      <div className="client-header-container__info">
        <img src={logo} alt="logo"/>
        <h1>{completeName}</h1>
      </div>
      <div className="client-header-container__btns">
        <EditButton
          variant="contained"
          startIcon={<EditOutlinedIcon sx={{ color: "#273F70" }} />}
          onClick={handleSubmit}
          sx={{
            width: 90,
          }}
        >
          Editar
        </EditButton>
        <CancelButton variant="contained" onClick={handleCancel}>
          <CloseOutlinedIcon sx={{ color: "#A30000", fontSize: 20 }} />
        </CancelButton>
      </div>
    </section>
  );
};

export default ClientHeader;
