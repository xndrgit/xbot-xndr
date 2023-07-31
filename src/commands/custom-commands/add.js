const Schema = require("../../database/models/customCommandAdvanced");

module.exports = async (client, interaction, args) => {
    const cmdname = interaction.options.getString('command');
    const cmdresponce = interaction.options.getString('text');

    Schema.findOne({Guild: interaction.guild.id, Name: cmdname.toLowerCase()}, async (err, data) => {
        if (data) {
            client.errNormal({
                error: "questo nome del comando è già stato aggiunto nei comandi personalizzati del server!",
                type: 'editreply'
            }, interaction);
        } else {
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('customSelect')
                        .setPlaceholder('❌┆Nessuna opzione selezionata')
                        .addOptions(
                            [
                                {
                                    label: `Embed`,
                                    description: `Invia un messaggio in un embed`,
                                    value: "command-embed",
                                },
                                {
                                    label: `Normale`,
                                    description: `Invia un messaggio normalmente`,
                                    value: "command-normal",
                                },
                                {
                                    label: `Privato`,
                                    description: `Invia il messaggio in DM`,
                                    value: "command-dm",
                                },
                            ]
                        )
                );

            client.embed({
                desc: `A quale azione dovrebbe essere associato questo comando?`,
                components: [row],
                type: 'editreply'
            }, interaction)

            const filter = i => i.user.id === interaction.user.id;

            interaction.channel.awaitMessageComponent({filter, max: 1}).then(async i => {
                if (i.customId == 'customSelect') {
                    await i.deferUpdate();
                    if (i.values[0] === "command-embed") {
                        new Schema({
                            Guild: interaction.guild.id,
                            Name: cmdname.toLowerCase(),
                            Responce: cmdresponce,
                            Action: "Embed"
                        }).save();

                        client.succNormal({
                            text: `Il comando è stato aggiunto con successo`,
                            fields: [{
                                name: "🔧┆Comando",
                                value: `\`\`\`${cmdname.toLowerCase()}\`\`\``,
                                inline: true,
                            }],
                            components: [],
                            type: 'editreply'
                        }, i);
                    }

                    if (i.values[0] === "command-normal") {
                        new Schema({
                            Guild: interaction.guild.id,
                            Name: cmdname.toLowerCase(),
                            Responce: cmdresponce,
                            Action: "Normale"
                        }).save();

                        client.succNormal({
                            text: `Il comando è stato aggiunto con successo`,
                            fields: [{
                                name: "🔧┆Comando",
                                value: `\`\`\`${cmdname.toLowerCase()}\`\`\``,
                                inline: true,
                            }],
                            components: [],
                            type: 'editreply'
                        }, i);
                    }

                    if (i.values[0] === "command-dm") {
                        new Schema({
                            Guild: interaction.guild.id,
                            Name: cmdname.toLowerCase(),
                            Responce: cmdresponce,
                            Action: "DM"
                        }).save();

                        client.succNormal({
                            text: `Il comando è stato aggiunto con successo`,
                            fields: [{
                                name: "🔧┆Comando",
                                value: `\`\`\`${cmdname.toLowerCase()}\`\`\``,
                                inline: true,
                            }],
                            components: [],
                            type: 'editreply'
                        }, i);
                    }

                    await interaction.guild.commands.create({
                        name: cmdname,
                        description: 'Comando personalizzato del server'
                    });
                }
            })
        }
    })

}