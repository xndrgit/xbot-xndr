const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const members = await interaction.guild.members.fetch();

    client.embed({
        title: `👤・Conteggio membri`,
        desc: `Visualizza il numero totale di membri nel server`,
        fields: [
            {
                name: `👤┆Membri`,
                value: `${members.filter(member => !member.user.bot).size} membri`,
                inline: true
            },
            {
                name: `🤖┆Bot`,
                value: `${members.filter(member => member.user.bot).size} bot`,
                inline: true
            },
            {
                name: `📘┆Totale`,
                value: `${interaction.guild.memberCount} membri`,
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction)
}