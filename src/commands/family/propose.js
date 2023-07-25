const Discord = require('discord.js');

const Schema = require("../../database/models/family");

module.exports = async (client, interaction, args) => {

    const target = interaction.options.getUser('user');
    const author = interaction.user;
    const guild = {Guild: interaction.guild.id};

    if (author.id == target.id) return client.errNormal({
        error: "e come fai a sposare te stess*?",
        type: 'editreply'
    }, interaction);

    Schema.findOne({Guild: interaction.guild.id, Partner: author.id}, async (err, data) => {
        if (data) {
            client.errNormal({error: "qui qualcuno è già sposato!", type: 'editreply'}, interaction);
        } else {
            Schema.findOne({Guild: interaction.guild.id, Partner: target.id}, async (err, data) => {
                if (data) {
                    client.errNormal({
                        error: "qui qualcuno è gia sposato!",
                        type: 'editreply'
                    }, interaction);
                } else {
                    Schema.findOne({
                        Guild: interaction.guild.id,
                        User: target.id,
                        Parent: author.id
                    }, async (err, data) => {
                        if (data) {
                            client.errNormal({
                                error: "incesto negato",
                                type: 'editreply'
                            }, interaction);
                        } else {
                            Schema.findOne({
                                Guild: interaction.guild.id,
                                User: author.id,
                                Parent: target.id
                            }, async (err, data) => {
                                if (data) {
                                    client.errNormal({
                                        error: "incesto negato",
                                        type: 'editreply'
                                    }, interaction);
                                } else {
                                    Schema.findOne({
                                        Guild: interaction.guild.id,
                                        User: author.id
                                    }, async (err, data) => {
                                        if (data) {
                                            if (data.Children.includes(target.id)) {
                                                client.errNormal({
                                                    error: "incesto negato",
                                                    type: 'editreply'
                                                }, interaction);
                                            } else {
                                                propose();
                                            }
                                        } else {
                                            propose();
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    function propose() {
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('propose_accept')
                    .setEmoji('🤍')
                    .setStyle(Discord.ButtonStyle.Success),

                new Discord.ButtonBuilder()
                    .setCustomId('propose_deny')
                    .setEmoji('🪦')
                    .setStyle(Discord.ButtonStyle.Danger),
            );

        client.embed({
            title: `👰・Richiesta di matrimonio`,
            desc: `${author} ha chiesto a ${target} di sposarl* \n${target} vuoi sposarl*?`,
            components: [row],
            content: `${target}`,
            type: 'editreply'
        }, interaction);

        const filter = i => i.user.id === target.id;

        interaction.channel.awaitMessageComponent({
            filter,
            componentType: Discord.ComponentType.Button,
            time: 60000
        }).then(async i => {
            if (i.customId == "propose_accept") {

                Schema.findOne({Guild: interaction.guild.id, User: author.id}, async (err, data) => {
                    if (data) {
                        data.Partner = target.id
                        data.save();
                    } else {
                        new Schema({
                            Guild: interaction.guild.id,
                            User: author.id,
                            Partner: target.id
                        }).save();
                    }
                })

                Schema.findOne({Guild: interaction.guild.id, User: target.id}, async (err, data) => {
                    if (data) {
                        data.Partner = author.id
                        data.save();
                    } else {
                        new Schema({
                            Guild: interaction.guild.id,
                            User: target.id,
                            Partner: author.id
                        }).save();
                    }
                })

                client.embed({
                    title: `👰・Richiesta matrimonio - Accettata`,
                    desc: `${author} e ${target} si sono sposati! 👰🎉`,
                    components: [],
                    content: `${target}`,
                    type: 'editreply'
                }, interaction);
            }

            if (i.customId == "propose_deny") {
                client.embed({
                    title: `👰・Richiesta matrimonio - Rifiutata`,
                    desc: `${target} ama qualcun altro, sei stato rifiutato ${author}`,
                    components: [],
                    content: `${target}`,
                    type: 'editreply'
                }, interaction);
            }
        }).catch(() => {
            client.embed({
                title: `👰・Richiesta matrimonio - Rifiutata`,
                desc: `${target} non risponde, probabilmente ama qualcun altro`,
                components: [],
                content: `${target}`,
                type: 'editreply'
            }, interaction);
        });
    }
}

 