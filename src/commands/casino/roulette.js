const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;

    Schema.findOne({Guild: interaction.guild.id, User: user.id}, async (err, data) => {
        if (data) {
            function isOdd(num) {
                if ((num % 2) == 0) return false;
                else if ((num % 2) == 1) return true;
            }

            let colour = interaction.options.getString('color');
            let money = parseInt(interaction.options.getNumber('amount'));

            let random = Math.floor(Math.random() * 37);

            if (!colour || !money) return client.errUsage({
                usage: "roulette [colore] [importo]",
                type: 'editreply'
            }, interaction);
            colour = colour.toLowerCase()
            if (money > data.Money) return client.errNormal({
                error: `stai scommettendo più di quello che hai!`,
                type: 'editreply'
            }, interaction);

            if (colour == "b" || colour.includes("nero")) colour = 0;
            else if (colour == "r" || colour.includes("rosso")) colour = 1;
            else if (colour == "g" || colour.includes("verde")) colour = 2;
            else return client.errNormal({error: `colore non corretto specificato!`, type: 'editreply'}, interaction);

            if (random == 0 && colour == 2) { // Verde
                money *= 15

                data.Money += money;
                data.save();

                client.embed({
                    title: `🎰・Moltiplicatore: 15x`,
                    desc: `Hai vinto **${client.emotes.economy.coins} $${money}**`,
                    type: 'editreply'
                }, interaction);
            } else if (isOdd(random) && colour == 1) { // Rosso
                money = parseInt(money * 1.5)
                data.Money += money;
                data.save();

                client.embed({
                    title: `🎰・Moltiplicatore: 1.5x`,
                    desc: `Hai vinto **${client.emotes.economy.coins} $${money}**`,
                    type: 'editreply'
                }, interaction);
            } else if (!isOdd(random) && colour == 0) { // Nero
                money = parseInt(money * 2)
                data.Money += money;
                data.save();

                client.embed({
                    title: `🎰・Moltiplicatore: 2x`,
                    desc: `Hai vinto **${client.emotes.economy.coins} $${money}**`,
                    type: 'editreply'
                }, interaction);
            } else { // Sbagliato
                data.Money -= money;
                data.save();

                client.embed({
                    title: `🎰・Moltiplicatore: 0x`,
                    desc: `Hai perso **${client.emotes.economy.coins} $${money}**`,
                    type: 'editreply'
                }, interaction);
            }

        } else {
            client.errNormal({error: `non hai ${client.emotes.economy.coins}!`, type: 'editreply'}, interaction);
        }
    })
}