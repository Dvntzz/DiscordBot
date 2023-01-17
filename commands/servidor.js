const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("servidor")
    .setDescription("Prove informações sobre o servidor."),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(
      `Servidor ${interaction.guild.name} com um total de ${interaction.guild.memberCount} members.`
    );
  },
};
