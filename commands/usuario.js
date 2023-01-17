const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("usuario")
    .setDescription("Prove informações sobre o usuario"),
  async execute(interaction) {
    // interact.user é o objeto que representa o usuário que executou o comando
    // interact.member é o objeto GuildMember, que representa o usuário na guilda específica
    await interaction.reply(
      `O programa foi iniciado por ${interaction.user.username}, 
      quem se juntou a nós em ${interaction.member.joinedAt}.`
    );
  },
};
