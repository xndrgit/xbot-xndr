const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `[📘]・Informazioni sul proprietario`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({dynamic: true, size: 1024}),
        fields: [
            {
                name: "[👑]┆Nome del proprietario",
                value: `[Xndr]`,
                inline: true,
            },
            {
                name: "[🏷]┆Tag Discord",
                value: `XndrWilde`,
                inline: true,
            },
            {
                name: "[🏢]┆Organizzazione",
                value: `[X]`,
                inline: true,
            },
            // {
            //     name: "[🌐]┆Sito web",
            //     value: `[https://corwindev.nl](https://corwindev.nl)`,
            //     inline: true,
            // }
        ],
        type: 'editreply'
    }, interaction)
}
