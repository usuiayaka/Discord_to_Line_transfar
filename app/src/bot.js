// Discord.js と axios を読み込み
import { Client, GatewayIntentBits } from "discord.js";

export function startBot(sendToLine) {
  // Discord Bot のトークンと、転送先 API の URL を環境変数から取得
  const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

  // Discord クライアントを作成
  // 必要な Intent（メッセージ取得など）を指定
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,          // サーバー関連のイベント
      GatewayIntentBits.GuildMessages,   // メッセージイベントを受け取る
      GatewayIntentBits.MessageContent   // メッセージ本文を取得する（必須）
    ]
  });

  // メッセージを受け取った時のイベント
  client.on("messageCreate", async (message) => {
    // Bot 自身のメッセージは無視
    if (message.author.bot) return;

    // ★ Botのみがメンションされているときのみ処理を続行
    if (
      !message.mentions.everyone &&          // 全体メンション除外
      message.mentions.users.size > 0 &&     // 個別メンションあり
      message.mentions.roles.size === 0      // ロールメンションなし
    ) {
      // ★ メンション部分を削除
      const cleaned = message.content
        .replace(/<@!?(\d+)>/g, "")
        .trim();

      // Line に転送する処理の呼び出し
      await sendToLine(cleaned);
    }
    else {
      return; // メンションされていない場合は処理を終了
    }
  });

  // Discord にログイン
  client.login(DISCORD_TOKEN);
}