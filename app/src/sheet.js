import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials/service-account.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// TODO:グループIDを自動で書き換える（1グループ専用のまま使いやすくする）か、複数グループに対応させる（追加で仕様検討）
export async function saveGroupIdToSheet(groupId) {
  const now = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "groups!A:B",
    valueInputOption: "RAW",
    requestBody: {
      values: [[groupId, now]],
    },
  });

  console.log("Spreadsheet に保存しました:", groupId);
}

// TODO: ここも複数グループ対応させる場合は、どのグループIDを返すかのロジックが必要
// GroupID を取得する関数
export async function getGroupIdFromSheet() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "groups!A2:A", // A2 以降に GroupID が入っている想定
  });

  const rows = res.data.values;

  if (!rows || rows.length === 0) {
    throw new Error("Spreadsheet に GroupID がありません");
  }

  // 1行目の groupId を返す
  return rows[0][0];
}