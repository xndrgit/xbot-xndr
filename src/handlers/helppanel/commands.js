const Discord = require('discord.js');

module.exports = async (client) => {
    const fields = [
        {
            name: `📺┆Attività`,
            value: `\`/activities\``,
            inline: true
        },
        // {
        //     name: `🚫┆AFK`,
        //     value: `\`/afk help\``,
        //     inline: true
        // },
        {
            name: `📣┆Annunci`,
            value: `\`/announcement help\``,
            inline: true
        },
        // {
        //     name: `👮‍♂️┆Auto mod`,
        //     value: `\`/automod help\``,
        //     inline: true
        // },
        // {
        //     name: `⚙️┆Auto setup`,
        //     value: `\`/autosetup help\``,
        //     inline: true
        // },
        {
            name: `🎂┆Compleanni`,
            value: `\`/birthdays help\``,
            inline: true
        },
        // {
        //     name: `🤖┆Bot`,
        //     value: `\`/bot help\``,
        //     inline: true
        // },
        // {
        //     name: `🎰┆Casino`,
        //     value: `\`/casino help\``,
        //     inline: true
        // },
        // {
        //     name: `⚙┆Configuration`,
        //     value: `\`/config help\``,
        //     inline: true
        // },
        // {
        //     name: `💻┆Custom commands`,
        //     value: `\`/custom-commands help\``,
        //     inline: true
        // },
        // {
        //     name: `💳┆Dcredits`,
        //     value: `\`/dcredits help\``,
        //     inline: true
        // },
        // {
        //     name: `💰┆Economy`,
        //     value: `\`/economy help\``,
        //     inline: true
        // },
        {
            name: `👪┆Famiglia`,
            value: `\`/family help\``,
            inline: true
        },
        {
            name: `😂┆Svago`,
            value: `\`/fun help\``,
            inline: true
        },
        {
            name: `🎮┆Giochi`,
            value: `\`/games help\``,
            inline: true
        },
        // {
        //     name: `🥳┆Giveaway`,
        //     value: `\`/giveaway help\``,
        //     inline: true
        // },
        // {
        //     name: `⚙️┆Guild settings`,
        //     value: `\`/guild help\``,
        //     inline: true
        // },
        {
            name: `🖼┆Immagini`,
            value: `\`/images help\``,
            inline: true
        },
        {
            name: `📨┆Invita`,
            value: `\`/invite\``,
            inline: true
        },
        {
            name: `📨┆Inviti`,
            value: `\`/invites help\``,
            inline: true
        },
        // {
        //     name: `🆙┆Leveling`,
        //     value: `\`/levels help\``,
        //     inline: true
        // },
        {
            name: `💬┆Messagi`,
            value: `\`/messages help\``,
            inline: true
        },
        // {
        //     name: `👔┆Moderation`,
        //     value: `\`/moderation help\``,
        //     inline: true
        // },
        // {
        //     name: `🎶┆Music`,
        //     value: `\`/music help\``,
        //     inline: true
        // },
        {
            name: `📓┆Note`,
            value: `\`/notepad help\``,
            inline: true
        },
        {
            name: `👤┆Profilo`,
            value: `\`/profile help\``,
            inline: true
        },
        // {
        //     name: `📻┆Radio`,
        //     value: `\`/radio help\``,
        //     inline: true
        // },
        // {
        //     name: `😛┆Reaction roles`,
        //     value: `\`/reactionroles help\``,
        //     inline: true
        // },
        {
            name: `🔍┆Cerca`,
            value: `\`/search help\``,
            inline: true
        },
        {
            name: `📊┆Statistiche server`,
            value: `\`/serverstats help\``,
            inline: true
        },
        // {
        //     name: `⚙️┆Setup`,
        //     value: `\`/setup help\``,
        //     inline: true
        // },
        {
            name: `🎛┆Soundboard`,
            value: `\`/soundboard help\``,
            inline: true
        },
        // {
        //     name: `🗨️┆Sticky messages`,
        //     value: `\`/stickymessages help\``,
        //     inline: true
        // },
        {
            name: `💡┆Suggerimenti`,
            value: `\`/sugestions help\``,
            inline: true
        },
        {
            name: `🤝┆Ringraziamenti`,
            value: `\`/thanks help\``,
            inline: true
        },
        // {
        //     name: `🎫┆Tickets`,
        //     value: `\`/tickets help\``,
        //     inline: true
        // },
        {
            name: `⚒️┆Utile`,
            value: `\`/tools help\``,
            inline: true
        },
        {
            name: `🔊┆Vocali`,
            value: `\`/voice help\``,
            inline: true
        },
    ];

    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-helppanel") {
            if (interaction.values == "commands-Bothelp") {
                interaction.deferUpdate();
                let page = 1;

                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('helpPrev')
                            .setEmoji('⬅️')
                            .setStyle(Discord.ButtonStyle.Secondary),

                        new Discord.ButtonBuilder()
                            .setCustomId('helpNext')
                            .setEmoji('➡️')
                            .setStyle(Discord.ButtonStyle.Secondary),

                        new Discord.ButtonBuilder()
                            .setLabel("Invita")
                            .setURL(client.config.discord.botInvite)
                            .setStyle(Discord.ButtonStyle.Link),

                        new Discord.ButtonBuilder()
                            .setLabel("Supporta il server")
                            .setURL(client.config.discord.serverInvite)
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                const row2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
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
                    title: `❓・Pannello`,
                    desc: `Visualizza tutte le categorie \n\n[Git](https://github.com/XndrWilde) | [Invitami](${client.config.discord.botInvite})`,
                    image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474668052/Bot_banner_invite.jpg",
                    fields: fields.slice(0, 24),
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message).then(msg => {
                    const filter = i => i.user.id === interaction.user.id;

                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 100000 });

                    collector.on('collect', async i => {
                        if (i.customId == "helpNext") {
                            if (page == 1) {
                                client.embed({
                                    title: `❓・Pannello`,
                                    desc: `Visualizza tutte le categorie \n\n[Git](https://github.com/XndrWilde) | [Invitami](${client.config.discord.botInvite})`,
                                    fields: fields.slice(25, 49),
                                    components: [row2, row],
                                    type: 'update'
                                }, i)
                                page += 1;
                            }
                        } else if (i.customId == "helpPrev") {
                            if (page == 2) {
                                client.embed({
                                    title: `❓・Pannello`,
                                    desc: `Visualizza tutte le categorie \n\n[Git](https://github.com/XndrWilde) | [Invitami](${client.config.discord.botInvite})`,
                                    fields: fields.slice(0, 24),
                                    components: [row2, row],
                                    type: 'update'
                                }, i)
                                page -= 1;
                            }
                        }
                    });
                })
            }
        }
    }).setMaxListeners(0);
}

 