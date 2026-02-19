FROM node:20-alpine

WORKDIR /app

# package.json と package-lock.json を先にコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# 残りのソースコードをコピー
COPY . .

# Express の API を公開
EXPOSE 8080

# Node.js アプリを起動
CMD ["npm", "start"]
