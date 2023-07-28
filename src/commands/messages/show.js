const Discord = require('discord.js');
const Schema = require("../../database/models/messages");

module.exports = async (client, interaction, args) => {
    let user = interaction.options.getUser('user') || interaction.user;

    Schema.findOne({Guild: interaction.guild.id, User: user.id}, async (err, data) => {
        if (data) {
            client.embed({
                title: "💬・Messaggi",
                desc: `**${user.tag}** ha inviato \`${data.Messages}\` messaggi`,
                type: 'editreply'
            }, interaction);
        } else {
            client.embed({
                title: "💬・Messaggi",
                desc: `**${user.tag}** non ha inviato alcun messaggio`,
                type: 'editreply'
            }, interaction);
        }
    });
};
