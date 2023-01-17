const { REST, Routes } = require("discord.js");
const fs = require("node:fs");

const { CLIENTID, TOKEN, GUILDID } = require("./config.json");

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(TOKEN);

const getCommands = () => {
  const getCommand = commands.map((item) => {
    console.log(item);
  });

  return getCommand;
};

// and deploy your commands!
(async () => {
  try {
    console.log(`Atualizando ${commands.length} comandos`);
    getCommands();
    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENTID, GUILDID),
      {
        body: commands,
      }
    );
    console.log(data);

    console.log(`Total de ${data.length} comandos atualizados`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
