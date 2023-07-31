const Discord = require('discord.js');

const Schema = require("../../database/models/invites");

module.exports = async (client, interaction, args) => {
    let user = interaction.options.getUser('user') || interaction.user;

    Schema.findOne({Guild: interaction.guild.id, User: user.id}, async (err, data) => {
        if (data) {
            client.embed({
                title: "📨・Invita",
                desc: `**${user.tag}** ha \`${data.Invites}\` inviti`,
                fields: [
                    {
                        name: "Totale",
                        value: `${data.Total}`,
                        inline: true
                    },
                    {
                        name: "Rimasti",
                        value: `${data.Left}`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction)
        } else {
            client.embed({
                title: "📨・Inviti",
                desc: `**${user.tag}** ha \`0\` inviti`,
                fields: [
                    {
                        name: "Totale",
                        value: `0`,
                        inline: true
                    },
                    {
                        name: "Rimasti",
                        value: `0`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction)
        }
    });
}