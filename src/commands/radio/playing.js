const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📻・Informazioni sulla radio`,
        desc: `Tutte le informazioni sulla radio in questo server`,
        fields: [{
            name: "👤┆Ascoltatori nel canale",
            value: `${interaction.member.voice.channel.members.size} ascoltatori`,
            inline: true
        },
            {
                name: "📺┆Canale connesso",
                value: `${interaction.member.voice.channel} (${interaction.member.voice.channel.name})`,
                inline: true
            },
            {
                name: "🎶┆Stazione radio",
                value: `[Radio 538](https://www.538.nl/)`,
                inline: true
            },
        ],
        type: 'editreply'
    }, interaction)
}
