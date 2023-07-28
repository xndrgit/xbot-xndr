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
            title: `ℹ️・Opzioni del messaggio di uscita`,
            desc: `Queste sono le opzioni del messaggio di uscita: \n
            \`{user:username}\` - Nome utente dell'utente
            \`{user:discriminator}\` - Discriminatore dell'utente
            \`{user:tag}\` - Tag dell'utente
            \`{user:mention}\` - Menzione dell'utente

            \`{inviter:username}\` - Nome utente dell'invitante
            \`{inviter:discriminator}\` - Discriminatore dell'invitante
            \`{inviter:tag}\` - Tag dell'invitante
            \`{inviter:mention}\` - Menzione dell'invitante
            \`{inviter:invites}\` - Inviti dell'invitante
            \`{inviter:invites:left}\` - Inviti rimanenti dell'invitante

            \`{guild:name}\` - Nome del server
            \`{guild:members}\` - Numero di membri del server`,
            type: 'editreply'
        }, interaction)
    }

    if (message.toUpperCase() == "DEFAULT") {
        inviteMessages.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if (data) {
                data.inviteLeave = null;
                data.save();

                client.succNormal({
                    text: `Messaggio di uscita eliminato!`,
                    type: 'editreply'
                }, interaction);
            }
        })
    } else {
        inviteMessages.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if (data) {
                data.inviteLeave = message;
                data.save();
            } else {
                new inviteMessages({
                    Guild: interaction.guild.id,
                    inviteLeave: message
                }).save();
            }

            client.succNormal({
                text: `Il messaggio di uscita è stato impostato con successo`,
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
