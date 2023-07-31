const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    let row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("XndrWilde GitHub")
                .setURL("https://github.com/sponsors/XndrWilde")
                .setStyle(Discord.ButtonStyle.Link),
        );

    client.embed({
        title: `${client.user.username}・Dona`,
        desc: '_____ \n\nClicca sul pulsante qui sotto per la pagina del supporter \n',
        thumbnail: client.user.avatarURL({dynamic: true}),
        url: "https://github.com/sponsors/XndrWilde",
        components: [row],
        type: 'editreply'
    }, interaction)
}
