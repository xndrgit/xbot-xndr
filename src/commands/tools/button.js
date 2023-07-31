const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const url = interaction.options.getString('url');
    const text = interaction.options.getString('text');

    if (text.length > 50) return client.errNormal({
        error: "il testo del tuo pulsante non può superare i 50 caratteri",
        type: 'editreply'
    }, interaction);

    let button = new Discord.ButtonBuilder()
        .setLabel(`${text}`)
        .setURL(`${url}`)
        .setStyle(Discord.ButtonStyle.Link);

    let row = new Discord.ActionRowBuilder()
        .addComponents(button)

    client.embed({
        title: `🔗・${text}`,
        desc: `Clicca sul pulsante per aprire il link!`,
        components: [row],
        type: 'editreply'
    }, interaction)

}