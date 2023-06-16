import React from "react";
import { useState, useMemo, useEffect } from "react";
import "./ClientTable.scss";
import { MaterialReactTable } from "material-react-table";
import { columnInfo } from "../../util/ColumnsInfo";
import useAddresses from "../../hooks/useAddresses";
import CatchHandler from "../../custom-components/CatchHandler";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const ClientTable = () => {
  const { data, isLoading, isError, error } = useAddresses();
  const [sorting, setSorting] = useState([]);

  const flatData = useMemo(() => data ?? [], [data]);
  const columns = useMemo(() => columnInfo, [data]);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      //CatchHandler(error);
    }
  }, [sorting]);

  if (isError) return CatchHandler(error);

  return (
    <section className="client-table-container">
      <h3>Consulta Cliente Domicilio</h3>
      <hr></hr>
      <MaterialReactTable
        columns={columns}
        data={flatData}
        enableFullScreenToggle={false}
        enableColumnFilters={false}
        enableHiding={false}
        enableDensityToggle={false}
        onSortingChange={setSorting}
        positionGlobalFilter="left"
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        state={{
          isLoading: isLoading,
          showAlertBanner: isError,
          sorting,
        }}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => console.log("hola")} //setCreateModalOpen(true)}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Nuevo Domicilio
          </Button>
        )}
        muiTableContainerProps={{
          sx: {
            maxHeight: '410px'
          }
        }}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "0",
            m: 'auto'
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: "#273F70",
            color: "white",
            fontSize: {
              xs: "8px",
              sm: "9px",
              md: "10px",
              lg: "11px",
              xl: "12px",
            },
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            fontSize: {
              xs: "10px",
              sm: "11px",
              md: "12px",
              lg: "13px",
              xl: "14px",
            },
            "& tr:nth-of-type(odd)": {
              backgroundColor: "#FAFAFA",
            },
          },
        }}
        muiTableBodyProps={{
          sx: {
            "& tr:nth-of-type(even)": {
              backgroundColor: '#FAFAFA',
            },
          },
        }}
        muiSearchTextFieldProps={{
          variant: "outlined",
          placeholder: `Escribe lo que deseas buscar`,
          size: "small",
          sx: {
            fontSize: "12px",
            fontWeight: "400",
          },
          InputLabelProps: {
            shrink: true,
          },
        }}
      />
    </section>
  );
};

export default ClientTable;
