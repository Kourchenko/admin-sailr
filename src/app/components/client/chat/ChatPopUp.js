"use client";

import React, { useEffect, useState, useRef } from "react";
import { TextField, Box, Card, Paper, CardContent, Typography, IconButton, Grow, Fade } from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import VoiceChatIcon from '@mui/icons-material/VoiceChat';

import { executeChatCompletion, createNewMessage } from "./functions.js";

export default function ChatPopUp() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);
    const textFieldInputRef = useRef(null);

    const handleSubmit = (inputMessage) => {
        var prompt = inputMessage ? inputMessage : message;

        // Clear input.
        textFieldInputRef.current.value = "";

        // Update last message for 'scroll to bottom' behavior.
        if (messages.length) {
            messages[messages.length - 1].last = false
        }

        // Update messages
        setMessages(oldMessages => [...oldMessages, createNewMessage(prompt, "user", messages.length + 1)]);

        // Execute OpenAI Chat
        executeChatCompletion(prompt, messages.length + 1).then((res) => {
            if (messages.length) {
                messages[messages.length - 1].last = false
            }
            setMessages(oldMessages => [...oldMessages, res]);
        });
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e.target.message)
        }
    }

    useEffect(() => {
        // Scroll To Bottom
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    if (!isOpen) {
        return (
            <IconButton size="large" sx={{ margin: "24px", position: "fixed", bottom: 0, right: 0, zIndex: 1005, backgroundColor: "rgba(0, 0, 0, 0.04)" }} onClick={() => setIsOpen(!isOpen)}>
                <Fade in={!isOpen}>
                    <VoiceChatIcon fontSize="30px" />
                </Fade>
            </IconButton>
        )
    }

    return (
        <Box sx={{ height: 350, width: 350, margin: "24px", position: "fixed", bottom: 0, right: 0, zIndex: 1005, borderRadius: 8 }}>
            <Grow direction="up" in={isOpen}>

                <Paper sx={{ height: 350, width: 350, position: "fixed" }}>

                    {/**************** Header ****************/}
                    <Paper sx={{ position: "relative", zIndex: 10, fontSize: "18px", color: "#282c34", height: 35, padding: "5px", borderRadius: 0 }}>
                        <Typography sx={{ fontSize: 18, cursor: "pointer" }} color="#282c34" onClick={() => setIsOpen(!isOpen)}>
                            OpenAI Assistant
                        </Typography>
                    </Paper>

                    {/**************** Messages ****************/}
                    <Paper id="paper" sx={{ overflow: "scroll", height: "75%", position: "relative", backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                        {
                            messages.map((d) => {
                                return (
                                    <Card ref={d.last ? messagesEndRef : null} key={d.key} variant="outlined"
                                        sx={{
                                            width: 220, margin: 1,
                                            float: d.role === "user" ? "right" : "left",
                                            border: d.role === "user" ? "1px solid #4285f4" : "1px solid #fff"
                                        }}>
                                        <CardContent sx={{ padding: "8px !important" }}>
                                            <Typography color={d.role === "user" ? "#4285f4" : "gray"} sx={{ fontSize: 16, padding: "2px" }} gutterBottom>
                                                {d.message}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </Paper>

                    {/**************** Input ****************/}
                    <Paper sx={{ width: "100%", position: "absolute", bottom: 0 }}>
                        <TextField inputRef={textFieldInputRef}
                            sx={{ width: "100%", border: "none" }}
                            InputProps={{ endAdornment: <SendRounded color="blue" onClick={() => handleSubmit()} /> }}
                            onKeyDown={handleKeyDown}
                            onChange={event => setMessage(event.target.value)} />
                    </Paper>
                </Paper>
            </Grow>
        </Box >
    )
}