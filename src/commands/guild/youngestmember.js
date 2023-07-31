const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const members = await interaction.guild.members.fetch()
    const getMember = members.filter(m => !m.user.bot)
        .sort((a, b) => b.user.createdAt - a.user.createdAt);

    const member = Array.from(getMember.values());

    client.embed({
        title: `👶・Utente più giovane`,
        desc: `Vedi chi è il membro più giovane in **${interaction.guild.name}**`,
        fields: [
            {
                name: `👤┆Utente`,
                value: `${member[0]} (${member[0].user.username}#${member[0].user.discriminator})`,
                inline: true
            },
            {
                name: `⏰┆Creazione account`,
                value: `<t:${Math.round(member[0].user.createdTimestamp / 1000)}>`,
                inline: true
            },
        ],
        type: 'editreply'
    }, interaction)
}