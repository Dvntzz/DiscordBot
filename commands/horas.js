const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("horas")
    .setDescription("que horas são?"),

  async execute(interaction) {
    var userName = interaction.user;
    var date = new Date();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    var text = `Olá ${userName}, agora são ${current_time}`;

    await interaction.reply(text);
  },
};
