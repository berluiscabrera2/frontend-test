import React from "react";
import { useState, useMemo, useEffect } from "react";
import "./ClientTable.scss";
import { MaterialReactTable } from "material-react-table";
import { columnInfo } from "../../util/ColumnsInfo";
import useAddresses from "../../hooks/useAddresses";
import CatchHandler from "../../custom-components/CatchHandler";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box/Box";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ClientTable = () => {
  const { data, isLoading, isError, error } = useAddresses();
  const [sorting, setSorting] = useState([]);

  const flatData = useMemo(() => data ?? [], [data]);
  const columns = useMemo(() => columnInfo, [data]);

  const EditButton = styled(Button)(() => ({
    color: "white",
    fontWeight: 700,
    backgroundColor: "#273F70",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#476094",
    },
  }));

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
        enableSorting
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
        icons={{
          SortIcon: (props) => (<KeyboardArrowDownIcon sx={{color: "#273F70"}} {...props} />),
          MoreVertIcon: (props) => (<KeyboardArrowDownIcon sx={{color: "white"}} {...props} />), 
        }}
        renderToolbarInternalActions={() => (
          <EditButton
            onClick={() => console.log("hola")} //setCreateModalOpen(true)}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Nuevo Domicilio
          </EditButton>
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
            maxHeight: "5"
          },
          InputLabelProps: {
            shrink: true,
          },
        }}
        muiTablePaginationProps={{
          rowsPerPageOptions: [10],
          showFirstButton: false,
          showLastButton: false,
          SelectProps: {
            native: true,
          },
          backIconButtonProps:{style:{ height: '36px', width: '36px' ,borderRadius: '0px', boxShadow: "0 1px 3px 0 rgba(00, 00, 00, 0.5)", marginRight: '5px'}},
          nextIconButtonProps: {style:{color:"#273F70", height: '36px', width: '36px' ,borderRadius: '0px', boxShadow: "0 1px 3px 0 rgba(00, 00, 00, 0.5)", marginLeft: '5px'}}
        }}
      />
    </section>
  );
};

export default ClientTable;
