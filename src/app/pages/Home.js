import React from "react";

import Header from "../../components/Header.js";
import ChatPopUp from "../../components/chat/ChatPopUp";

import FormHealth from "@/app/components/client/form/FormHealth.js";

import "styles/App.css";

export default function Home() {

    return (
        <>
            <Header />

            <FormHealth />

            <ChatPopUp />
        </>
    )
}