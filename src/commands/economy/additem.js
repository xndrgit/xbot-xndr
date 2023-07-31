const Discord = require('discord.js');

const store = require("../../database/models/economyStore");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const role = interaction.options.getRole('role');
    let amount = interaction.options.getNumber('amount');

    if (!role || !amount) return client.errUsage({usage: "additem [role] [amount]", type: 'editreply'}, interaction);

    if (isNaN(amount)) return client.errNormal({error: "inserisci un numero valido!", type: 'editreply'}, interaction);

    if (role == interaction.guild.roles.everyone) return client.errNormal({
        error: "non puoi aggiungere il ruolo @everyone al negozio!",
        type: 'editreply'
    }, interaction);

    store.findOne({Guild: interaction.guild.id, Role: role.id}, async (err, storeData) => {
        if (storeData) {
            client.errNormal({error: `questo ruolo è già presente nel negozio!`, type: 'editreply'}, interaction);
        } else {

            new store({
                Guild: interaction.guild.id,
                Role: role.id,
                Amount: amount
            }).save();

            client.succNormal({
                text: `Il ruolo è stato aggiunto al negozio!`,
                fields: [
                    {
                        name: `🛒┆Ruolo`,
                        value: `<@&${role.id}>`,
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
        }
    })
}