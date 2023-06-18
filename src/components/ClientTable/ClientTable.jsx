import React from "react";
import { useState, useMemo, useEffect, useRef} from "react";
import "./ClientTable.scss";
import { MaterialReactTable } from "material-react-table";
import CreateNewAccountModal from "../../custom-components/CreateNewAccountModal ";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { MRT_GlobalFilterTextField } from "material-react-table";
import { columnInfo } from "../../util/ColumnsInfo";
import useAddresses from "../../hooks/useAddresses";
import CatchHandler from "../../custom-components/CatchHandler";
import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box/Box";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import locationIcon from '../../assets/images/Location.svg'

const ClientTable = () => {
  const { data, isLoading, isError, error } = useAddresses();
  const [sorting, setSorting] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false); 
  const [tableWidth, setTableWidth] = useState(0);
  const parentRef = useRef(null);

  const flatData = useMemo(() => data ?? [], [data]);
  const columns = useMemo(() => columnInfo, [data]);

  const handleCreateNewRow = (values) => {
    alert("En caso de que se necesite crear un CRUD, favor notificarme para proceder con ello.");
  };

  const CreateButton = styled(Button)(() => ({
    color: "white",
    fontSize: "13px",
    fontWeight: 700,
    backgroundColor: "#273F70",
    width: {
      xs: "90px",
      sm: "147px",
      md: "147px",
      lg: "147px",
      xl: "147px",
    },
    height: "36px",
    paddingRight: 5,
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
      console.log(error);
    }
  }, [sorting]);

  useEffect(() => {
    function handleResize() {
      const parentWidth = parentRef.current.clientWidth; //;
      setTableWidth(parentWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isError) return CatchHandler(error);

  return (
    <section ref={parentRef} className="client-table-container">
      <h3>Consulta Cliente Domicilio</h3>
      <hr></hr>

      <MaterialReactTable
        columns={columns}
        data={flatData}
        enableFullScreenToggle={false}
        enableColumnFilters={false}
        enableHiding={false}
        enableDensityToggle={false}
        enableRowActions
        positionGlobalFilter="none"
        localization={MRT_Localization_ES}
        enableSorting
        onSortingChange={setSorting}
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
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: '...', //change header text
            size: 90, //make actions column wider
            marginRight: 50,
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
            muiTableBodyCellProps: {
              align: 'center', //change body cell props
            },
          },
        }}
        renderTopToolbarCustomActions={({ table }) => (
          <Box sx={{ display: 'flex', gap: '1rem',  alignItems: 'center', p: '4px' }}>
            <Typography
            sx={{fontSize: {
              xs: "14px",
              sm: "14px",
              md: "14px",
              lg: "16px",
              xl: "16px",
            }}}
            >Buscar: </Typography>
            <MRT_GlobalFilterTextField table={table}/>
          </Box>
        )}
        renderRowActions={({ row }) => {
          return(
          <a target="_blank"
          rel="noreferrer"
          href={row.original.Addresses}
          style={{width: "24px", display: 'inline-block'}}
          >
            <img src={locationIcon} alt="locationIcon"/>
          </a>
        )}}
        renderToolbarInternalActions={() => (
          tableWidth > 600 ? <CreateButton
            onClick={() => setCreateModalOpen(true)} //setCreateModalOpen(true)}
            variant="contained"
            startIcon={<AddIcon sx={{margin: 0}} />}
          >
            Nuevo Domicilio
          </CreateButton>
          : 
          <CreateButton
            onClick={() => setCreateModalOpen(true)} //setCreateModalOpen(true)}
            variant="contained"
            startIcon={<AddIcon sx={{margin: 0}} />}
          >
          </CreateButton>

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
              xs: "12px",
              sm: "12px",
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
            fontSize: {
              xs: "8px",
              sm: "9px",
              md: "10px",
              lg: "11px",
              xl: "12px",
            },
            '& .MuiInputBase-input':{
              height:'16px',
              fontSize: "12px"
            },
            '& .MuiSvgIcon-root':{
              color:'#273F70',
            },
            '& .MuiInputAdornment-root':{
              display:'none',
            },
            width: {
              xs: "150px",
              sm: "200px",
              md: "288px",
              lg: "288px",
              xl: "288px",
            },
            fontWeight: "400",
           
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
          sx: {
            '& .MuiTablePagination-displayedRows':{
              color: '#9B9B9B',
              fontSize: '12px',
              marginRight: 2
            }
          },
          backIconButtonProps:{sx:{ color: "#273F70" ,height: '36px', width: '36px' ,borderRadius: '5px', boxShadow: "0 1px 3px 0 rgba(00, 00, 00, 0.5)", marginRight: '5px'}},
          nextIconButtonProps: {sx:{color:"#273F70", height: '36px', width: '36px' ,borderRadius: '5px', boxShadow: "0 1px 3px 0 rgba(00, 00, 00, 0.5)", marginLeft: '5px'}}
        }}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </section>
  );
};

export default ClientTable;
