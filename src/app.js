import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import { pegarClima } from './weather.js';

config(); // Carregar variáveis de ambiente do arquivo .env

// Função para registrar comandos globais
async function InstallGlobalCommands(appId, commands) {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  try {
    console.log('Iniciando a atualização dos comandos de aplicação (/)');
    await rest.put(
      Routes.applicationCommands(appId),
      { body: commands }
    );
    console.log('Comandos de aplicação (/) registrados com sucesso');
  } catch (error) {
    console.error('Erro ao registrar comandos de aplicação (/)');
    console.error(error);
  }
}

// Criação do cliente do bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Permite interagir com servidores
    GatewayIntentBits.GuildMessages, // Permite interagir com mensagens de servidores
    GatewayIntentBits.MessageContent, // Necessário para acessar o conteúdo das mensagens
  ],
});

// Criação do Comando Clima no bot
const Clima = {
  name: 'clima', // Nome do comando em minúsculas
  description: 'Previsão do tempo para uma cidade',
  type: 1,
  options: [
    {
      name: 'cidade',
      description: 'Nome da cidade para obter a previsão do tempo',
      type: 3, // Tipo STRING
      required: true,
    },
  ],
};

// Evento para processar interações de comandos
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'clima') {
    // Aqui você pode adicionar a lógica para buscar a previsão do tempo
    const cidade = options.getString('cidade');
    try {
      const clima = await pegarClima(cidade);
      await interaction.reply(`🌤️ Clima em ${clima.cidade}: ${clima.descricao}\n🌡️ Temperatura: ${clima.temperatura}°C\n💨 Vento: ${clima.vento} m/s`);
    } catch (error) {
      await interaction.reply('Desculpe, não consegui obter a previsão do tempo.');
    }
  }

    // Por exemplo, você pode usar uma API de clima para obter os dados
    // const cidade = interaction.options.getString('cidade');
    // const previsao = `Previsão do tempo para ${cidade}: Ensolarado com chance de chuva.`;

    // await interaction.reply(previsao);
});

const all_Commands = [Clima];
InstallGlobalCommands(process.env.APP_ID, all_Commands);

// Evento disparado quando o bot está online
client.once('ready', () => {
  console.log(`Bot online como ${client.user.tag}`);
});

// Evento para processar mensagens recebidas
client.on('messageCreate', (message) => {
  // Imprime no terminal todas as mensagens recebidas
  console.log(`[${message.author.tag}]: ${message.content}`);
});

// Login do bot com o token
client.login(process.env.DISCORD_TOKEN);