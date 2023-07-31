const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    let amount = interaction.options.getNumber('amount');
    let user = interaction.user;

    if (!amount) return client.errUsage({usage: "deposito [quantità]", type: 'editreply'}, interaction);

    if (isNaN(amount)) return client.errNormal({error: "Inserisci un numero valido!", type: 'editreply'}, interaction);

    if (amount < 0) return client.errNormal({
        error: `non puoi depositare denaro negativo!`,
        type: 'editreply'
    }, interaction);

    Schema.findOne({Guild: interaction.guild.id, User: user.id}, async (err, data) => {
        if (data) {
            if (data.Money < parseInt(amount)) return client.errNormal({
                error: `non hai abbastanza denaro!`,
                type: 'editreply'
            }, interaction);

            let money = parseInt(amount);

            data.Money -= money;
            data.Bank += money;
            data.save();

            client.succNormal({
                text: `Hai depositato del denaro nella tua banca!`,
                fields: [
                    {
                        name: `${client.emotes.economy.coins}┆Quantità`,
                        value: `$${amount}`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction);
        } else {
            client.errNormal({text: `Non hai denaro da depositare!`, type: 'editreply'}, interaction);
        }
    })
}