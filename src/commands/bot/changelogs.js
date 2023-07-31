const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "📃・Aggiornamenti",
        desc: `_____`,
        thumbnail: client.user.avatarURL({size: 1024}),
        fields: [{
            name: "📃┆Aggiornamenti",
            value: '01/08/2023 Updated commands',
            inline: false,
        },
        ],
        type: 'editreply'
    }, interaction)
}

 
