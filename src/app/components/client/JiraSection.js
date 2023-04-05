import { TabContext, TabPanel } from "@mui/lab";
import { Box, Card, CardContent, Grid, Typography, Chip, Tabs, Tab } from "@mui/material";

import React, { useState } from "react";

import "/src/App.css";

export default function JiraSection() {

    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ paddingLeft: 3, paddingRight: 0, margin: "0 auto" }}>

            <Grid container spacing={2} direction="row" justifyContent="flex-end" sx={{ padding: 2 }}>
                <Grid item sx={{ marginLeft: { xs: "0", sm: "auto", md: "auto", lg: "auto", xl: "auto" } }}>
                    <Chip label="LIVE" sx={{ bgcolor: "rgb(52, 168, 82)", color: "#fff" }} />
                </Grid>
            </Grid>

            <Grid container spacing={2} direction="row" justifyContent="flex-start" sx={{ padding: 2 }}>
                <Grid item>
                    <Typography variant="h5">
                        JIRA Section
                    </Typography>
                </Grid>
            </Grid>

            <TabContext value={value}>
                <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { backgroundColor: "none" } }}>
                    <Tab value="1" label="Up Next"></Tab>
                    <Tab value="2" label="In Progress"></Tab>
                    <Tab value="3" label="Review"></Tab>
                </Tabs>

                {/* ********************************************* TAB 1 - UP NEXT ********************************************* */}
                <TabPanel value="1" label="Up Next" index={1} sx={{ paddingLeft: "4px", paddingRight: "4px", paddingTop: "12px", paddingBottom: "12px" }}>
                    <Grid container spacing={2} direction="row" justifyContent="flex-start">
                        <Grid item sx={{ width: { xs: "100%", sm: 275, md: 275, lg: 275, xl: 275 } }}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography sx={{ fontSize: 18 }} gutterBottom>
                                        Up Next 1
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sx={{ width: { xs: "100%", sm: 275, md: 275, lg: 275, xl: 275 } }}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography sx={{ fontSize: 18 }} gutterBottom>
                                        Up Next 2
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>


                {/* ********************************************* TAB 2 - IN PROGRESS ********************************************* */}
                <TabPanel value="2" label="In Progress" index={2} sx={{ paddingLeft: "4px", paddingRight: "4px", paddingTop: "12px", paddingBottom: "12px" }}>
                    <Grid container spacing={2} direction="row" justifyContent="flex-start">
                        <Grid item sx={{ width: { xs: "100%", sm: 275, md: 275, lg: 275, xl: 275 } }}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography sx={{ fontSize: 18 }} gutterBottom>
                                        In Progress 1
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sx={{ width: { xs: "100%", sm: 275, md: 275, lg: 275, xl: 275 } }}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography sx={{ fontSize: 18 }} gutterBottom>
                                        In Progress 2
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>


                {/* ********************************************* TAB 3 - REVIEW ********************************************* */}
                <TabPanel value="3" label="Review" index={3} sx={{ paddingLeft: "4px", paddingRight: "4px", paddingTop: "12px", paddingBottom: "12px" }}>
                    <Grid container spacing={2} direction="row" justifyContent="flex-start">
                        <Grid item sx={{ width: { xs: "100%", sm: 275, md: 275, lg: 275, xl: 275 } }}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography sx={{ fontSize: 18 }} gutterBottom>
                                        Review 1
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sx={{ width: { xs: "100%", sm: 275, md: 275, lg: 275, xl: 275 } }}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography sx={{ fontSize: 18 }} gutterBottom>
                                        Review 2
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>
            </TabContext>

        </Box>
    )
}
