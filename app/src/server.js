// Express（Webサーバー）と axios（HTTPクライアント）を読み込み
import express from "express";
import axios from "axios";

const app = express();

// JSON 形式のリクエストボディを受け取れるようにする
app.use(express.json());

// LINE のアクセストークンと送信先ユーザーIDを環境変数から取得
const LINE_TOKEN = process.env.LINE_TOKEN;
const LINE_USER_ID = process.env.LINE_USER_ID;

// Discord からのメッセージを受け取るエンドポイント
// bot.js がここに POST してくる
app.post("/discord-to-line", async (req, res) => {
  // Discord 側から送られてきたメッセージ本文
  const text = req.body.text;

  // デバッグ用に内容をコンソールに表示
  console.log(text);

  // ★ LINE に転送する処理（今はコメントアウト）
  /*
  await axios.post(
    "https://api.line.me/v2/bot/message/push",
    {
      to: LINE_USER_ID,                // 送り先の LINE ユーザー
      messages: [{ type: "text", text }] // 送るメッセージ
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_TOKEN}` // LINE のアクセストークン
      }
    }
  );
  */

  // Discord 側に「受け取ったよ」と返す
  res.send("ok");
});

// サーバーをポート3000で起動
app.listen(3000, () => console.log("API running on port 3000"));