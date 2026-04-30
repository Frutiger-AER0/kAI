import express from 'express'
import { sendPrompt } from "./chat.js";

const app = express()
app.use(express.json())

app.post('/api/chat', async (req, res) => {
    const { message } = req.body
    const response = await sendPrompt(message)
    return res.json(response)
})

app.listen(3000, () => console.log(`Server on http://localhost:3000`))