const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
// const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Chiedimi aiuto'),

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        console.log(args);
        await interaction.deferReply({fetchReply: true});
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    // toTranslate panel help
                    .setCustomId('Bot-helppanel')
                    .setPlaceholder('❌┆Seleziona')
                    .addOptions([
                        {
                            label: `Comandi`,
                            description: `Visualizza i miei comandi`,
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

        return client.embed({
            // toTranslate aiuto
            title: `❓・Pannello`,
            desc: `Benvenuti nel pannello! Ti offro una piccola panoramica, per aiutarti!\nScegli nel menu sottostante`,
            image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474668052/Bot_banner_invite.jpg",
            fields: [
                {
                    name: `❌┆Non funziono?`,
                    value: `[Segnala il bug 🪲](https://github.com/XndrWilde/Xndr_Ghost/issues)`
                },
                {
                    name: `🔗┆Links`,
                    value: `[Invitami](${client.config.discord.botInvite}) | [Git](https://github.com/XndrWilde)`
                    // value: `[Website](https://corwindev.nl/) | [Invitami](${client.config.discord.botInvite}) | [Vote](https://top.gg/bot/798144456528363550/vote)`
                },
            ],
            components: [row],
            type: 'editreply'
        }, interaction)
    },
};

 