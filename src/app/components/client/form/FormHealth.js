"use client";

import React, { useState } from "react";

import { Box, Card, CardContent, Grid, Typography, Chip, Badge } from "@mui/material";
import { Stack } from "@mui/system";

import FormTable from "@/app/components/client/form/FormTable.js";

import rows from "./defaultData.js";

export default function FormHealth() {
    const [data] = useState(rows);

    const tableColumns = [
        {
            id: 1,
            label: "Form Submission"
        },
        {
            id: 2,
            label: "Form Name"
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

    const occurences = () => {
        return Object.values(data.reduce((data, { name, status, active }) => {
            if (active) {
                data[name + status] = data[name + status] || { name: name, count: 0, status };
                data[name + status].count++;
            }
            return data;
        }, {}))
    }

    return (
        <Card sx={{ margin: "8px" }}>
            <Box sx={{ paddingLeft: 0, paddingRight: 0, margin: "0 auto" }}>

                {/**************** Header ****************/}
                <Grid container spacing={2} direction="row" justifyContent="flex-start" sx={{ paddingLeft: 3, paddingTop: 2, paddingBottom: 2, paddingRight: 3, overflow: "scroll", width: { md: "100%", lg: "100%", xl: "100%" } }}>
                    <Grid item>
                        <Typography variant="h5">
                            Form Health
                        </Typography>
                    </Grid>
                </Grid>

                {/**************** Badges ****************/}
                <Grid container spacing={2} direction="row" justifyContent="flex-start" sx={{ paddingLeft: 5, paddingTop: 2, paddingBottom: 2, paddingRight: 3, overflow: "scroll", width: { md: "100%", lg: "100%", xl: "100%" } }}>
                    <Stack direction="row" spacing={1}>
                        {
                            occurences().map((row) => (
                                <Badge key={row.name + row.status} color="primary" variant="outline" badgeContent={parseInt(row.count)}>
                                    <Chip label={row.name} color={row.status === "Success" ? "success" : "error"}></Chip>
                                </Badge>
                            ))
                        }
                    </Stack>
                </Grid>

                {/**************** Submissions Count ****************/}
                <Grid container spacing={2} direction="row" justifyContent="flex-start" sx={{ paddingLeft: 5, paddingTop: 2, paddingBottom: 2, paddingRight: 3, overflow: "scroll", width: { md: "100%", lg: "100%", xl: "100%" } }}>
                    <Stack direction="row" spacing={1}>
                        <Card sx={{ minWidth: 200 }}>
                            <CardContent>
                                <Typography variant="button">
                                    Submissions Today
                                </Typography>
                                <Typography variant="h4">
                                    {rows.filter((row) => row.active).length}
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
                                <FormTable columns={tableColumns} rows={rows} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Card>

    )
}
