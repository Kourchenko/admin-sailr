"use client";

import styles from './page.module.css'
import { Grid, Chip } from "@mui/material";

import Header from "@/app/components/client/layouts/header/Header";
import ChatPopUp from "@/app/components/client/chat/ChatPopUp";

import FormHealth from "@/app/components/client/form/FormHealth.js";
import IntegrationHub from "@/app/components/client/integration/IntegrationHub.js";

export default function Home() {
    return (
        <>
            <main className={styles.main}>
                <Header />

                <Grid container direction="row" justifyContent="flex-start">
                    <Grid item sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "50%", xl: "50%" } }}>
                        <FormHealth />
                    </Grid>
                    <Grid item sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "50%", xl: "50%" } }}>
                        <IntegrationHub />
                    </Grid>
                </Grid>

                <ChatPopUp />
            </main>
        </>
    )
}
