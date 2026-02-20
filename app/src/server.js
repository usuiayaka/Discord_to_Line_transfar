// Express（Webサーバー）と axios（HTTPクライアント）を読み込み
import express from "express";
import axios from "axios";
import { getGroupIdFromSheet, saveGroupIdToSheet } from "./sheet.js";
import { startBot } from "./bot.js";

const app = express();

// JSON 形式のリクエストボディを受け取れるようにする
app.use(express.json());

// LINE のアクセストークンを環境変数から取得
const LINE_TOKEN = process.env.LINE_TOKEN;

// ★ LINE送信処理を関数化
export async function sendToLine(text) {

  // LINE の送り先ユーザーIDを Google Spreadsheet から取得
  const LINE_GROUP_ID = await getGroupIdFromSheet();

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
}
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

// ★ Discord Bot を起動（sendToLine を渡す）
startBot(sendToLine);

// サーバーを起動
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});