const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    let amount = interaction.options.getNumber('amount');
    let user = interaction.user;

    if (!amount) return client.errUsage({usage: "withdraw [amount]", type: 'editreply'}, interaction);

    if (isNaN(amount)) return client.errNormal({error: "inserisci un numero valido!", type: 'editreply'}, interaction);

    if (amount < 0) return client.errNormal({
        error: `non puoi prelevare denaro negativo!`,
        type: 'editreply'
    }, interaction);

    Schema.findOne({Guild: interaction.guild.id, User: user.id}, async (err, data) => {
        if (data) {
            if (data.Bank === 0) return client.errNormal({
                error: `non hai più niente nel conto in banca!`,
                type: 'editreply'
            }, interaction);

            let money = parseInt(amount);

            data.Money += money;
            data.Bank -= money;
            data.save();

            client.succNormal({
                text: `Hai prelevato del denaro dal tuo conto in banca!`,
                fields: [
                    {
                        name: `${client.emotes.economy.coins}┆Importo`,
                        value: `$${amount}`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction);
        } else {
            client.errNormal({text: `Non hai denaro da prelevare!`, type: 'editreply'}, interaction);
        }
    })
}