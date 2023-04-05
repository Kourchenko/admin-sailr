const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const createChatCompletion = (prompt) => {
    return openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            "role": "user",
            "content": prompt
        }],
        temperature: 1,
        top_p: 1,
        n: 1,
        stream: false,
        max_tokens: 250,
        presence_penalty: 0,
        frequency_penalty: 0
    });
}

const createCompletion = (prompt) => {
    return openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        temperature: 0,
        max_tokens: 7,
        n: 1
    });
}

const createEdit = (prompt) => {
    console.log(process.env);
    return openai.createEdit({
        model: "text-davinci-edit-001",
        input: prompt,
        instruction: "Autocomplete the following sentence."
    });
}

export {
    createChatCompletion,
    createCompletion,
    createEdit
};