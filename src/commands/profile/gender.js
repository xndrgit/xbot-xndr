const Schema = require('../../database/models/profile');
const Discord = require('discord.js');

module.exports = async (client, interaction) => {

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {
            const menu = new Discord.StringSelectMenuBuilder()
                .setCustomId('gender-setup')
                .setPlaceholder('❌┆Nessuna selezione')
                .addOptions(
                    {
                        emoji: "👨",
                        label: `Maschio`,
                        value: `Male`,
                    },
                    {
                        emoji: "👩",
                        label: `Femmina`,
                        value: `Female`,
                    },
                    {
                        emoji: "👪",
                        label: `Altro`,
                        value: `Other`,
                    }
                );

            const row = new Discord.ActionRowBuilder()
                .addComponents(menu)

            client.embed({
                desc: `Seleziona un genere`,
                type: 'editreply',
                components: [row],
            }, interaction).then(msg => {
                console.log(msg);
                const filter = i => i.user.id === interaction.user.id;

                interaction.channel.awaitMessageComponent({
                    filter,
                    max: 1,
                    componentType: Discord.ComponentType.StringSelect
                }).then(i => {
                    if (i.customId === 'gender-setup') {
                        data.Gender = i.values[0];
                        data.save();

                        client.succNormal({
                            text: "Hai settato il tuo genere su " + i.values[0],
                            type: 'editreply',
                            components: [],
                        }, interaction);
                    }
                })
            })
        } else {
            return client.errNormal({
                error: "nessun profilo trovato! apri un profilo con il comando createprofile",
                type: 'editreply'
            }, interaction);
        }
    })
}