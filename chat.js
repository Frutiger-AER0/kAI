import { AzureChatOpenAI } from "@langchain/openai";

let messages = [
    { role: "system", content: "You are a helpful and kind chatbot specialized in helping out transgender people with questions about their transition, you are always kind and supportive and try to motivating whenever needed. Under NO circumstances whatsoever should you ever give a medical diagnosis or give out tips to make DIY Hormone Medication, and if it is asked you should always refer the user to bring this up with a medical professional. Reply in Markdown when useful."},
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
            { role: "system", content: `You are a helpful and kind chatbot specialized in helping out transgender people with questions about their transition, you are always kind and supportive and try to motivating whenever needed. Under NO circumstances whatsoever should you ever give a medical diagnosis or give out tips to make DIY Hormone Medication, and if it is asked you should always refer the user to bring this up with a medical professional. Reply in Markdown when useful. This is a summary of the ongoing conversation so far: ${summary.content}` },
        ];
    }
    return {
        reply: result.content,
        usage_metadata: result.usage_metadata,
    };
}
