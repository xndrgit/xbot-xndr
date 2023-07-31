const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    const user = interaction.options.getUser('user') || interaction.user;

    if (user.bot) return client.errNormal({
        error: "non puoi vedere il saldo di un bot!",
        type: 'editreply'
    }, interaction);

    Schema.findOne({Guild: interaction.guild.id, User: user.id}, async (err, data) => {
        if (data) {

            let total = data.Money + data.Bank;

            client.embed({
                title: `${client.emotes.economy.coins}・Saldo`,
                fields: [
                    {
                        name: `${client.emotes.economy.pocket}┆Portafoglio`,
                        value: `$${data.Money}`,
                        inline: true
                    },
                    {
                        name: `${client.emotes.economy.bank}┆Banca`,
                        value: `$${data.Bank}`,
                        inline: true
                    },
                    {
                        name: `💰┆Totale`,
                        value: `$${total}`,
                        inline: true
                    }
                ],
                desc: `Il saldo attuale di \`${user.tag}\``,
                type: 'editreply'
            }, interaction);
        } else {
            client.errNormal({
                error: `l'utente non ha alcun denaro!`,
                type: 'editreply'
            }, interaction);
        }
    })
}