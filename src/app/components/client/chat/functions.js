import { createChatCompletion } from "@/app/api/openai";

const executeChatCompletion = (prompt, key) => {
    return createChatCompletion(prompt).then((response) => {
        const messageContent = response.data.choices[0].message.content;
        return createNewMessage(messageContent, "system", key);
    })
}

const createNewMessage = (prompt, role, key) => {
    return {
        "key": key + prompt.hashCode(),
        "role": role,
        "message": prompt,
        "last": true
    }
}

String.prototype.hashCode = function () {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}

export {
    executeChatCompletion,
    createNewMessage
}