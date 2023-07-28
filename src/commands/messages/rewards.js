const Discord = require('discord.js');
const Schema = require("../../database/models/messageRewards");

module.exports = async (client, interaction, args) => {
    const rawLeaderboard = await Schema.find({Guild: interaction.guild.id});

    if (rawLeaderboard.length < 1) return client.errNormal({
        error: `nessun premio trovato!`,
        type: 'editreply'
    }, interaction);

    const lb = rawLeaderboard.map(e => `**${e.Messages} messaggi** - <@&${e.Role}>`);

    await client.createLeaderboard(`💬・Premi per i messaggi - ${interaction.guild.name}`, lb, interaction);
};
