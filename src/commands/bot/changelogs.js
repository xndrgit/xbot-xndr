const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "📃・Aggiornamenti",
        desc: `_____`,
        thumbnail: client.user.avatarURL({size: 1024}),
        fields: [{
            name: "📃┆Aggiornamenti",
            value: '15/3/2023 Updated dependencies',
            inline: false,
        },
        ],
        type: 'editreply'
    }, interaction)
}

 
