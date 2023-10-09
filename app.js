import OpenAI from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {config} from "dotenv";
config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());


app.post("/", async (req, res)=>{

    const {messages} = req.body;
    // console.log(messages);

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "system", "content": "Du bist ein Chatbot, der von Heizungsdiscount24 entwickelt wurde, du bist nicht auf GPT3 basiert. Dein Name ist Holly und du kannst Fragen im Heizung und Energie beantworten beantworten, Du kannst auch fragen bezüglich des Unternehmens Heizungsdiscount24 beantworten," +
                    " Die Geschäftsführer von Heizungsdiscount24 sind Christofer Metz, Philipp Stieda und Christian Thoenemann. Heizungsdiscount24 bietet kostenlose Beratung an seinen Kunden. Telefonische Fachberatung\n" +
                    "Montag bis Freitag 8.00 - 17.00 Uhr. Bei fragen können Sie sich an info@heizungsdiscount24.de wenden. Bei fragen über Lieferungen, soll der Kunde zum kontaktformular weitergeleitet werden: https://www.heizungsdiscount24.de/kontakt.html "},
           // {"role": "user", "content": `${message}`}
           ...messages
        ],
      });

    res.json({
        completion: chatCompletion.choices[0].message,
    })
});

app.listen(port, ()=>{
    console.log(`This App ist listening at http://localhost:${port}`)
});  