const Discord = require('discord.js');

const Schema = require("../../database/models/stats");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageChannels],
        perms: [Discord.PermissionsBitField.Flags.ManageChannels]
    }, interaction)

    if (perms == false) return;

    const name = interaction.options.getString('name');

    if (name.toUpperCase() == "HELP") {
        return client.embed({
            title: `ℹ️・Opzioni nome canale`,
            desc: `Queste sono le opzioni per il nome del canale: \n
            \`{emoji}\` - Emoji del canale
            \`{name}\` - Nome del canale`,
            type: 'editreply'
        }, interaction)
    }

    Schema.findOne({Guild: interaction.guild.id}, async (err, data) => {
        if (data) {
            data.ChannelTemplate = name
            data.save();
        } else {
            new Schema({
                Guild: interaction.guild.id,
                ChannelTemplate: name
            }).save();
        }

        client.succNormal({
            text: `Il nome del canale è stato impostato con successo`,
            fields: [
                {
                    name: `💬┆Nome`,
                    value: `${name}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    })
}
