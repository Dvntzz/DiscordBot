// chamando as classes necessarias da lib do discord.js
const fs = require("node:fs");
const path = require("node:path");
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("./config.json");

// Criando uma nova instancia do cliente com intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Defina um novo item na Coleção com a chave como o nome do comando e o valor como o módulo exportado
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[CUIDADO] O comando em ${filePath} está sem uma propriedade "data" ou "execute" obrigatória.`
    );
  }
}

// quando o cliente estiver pronto, rode esse codigo(apenas quando estiver pronto)
//Usamos 'c' para o parâmetro do evento para mantê-lo separado do 'cliente' já definido
client.once(Events.ClientReady, (c) => {
  console.log(`Pronto! ${c.user.tag} Está online!!`);
});

// Logando no discord com o token de cliente
client.login(token);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(
      `Nenhum comando a seguir ${interaction.commandName} foi encontrado.`
    );
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Tivemos um erro ao executar o comando!",
      ephemeral: true,
    });
  }
});
