import { pegarClima } from './weather.js';

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

// Função para registrar o evento de interação de comandos
function registerCommandInteractions(client) {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'clima') {
      // Função para buscar o clima da cidade informada
      const cidade = options.getString('cidade');
      try {
        const clima = await pegarClima(cidade);
        await interaction.reply(`🌤️ Clima em ${clima.cidade}: ${clima.descricao}\n🌡️ Temperatura: ${clima.temperatura}°C\n💨 Vento: ${clima.vento} m/s`);
      } catch (error) {
        await interaction.reply('Desculpe, não consegui obter a previsão do tempo.');
      }
    }
  });
}

export { Clima, registerCommandInteractions };