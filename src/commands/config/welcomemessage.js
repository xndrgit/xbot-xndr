const Discord = require('discord.js');

const inviteMessages = require("../../database/models/inviteMessages");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const message = interaction.options.getString('message');

    if (message.toUpperCase() == "HELP") {
        return client.embed({
            title: `ℹ️・Opzioni del messaggio di benvenuto`,
            desc: `Opzioni del messaggio di benvenuto: \n
            \`{user:username}\` - Nome utente dell'utente
            \`{user:discriminator}\` - Discriminatore dell'utente
            \`{user:tag}\` - Tag dell'utente
            \`{user:mention}\` - Mention dell'utente

            \`{inviter:username}\` - Nome utente dell'invitante
            \`{inviter:discriminator}\` - Discriminatore dell'invitante
            \`{inviter:tag}\` - Tag dell'invitante
            \`{inviter:mention}\` - Mention dell'invitante
            \`{inviter:invites}\` - Inviti dell'invitante
            \`{inviter:invites:left}\` - Inviti dell'invitante rimasti
                    
            \`{guild:name}\` - Nome del server
            \`{guild:members}\` - Numero di membri del server`,
            type: 'editreply'
        }, interaction)
    }

    if (message.toUpperCase() == "DEFAULT") {
        inviteMessages.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if (data) {
                data.inviteJoin = null;
                data.save();

                client.succNormal({
                    text: `Messaggio di benvenuto eliminato!`,
                    type: 'editreply'
                }, interaction);
            }
        })
    } else {
        inviteMessages.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if (data) {
                data.inviteJoin = message;
                data.save();
            } else {
                new inviteMessages({
                    Guild: interaction.guild.id,
                    inviteJoin: message
                }).save();
            }

            client.succNormal({
                text: `Il messaggio di benvenuto è stato impostato con successo`,
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
