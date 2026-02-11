import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials/service-account.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

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