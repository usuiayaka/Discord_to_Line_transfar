// Express（Webサーバー）と axios（HTTPクライアント）を読み込み
import express from "express";
import axios from "axios";
import { getGroupIdFromSheet } from "./sheet.js";
import { saveGroupIdToSheet } from "./sheet.js";

const app = express();

// JSON 形式のリクエストボディを受け取れるようにする
app.use(express.json());

// LINE のアクセストークンを環境変数から取得
const LINE_TOKEN = process.env.LINE_TOKEN;

// Webhook 受信エンドポイント
app.post("/webhook", async (req, res) => {
  const events = req.body.events;

  for (const event of events) {
    // グループに招待されたとき
    if (event.type === "join" && event.source.type === "group") {
      const groupId = event.source.groupId;
      console.log("Bot が招待されたグループID:", groupId);

    // Spreadsheet に保存
    await saveGroupIdToSheet(groupId);
    }
  }

  res.sendStatus(200);
});


// Discord からのメッセージを受け取るエンドポイント
// bot.js がここに POST してくる
app.post("/discord-to-line", async (req, res) => {

  // LINE の送り先ユーザーIDを Google Spreadsheet から取得
  const LINE_GROUP_ID = await getGroupIdFromSheet();

  // Discord 側から送られてきたメッセージ本文
  const text = req.body.text;

  // デバッグ用に内容をコンソールに表示
  console.log(text);

  // ★ LINE に転送する処理
  await axios.post(
    "https://api.line.me/v2/bot/message/push",
    {
      to: LINE_GROUP_ID,                // 送り先の LINE グループID
      messages: [{ type: "text", text }] // 送るメッセージ
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_TOKEN}` // LINE のアクセストークン
      }
    }
  );

  // Discord 側に「受け取ったよ」と返す
  res.send("ok");
});

// サーバーを起動
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});