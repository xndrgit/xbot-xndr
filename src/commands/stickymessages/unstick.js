const Discord = require('discord.js');

const Schema = require("../../database/models/stickymessages");

module.exports = async (client, interaction, args) => {
    const channel = interaction.options.getChannel('channel');

    Schema.findOne({Guild: interaction.guild.id, Channel: channel.id}, async (err, data) => {
        if (data) {
            Schema.findOneAndDelete({Guild: interaction.guild.id, Channel: channel.id}).then(() => {
                client.succNormal({
                    text: "Messaggio appiccicoso rimosso",
                    fields: [
                        {
                            name: `📘┆Canale`,
                            value: `${channel}`
                        }
                    ],
                    type: 'editreply'
                }, interaction);
            })
        } else {
            client.errNormal({
                error: 'nessun messaggio trovato!',
                type: 'editreply'
            }, interaction)
        }
    })
}
