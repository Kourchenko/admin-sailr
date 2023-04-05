import React, { useEffect, useState } from "react";
import { FormControl, FormHelperText, Input, InputLabel, Button, TextField } from "@mui/material";
import PivotTableChartIcon from "@mui/icons-material/PivotTableChart";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";

import { createChatCompletion, createCompletion, createEdit } from "openai/index";

import "/src/App.css";

export default function SmartTextField() {
    const [textField, setTextField] = useState("");
    const [suggestedTextField, setSuggestedTextField] = useState("");

    useEffect(() => {

    }, []);

    function executeChat() {
        createChatCompletion(textField).then((response) => {
            console.log(response);

            const data = response.data;
            const choices = response.data.choices;
            const answer = response.data.choices[0];
            const answerText = response.data.choices[0].message.content;
            const sanitizedText = answerText;
            console.log(data);
            setSuggestedTextField(sanitizedText);
        })
    }

    function executeCreateCompletion() {
        createCompletion(textField).then((response) => {
            const data = response.data;
            const choices = response.data.choices;
            const answer = response.data.choices[0];
            const answerText = response.data.choices[0].text;
            const sanitizedText = answerText.replace("\n", "").replace("\n", "");
            console.log(data);
            setSuggestedTextField(sanitizedText);
        })
    }

    function executeCreateEdit() {
        createEdit(textField).then((response) => {
            const data = response.data;
            const choices = response.data.choices;
            const answer = response.data.choices[0];
            const answerText = response.data.choices[0].text;
            const sanitizedText = answerText.replace("\n", "").replace("\n", "");
            console.log(data);
            setSuggestedTextField(sanitizedText);
        })
    }

    return (
        <>
            <FormControl>
                <InputLabel htmlFor="my-text-field">Text Field</InputLabel>
                <Input id="my-text-field"
                    aria-describedby="my-text-field-text"
                    multiline rows={4}
                    onChange={e => {
                        setTextField(e.target.value);
                        executeCreateCompletion(e.target.value);
                    }}
                    value={textField}
                />
                <FormHelperText id="my-text-field-text"></FormHelperText>
                <Button color="success" size="small" variant="outlined"
                    startIcon={<PivotTableChartIcon />}
                    onClick={executeCreateCompletion}
                >Answer</Button>

                <Button size="small" variant="outlined"
                    startIcon={<ScatterPlotIcon />}
                    onClick={executeChat}
                >AutoComplete</Button>
            </FormControl>

            <FormControl>
                <TextField id="my-suggested-field"
                    aria-describedby="my-suggested-field"
                    variant="filled"
                    multiline rows={4}
                    value={suggestedTextField}
                />
                <Button size="small" variant="outlined"
                    startIcon={<PivotTableChartIcon />}
                    onClick={() => setTextField(suggestedTextField)}
                >Use Suggestion</Button>
            </FormControl>
        </>
    )
}