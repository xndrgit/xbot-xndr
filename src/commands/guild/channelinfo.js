const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const channel = interaction.options.getChannel('channel');

    client.embed({
        title: `ℹ・Informazioni canale`,
        desc: `Informazioni sul canale: <#${channel.id}>`,
        fields: [
            {
                name: "Tipo",
                value: `${channel.type}`,
                inline: true,
            },
            {
                name: "ID",
                value: `${channel.id}`,
                inline: true,
            },
            {
                name: "Tipo",
                value: `${channel.type}`,
                inline: true,
            },
            {
                name: "Creato il",
                value: `${channel.createdAt}`,
                inline: true,
            },
            {
                name: "Argomento",
                value: `${channel.topic ? channel.topic : 'N/A'}`,
                inline: true,
            },
            {
                name: "NSFW",
                value: `${channel.nsfw}`,
                inline: true,
            },
            {
                name: "Categoria",
                value: `${channel.parentID ? `<#${channel.parentID}>` : 'N/A'}`,
                inline: true,
            },
        ],
        type: 'editreply'
    }, interaction)
}