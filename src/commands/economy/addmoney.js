const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.Administrator],
        perms: [Discord.PermissionsBitField.Flags.Administrator]
    }, interaction)

    if (perms == false) return;

    const user = interaction.options.getUser('user');
    let amount = interaction.options.getNumber('amount');

    if (!user || !amount) return client.errUsage({usage: "addmoney [user] [amount]", type: 'editreply'}, interaction);

    if (isNaN(amount)) return client.errNormal({error: "Inserisci un numero valido!", type: 'editreply'}, interaction);

    if (user.bot) return client.errNormal({
        error: "Non puoi aggiungere denaro a un bot!",
        type: 'editreply'
    }, interaction);

    client.addMoney(interaction, user, parseInt(amount));

    setTimeout(() => {
        Schema.findOne({Guild: interaction.guild.id, User: user.id}, async (err, data) => {
            if (data) {
                client.succNormal({
                    text: `Aggiunto denaro a un utente!`,
                    fields: [
                        {
                            name: `👤┆Utente`,
                            value: `<@!${user.id}>`,
                            inline: true
                        },
                        {
                            name: `${client.emotes.economy.coins}┆Importo`,
                            value: `$${amount}`,
                            inline: true
                        }
                    ],
                    type: 'editreply'
                }, interaction);
            } else {
                client.errNormal({error: `Questo utente non ha alcun denaro!`, type: 'editreply'}, interaction);
            }
        }, 500)
    })
}