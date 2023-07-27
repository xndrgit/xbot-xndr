const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const message = interaction.options.getString('message');
    const channel = interaction.options.getChannel('channel');

    client.embed({
        title: `📢・Annuncio!`,
        desc: message
    }, channel);

    client.succNormal({
        text: `Annuncio spedito con successo!`,
        fields: [
            {
                name: `📘┆Canale`,
                value: `${channel} (${channel.name})`
            }
        ],
        type: 'editreply'
    }, interaction);
}

 