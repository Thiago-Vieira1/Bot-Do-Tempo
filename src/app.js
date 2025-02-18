import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { registerCommands, registerEvents } from './botSetup.js';

config(); // Carregar variáveis de ambiente do arquivo .env

// Criação do cliente do bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Permite interagir com servidores
    GatewayIntentBits.GuildMessages, // Permite interagir com mensagens de servidores
    GatewayIntentBits.MessageContent, // Necessário para acessar o conteúdo das mensagens
  ],
});

// Registrar comandos e eventos
registerCommands(client);
registerEvents(client);

// Login do bot com o token
client.login(process.env.DISCORD_TOKEN);