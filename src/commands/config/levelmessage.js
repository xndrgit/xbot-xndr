const Discord = require('discord.js');

const Schema = require("../../database/models/levelMessages");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const message = interaction.options.getString('message');

    if (message.toUpperCase() == "HELP") {
        return client.embed({
            title: `ℹ️・Opzioni del messaggio di livello`,
            desc: `Queste sono le opzioni del messaggio di livello: \n
            \`{user:username}\` - Nome utente dell'utente
            \`{user:discriminator}\` - Discriminatore dell'utente
            \`{user:tag}\` - Tag dell'utente
            \`{user:mention}\` - Menzione dell'utente

            \`{user:level}\` - Livello dell'utente
            \`{user:xp}\` - Punti esperienza dell'utente`,
            type: 'editreply'
        }, interaction)
    }

    if (message.toUpperCase() == "DEFAULT") {
        Schema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if (data) {
                Schema.findOneAndDelete({Guild: interaction.guild.id}).then(() => {
                    client.succNormal({
                        text: `Messaggio di livello eliminato!`,
                        type: 'editreply'
                    }, interaction);
                })
            }
        })
    } else {
        Schema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if (data) {
                data.Message = message;
                data.save();
            } else {
                new Schema({
                    Guild: interaction.guild.id,
                    Message: message
                }).save();
            }

            client.succNormal({
                text: `Il messaggio di livello è stato impostato con successo`,
                fields: [
                    {
                        name: `💬┆Messaggio`,
                        value: `${message}`,
                        inline: true
                    },
                ],
                type: 'editreply'
            }, interaction)
        })
    }
}
