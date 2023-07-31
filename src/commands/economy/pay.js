const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    const user = await interaction.guild.members.fetch(interaction.options.getUser('user'));
    let amount = interaction.options.getNumber('amount');

    if (amount < 0) return client.errNormal({
        error: `Non puoi pagare una quantità di denaro negativa!`,
        type: 'editreply'
    }, interaction);

    if (user.id == interaction.user.id) {
        return client.errNormal({
            error: "Non puoi pagare denaro a te stesso!",
            type: 'editreply'
        }, interaction)
    }

    Schema.findOne({Guild: interaction.guild.id, User: interaction.user.id}, async (err, data) => {
        if (data) {
            if (data.Money < parseInt(amount)) return client.errNormal({
                error: `Non hai così tanti soldi!`,
                type: 'editreply'
            }, interaction);

            let money = parseInt(amount);

            data.Money -= money;
            data.save();

            client.addMoney(interaction, user, money);

            client.succNormal({
                text: `Hai pagato del denaro a un utente!`,
                fields: [
                    {
                        name: `👤┆Utente`,
                        value: `$${user}`,
                        inline: true
                    },
                    {
                        name: `${client.emotes.economy.coins}┆Quantità`,
                        value: `$${amount}`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction);
        } else {
            client.errNormal({text: `Non hai denaro!`, type: 'editreply'}, interaction);
        }
    })
}