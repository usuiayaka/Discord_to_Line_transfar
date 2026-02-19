# Discord_to_Line_transfar(Discord → LINE 転送ツール)

---

## 📌 ルール
- **月 200 通まで**（LINE Messaging API の無料枠上限）
- **他グループで使いたい場合は要設定**  
  → 開発者（ぼちお）に相談してね
- **良識の範囲で利用すること**

---

## ❓ Q&A  
質問があれば随時追加予定。

---

## 🔭 今後の展望
- 現状：招待された **1 つのグループ専用**
- 将来：**送信先グループを選べる機能**も検討中
- 「こんな機能ほしい！」があれば気軽にどうぞ  
  → できるかはわからんけど、できる限りやってみる！

---

## 📝 備忘録
- 他の環境で使いたい場合  
  → Git から clone / pull → `credentials` と `.env` を設定すれば動くはず

### 🚀 デプロイ手順（Cloud Run）

① ディレクトリ移動
README がある階層から以下で OK
```bash
cd ./app
```
②CloudRunのAPIを有効化する
```bash
gcloud services enable run.googleapis.com
```
③デプロイする
```bash
gcloud run deploy discord-line-bridge --source . --region asia-northeast1 --allow-unauthenticated
```
### 💡 オプション解説
| オプション | 意味 |
|-----------|------|
| `discord-line-bridge` | Cloud Run のサービス名 |
| `--source .` | 現在のディレクトリをソースとして使用 |
| `--region asia-northeast1` | 東京リージョンにデプロイ |
| `--allow-unauthenticated` | 認証なしでアクセス可能（Webhook 用） |

---