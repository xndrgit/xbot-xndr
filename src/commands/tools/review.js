const Discord = require('discord.js');

const Schema = require("../../database/models/reviewChannels");

module.exports = async (client, interaction, args) => {
    // Ottenere il numero di stelle e il messaggio di recensione dal comando
    const stars = interaction.options.getNumber('stars');
    const message = interaction.options.getString('message') || 'Non fornito';

    // Verificare che il numero di stelle sia compreso tra 1 e 5
    if (stars < 1 || stars > 5) return client.errNormal({
        error: `le stelle devono essere comprese tra 1 e 5`,
        type: 'editreply'
    }, interaction)

    // Verificare se il canale di recensione è stato impostato nel database
    Schema.findOne({Guild: interaction.guild.id}, async (err, data) => {
        if (data) {
            // Invio di un messaggio di errore se il canale di recensione non è stato trovato
            const channel = interaction.member.guild.channels.cache.get(data.Channel);
            if (!channel) return client.errNormal({
                error: `nessun canale di recensione impostato! usa \`reviewchannel\``,
                type: 'editreply'
            }, interaction);

            // Creazione di un messaggio di conferma e invio del messaggio di recensione al canale di recensione
            let totalStars = "";
            for (let i = 0; i < stars; i++) {
                totalStars += ":star:";
            }

            client.succNormal({
                text: "La tua recensione è stata inviata con successo",
                fields: [
                    {
                        name: `⭐┇Stelle`,
                        value: `${stars}`,
                        inline: true
                    },
                    {
                        name: `📘┇Canale`,
                        value: `<#${data.Channel}>`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction);

            client.embed({
                title: `Recensione・${interaction.user.tag}`,
                desc: `È stata scritta una nuova recensione!`,
                fields: [
                    {
                        name: "Stelle",
                        value: `${totalStars}`,
                        inline: true,
                    },
                    {
                        name: "Note",
                        value: `${message}`,
                        inline: true,
                    },
                ]
            }, channel)

        } else {
            // Invio di un messaggio di errore se il canale di recensione non è stato trovato
            client.errNormal({
                error: `nessun canale di recensione impostato! usa \`reviewchannel\``,
                type: 'editreply'
            }, interaction)
        }
    })
}