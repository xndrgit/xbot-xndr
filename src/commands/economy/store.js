const Discord = require('discord.js');

const store = require("../../database/models/economyStore");

module.exports = async (client, interaction, args, message) => {
    store.find({Guild: interaction.guild.id}, async (err, storeData) => {
        if (storeData && storeData.length > 0) {
            const lb = storeData.map(e => `**<@&${e.Role}>** - ${client.emotes.economy.coins} $${e.Amount} \n**Per acquistare:** \`buy ${e.Role}\``);

            await client.createLeaderboard(`🛒・Negozio di ${interaction.guild.name}`, lb, interaction);
            client.embed({
                title: `🛒・Negozio del bot`,
                desc: `**Canna da pesca** - ${client.emotes.economy.coins} $100 \n**Per acquistare:** \`buy fishingrod\``,
            }, interaction.channel);
        } else {
            client.errNormal({
                error: `nessun negozio trovato in questo server!`,
                type: 'editreply'
            }, interaction);
        }
    })

}