const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-helppanel") {
            if (interaction.values == "changelogs-Bothelp") {
                interaction.deferUpdate();

                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            // toTranslate help panel
                            .setCustomId('Bot-helppanel')
                            .setPlaceholder('❌┆Seleziona')
                            .addOptions([
                                {
                                    label: `Comandi`,
                                    description: `Visualizza i miei comandi!`,
                                    emoji: "💻",
                                    value: "commands-Bothelp",
                                },
                                {
                                    label: `Invita`,
                                    description: `Invitami nel tuo server`,
                                    emoji: "📨",
                                    value: "invite-Bothelp",
                                },
                                {
                                    label: `Supporta il server`,
                                    description: `～(へ^^)へ Welc!`,
                                    emoji: "❓",
                                    value: "support-Bothelp",
                                },
                                {
                                    label: `Aggiornamenti`,
                                    description: `Mostra aggiornamenti`,
                                    emoji: "📃",
                                    value: "changelogs-Bothelp",
                                },
                            ]),
                    );

                client.embed({
                    title: "📃・Aggiornamenti",
                    desc: `_____`,
                    thumbnail: client.user.avatarURL({size: 1024}),
                    fields: [
                        {
                            name: "📢┆Attenzione!",
                            value: 'Questo è il changelog, dove si possono vedere le ultime modifiche apportate',
                            inline: false,
                        },
                        {
                            name: "📃┆Aggiornamenti",
                            value: '23/07/2023 - Aggiornato all\'ultima versione di discord.js (v14)',
                            inline: false,
                        }
                    ],
                    components: [row],
                    type: 'edit'
                }, interaction.message)
            }
        }
    }).setMaxListeners(0);
}

 