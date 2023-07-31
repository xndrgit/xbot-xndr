const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const role = interaction.options.getRole('role');
    const perms = role.permissions.toArray();

    client.embed({
        title: `ℹ️・Informazioni ruolo`,
        thumbnail: interaction.guild.iconURL({dynamic: true, size: 1024}),
        desc: `Informazioni sul ruolo ${role}`,
        fields: [
            {
                name: 'ID ruolo:',
                value: `${role.id}`,
                inline: true
            },
            {
                name: 'Nome ruolo:',
                value: `${role.name}`,
                inline: true
            },
            {
                name: 'Menzionabile:',
                value: `${role.mentionable ? 'Sì' : 'No'}`,
                inline: true
            },
            {
                name: 'Permessi ruolo:',
                value: `${perms.join(', ')}`
            }
        ],
        type: 'editreply'
    }, interaction)
}