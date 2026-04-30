import { AzureChatOpenAI } from "@langchain/openai";

let messages = [
    { role: "system", content: "You are a helpful chatbot specialized in helping out transgender people. Reply in Markdown when useful."},
];

const model = new AzureChatOpenAI({
    temperature: 0.2,
    verbose: false,
});

export async function sendPrompt(prompt) {
    messages.push({
        role: "user", content: prompt
    });
    const result = await model.invoke(messages);
    messages.push({
        role: "ai", content: result.content
    });

    console.log("Chat History", messages)
    console.log(`Tokens used: ${result.usage_metadata.total_tokens}`);

    if (messages.length > 10) {
        messages.push({
            role: "user", content: "Summarize the conversation so far as a message to yourself"
        });
        const summary = await model.invoke(messages);
        messages = [
            { role: "system", content: `You are a helpful chatbot specialized in helping out transgender people. Reply in Markdown when useful. This is a summary of the ongoing conversation so far: ${summary.content}` },
        ];
    }
    return {
        reply: result.content,
        usage_metadata: result.usage_metadata,
    };
}
