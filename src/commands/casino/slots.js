const slotItems = ["🍇", "🍉", "🍊", "🍎", "🍓", "🍒"];
const Discord = require('discord.js');
const ms = require("parse-ms");

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;

    Schema.findOne({Guild: interaction.guild.id, User: user.id}, async (err, data) => {
        if (data) {
            let money = parseInt(interaction.options.getNumber('amount'));
            let win = false;

            if (!money) return client.errUsage({usage: "slots [importo]", type: 'editreply'}, interaction);
            if (money > data.Money) return client.errNormal({
                error: `stai scommettendo più di quello che hai!`,
                type: 'editreply'
            }, interaction);

            let number = []
            for (i = 0; i < 3; i++) {
                number[i] = Math.floor(Math.random() * slotItems.length);
            }

            if (number[0] == number[1] && number[1] == number[2]) {
                money *= 9
                win = true;
            } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
                money *= 2
                win = true;
            }

            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('slots_1')
                        .setLabel(`${slotItems[number[0]]}`)
                        .setStyle(Discord.ButtonStyle.Primary),

                    new Discord.ButtonBuilder()
                        .setCustomId('slots_2')
                        .setLabel(`${slotItems[number[1]]}`)
                        .setStyle(Discord.ButtonStyle.Primary),

                    new Discord.ButtonBuilder()
                        .setCustomId('slots_3')
                        .setLabel(`${slotItems[number[2]]}`)
                        .setStyle(Discord.ButtonStyle.Primary),
                );
            if (win) {

                client.embed({
                    title: `🎰・Slot`,
                    desc: `Hai vinto **${client.emotes.economy.coins} $${money}**`,
                    color: client.config.colors.successo,
                    components: [row],
                    type: 'editreply'
                }, interaction)

                data.Money += money;
                data.save();
            } else {

                client.embed({
                    title: `🎰・Slot`,
                    desc: `Hai perso **${client.emotes.economy.coins} $${money}**`,
                    components: [row],
                    color: client.config.colors.errore,
                    type: 'editreply'
                }, interaction)

                data.Money -= money;
                data.save();
            }
        } else {
            client.errNormal({error: `non hai ${client.emotes.economy.coins}!`, type: 'editreply'}, interaction);
        }
    })
}