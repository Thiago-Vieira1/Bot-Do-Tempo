import { REST, Routes } from 'discord.js';
import { Clima, registerCommandInteractions } from './commands.js';

export async function registerCommands(client) {
  const commands = [Clima];
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log('Iniciando a atualização dos comandos de aplicação (/)');
    await rest.put(
      Routes.applicationCommands(process.env.APP_ID),
      { body: commands }
    );
    console.log('Comandos de aplicação (/) registrados com sucesso');
  } catch (error) {
    console.error('Erro ao registrar comandos de aplicação (/)');
    console.error(error);
  }

  registerCommandInteractions(client);
}

export function registerEvents(client) {
  client.once('ready', () => {
    console.log(`Bot online como ${client.user.tag}`);
  });

  client.on('messageCreate', (message) => {
    // Imprime no terminal todas as mensagens recebidas
    console.log(`[${message.author.tag}]: ${message.content}`);
  });
}