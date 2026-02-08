import { Client, GatewayIntentBits } from "discord.js";
import axios from "axios";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const API_ENDPOINT = "http://localhost:3000/discord-to-line";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  await axios.post(API_ENDPOINT, {
    text: message.content
  });
});

client.login(DISCORD_TOKEN);
