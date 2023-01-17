const { CLIENTID, TOKEN, GUILDID } = require("./config.json");

// chamando as classes necessarias da lib do discord.js
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  Intents,
} = require("discord.js");
const { Player } = require("discord-player");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// Criando uma nova instancia do cliente com intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
});

const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands"); // E:\yt\discord bot\js\intro\commands
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

// List of all commands
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

// Logando no discord com o token de cliente
client.login(TOKEN);
