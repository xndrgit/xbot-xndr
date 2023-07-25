const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-helppanel") {
            if (interaction.values == "support-Bothelp") {
                interaction.deferUpdate();

                const row2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            // toTranslate help panel
                            .setCustomId('Bot-helppanel')
                            .setPlaceholder('❌┆Seleziona')
                            .addOptions([
                                {
                                    label: `Comandi`,
                                    description: `Visualizza i comandi di ${client.user.username}!`,
                                    emoji: "💻",
                                    value: "commands-Bothelp",
                                },
                                {
                                    label: `Invita`,
                                    description: `Invita ${client.user.username} nel tuo server`,
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
                                    description: `Mostra gli aggiornamenti di ${client.user.username}`,
                                    emoji: "📃",
                                    value: "changelogs-Bothelp",
                                },
                            ]),
                    );

                let row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Supporta il server")
                            .setURL(client.config.discord.serverInvite)
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                client.embed({
                    title: `❓・Supporta`,
                    desc: `～(へ^^)へ Welc!`,
                    image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474668052/Bot_banner_invite.jpg",
                    url: client.config.discord.serverInvite,
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message)
            }
        }
    }).setMaxListeners(0);
}

 