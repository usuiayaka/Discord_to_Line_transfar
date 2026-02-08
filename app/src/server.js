import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const LINE_TOKEN = process.env.LINE_TOKEN;
const LINE_USER_ID = process.env.LINE_USER_ID;

app.post("/discord-to-line", async (req, res) => {
  const text = req.body.text;

  console.log(text);

//   await axios.post(
//     "https://api.line.me/v2/bot/message/push",
//     {
//       to: LINE_USER_ID,
//       messages: [{ type: "text", text }]
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${LINE_TOKEN}`
//       }
//     }
//   );

  res.send("ok");
});

app.listen(3000, () => console.log("API running on port 3000"));
