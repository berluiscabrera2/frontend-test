import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingSession() {
    return (
        <Backdrop sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} open={true}>
            <div style={{
                position:'absolute',
                height: '100%',
                width: '100%',
                backgroundColor: "#fff",
                backgroundSize: "cover",
                filter: 'blur(5px)',
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                backdropFilter: 'blur(4px)',
            }}/>
            <CircularProgress disableShrink style={{color: "#273F70"}}/>
        </Backdrop>
    );
}
