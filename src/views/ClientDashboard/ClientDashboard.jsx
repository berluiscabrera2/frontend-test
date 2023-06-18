import React from "react";
import ClientHeader from "../../components/ClientHeader/ClientHeader";
import ClientTable from "../../components/ClientTable/ClientTable";
import "./ClientDashboard.scss";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../muiStyles/muiStylesMainTheme";

const ClientDashboard = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ClientHeader />
        <ClientTable />
      </ThemeProvider>
    </>
  );
};

export default ClientDashboard;
