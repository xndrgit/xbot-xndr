const Discord = require('discord.js');

const Schema = require("../../database/models/ticketMessage");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const type = interaction.options.getString('type');
    const message = interaction.options.getString('message');

    if (type == "open") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({Guild: interaction.guild.id})

            if (data) {
                data.openTicket = "Grazie per aver aperto un ticket! \nIl supporto sarà presto con te \n\n🔒 - Chiudi il ticket \n✋ - Rivendica il ticket \n📝 - Salva la trascrizione \n🔔 - Invia una notifica";
                data.save();

                client.succNormal({
                    text: `Il messaggio di apertura del ticket è stato impostato con successo`,
                    fields: [
                        {
                            name: `📘┆Tipo di messaggio`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `💬┆Messaggio`,
                            value: `${data.openTicket}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            } else {
                client.errNormal({
                    error: `nessun dato del messaggio di ticket trovato!`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if (data) {
                data.openTicket = message;
                data.save();
            } else {
                new Schema({
                    Guild: interaction.guild.id,
                    openTicket: message
                }).save();
            }
        })

        client.succNormal({
            text: `Il messaggio di apertura del ticket è stato impostato con successo`,
            fields: [
                {
                    name: `📘┆Tipo di messaggio`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `💬┆Messaggio`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    } else if (type == "close") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({Guild: interaction.guild.id})

            if (data) {
                data.dmMessage = "Ecco la trascrizione del tuo ticket, tienila se vuoi consultarlo in futuro!";
                data.save();

                client.succNormal({
                    text: `Il messaggio di chiusura del ticket è stato impostato con successo`,
                    fields: [
                        {
                            name: `📘┆Tipo di messaggio`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `💬┆Messaggio`,
                            value: `${data.dmMessage}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            } else {
                client.errNormal({
                    error: `nessun dato del messaggio di ticket trovato!`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if (data) {
                data.dmMessage = message;
                data.save();
            } else {
                new Schema({
                    Guild: interaction.guild.id,
                    dmMessage: message
                }).save();
            }
        })

        client.succNormal({
            text: `Il messaggio di chiusura del ticket è stato impostato con successo`,
            fields: [
                {
                    name: `📘┆Tipo di messaggio`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `💬┆Messaggio`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
}
