"use client";

import React from "react";

import { Box, Card, CardContent, Grid, Typography, Chip, Badge } from "@mui/material";
import { Stack } from "@mui/system";

import FormTable from "../form/FormTable";

export default function IntegrationHub() {

    const columns = [
        {
            id: 1,
            label: "Last API Call"
        },
        {
            id: 2,
            label: "Integration"
        },
        {
            id: 3,
            label: "Status"
        },
        {
            id: 4,
            label: ""
        }
    ];
    const rows = [
        {
            date: "Apr 30, 2022 - 12:53PM",
            name: "Machine Finder",
            status: "Fail",
        },
        {
            date: "Apr 30, 2022 - 12:23PM",
            name: "Bird Dog",
            status: "Fail",
        },
        {
            date: "Apr 30, 2022 - 12:23PM",
            name: "ADP",
            status: "Success",
        },
    ];

    return (
        <Card sx={{ margin: "8px" }}>
            <Box sx={{ paddingLeft: 0, paddingRight: 0, margin: "0 auto" }}>

                {/**************** Header ****************/}
                <Grid container spacing={2} direction="row" justifyContent="flex-start" sx={{ paddingLeft: 3, paddingTop: 2, paddingBottom: 2, paddingRight: 3, overflow: "scroll", width: { md: "100%", lg: "100%", xl: "100%" } }}>
                    <Grid item>
                        <Typography variant="h5">
                            Integration Hub
                        </Typography>
                    </Grid>
                </Grid>

                {/**************** Badges ****************/}
                <Grid container spacing={2} direction="row" justifyContent="flex-start" sx={{ paddingLeft: 5, paddingTop: 2, paddingBottom: 2, paddingRight: 3, overflow: "scroll", width: { md: "100%", lg: "100%", xl: "100%" } }}>
                    <Stack direction="row" spacing={1}>
                        {
                            rows.map((row) =>
                            (
                                <Badge color="primary" variant="outline" badgeContent={1}>
                                    <Chip label={row.name} color={row.status === "Success" ? "success" : "error"}></Chip>
                                </Badge>
                            ))
                        }
                    </Stack>
                </Grid>

                {/**************** Alert Count ****************/}
                <Grid container spacing={2} direction="row" justifyContent="flex-start" sx={{ paddingLeft: 5, paddingTop: 2, paddingBottom: 2, paddingRight: 3, overflow: "scroll", width: { md: "100%", lg: "100%", xl: "100%" } }}>
                    <Stack direction="row" spacing={1}>
                        <Card sx={{ minWidth: 200 }}>
                            <CardContent>
                                <Typography variant="button">
                                    Alerts
                                </Typography>
                                <Typography variant="h4">
                                    {rows.filter((row) => row.status !== "Success").length}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>

                {/**************** Table ****************/}
                <Grid container direction="row" justifyContent="flex-start" sx={{ paddingLeft: 3, paddingTop: 2, paddingBottom: 2, paddingRight: 3, overflow: "scroll", width: { md: "100%", lg: "100%", xl: "100%" } }}>
                    <Grid item sx={{ width: "100%" }}>
                        <Card padding={2} variant="outlined" sx={{ width: "100%" }}>
                            <CardContent>
                                <FormTable columns={columns} rows={rows} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    )
}
