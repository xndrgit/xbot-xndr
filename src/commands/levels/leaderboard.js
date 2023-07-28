const Discord = require('discord.js');

const Schema = require("../../database/models/levels");

module.exports = async (client, interaction, args) => {
    const rawLeaderboard = await Schema.find({guildID: interaction.guild.id}).sort(([['xp', 'descending']])).exec();

    if (!rawLeaderboard || rawLeaderboard.length === 0) {
        return client.errNormal({
            error: `nessun dato trovato!`,
            type: 'editreply'
        }, interaction);
    }

    const lb = rawLeaderboard.map((e, index) => `**${index + 1}** | <@!${e.userID}> - Livello: \`${e.level.toLocaleString()}\` (${e.xp.toLocaleString()} xp)`);

    await client.createLeaderboard(`🆙・Livelli - ${interaction.guild.name}`, lb, interaction);
}
