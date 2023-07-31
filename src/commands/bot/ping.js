const Discord = require('discord.js');
const mongoose = require('mongoose');

module.exports = async (client, interaction, args) => {
    client.simpleEmbed({
        desc: `${client.emotes.animated.loading} Calcolo del ping in corso...`,
        type: 'editreply'
    }, interaction).then((resultMessage) => {
        const ping = Math.floor(resultMessage.createdTimestamp - interaction.createdTimestamp);

        mongoose.connection.db.admin().ping(function (err, result) {

            var mongooseSeconds = ((result.ok % 60000) / 1000);
            var pingSeconds = ((ping % 60000) / 1000);
            var apiSeconds = ((client.ws.ping % 60000) / 1000);

            client.embed({
                title: `[${client.emotes.normal.pong}]・Pong`,
                desc: `[Ecco quanto è veloce il nostro bot]`,
                fields: [
                    {
                        name: "[🤖]┆Latenza del Bot",
                        value: `[${ping}ms (${pingSeconds}s)]`,
                        inline: true,
                    },
                    {
                        name: "[💻]┆Latenza dell'API",
                        value: `[${client.ws.ping}ms (${apiSeconds}s)]`,
                        inline: true,
                    },
                    {
                        name: "[📂]┆Latenza del Database",
                        value: `[${result.ok}ms (${mongooseSeconds}s)]`,
                        inline: true,
                    }
                ],
                type: 'editreply'
            }, interaction)
        })
    })
}
