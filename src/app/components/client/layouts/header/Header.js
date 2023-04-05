// Required. Client-side Component.
"use client";

// React
import React from "react";
import { AppBar, Toolbar, Typography, Grid, Chip } from "@mui/material";

// CSS
import "@/app/styles/header.scss";

export default function Header() {
    return (
        <nav className="header">
            <AppBar className="header" sx={{ backgroundColor: "#fff" }}>
                <Toolbar>
                    <Typography variant="h6" noWrap href="/" color={"#000"}>
                        Admin Management
                    </Typography>
                    <Grid item sx={{ marginLeft: { xs: "auto", sm: "auto", md: "auto", lg: "auto", xl: "auto" } }}>
                        <Chip label="LIVE" sx={{ bgcolor: "rgb(52, 168, 82)", color: "#fff" }} />
                    </Grid>
                </Toolbar>

            </AppBar>
        </nav>

    );
}