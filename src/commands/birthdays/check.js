const Discord = require('discord.js');

const Schema = require("../../database/models/birthday");

module.exports = async (client, interaction, args) => {
    Schema.findOne({Guild: interaction.guild.id, User: interaction.user.id}, async (err, data) => {
        if (!data) return client.errNormal({
            error: "inserisci il tuo compleanno digitando /birthday set",
            type: 'editreply'
        }, interaction);

        client.embed({
            title: `${client.emotes.normal.birthday}・Il mio compleanno`,
            desc: `${interaction.user.username} birthday is on ${data.Birthday}`,
            type: 'editreply'
        }, interaction)
    })
}

 