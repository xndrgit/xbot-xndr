const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guild')
        .setDescription('Gestisci il server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Ottieni informazioni sui comandi del server')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('channelinfo')
                .setDescription('Ottieni informazioni su un canale')
                .addChannelOption(option => option.setName('channel').setDescription('Seleziona un canale').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('members')
                .setDescription('Vedi quanti membri ci sono in questo server')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('oldestmember')
                .setDescription('Ottieni la data di creazione dell\'account più vecchio nel server')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roleinfo')
                .setDescription('Ottieni informazioni su un ruolo')
                .addRoleOption(option => option.setName('role').setDescription('Seleziona un ruolo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Ottieni tutte le informazioni sul server attuale')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stealemoji')
                .setDescription('Rubare un emoji')
                .addStringOption(option => option.setName('emoji').setDescription('Inserisci un emoji da rubare').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('Seleziona un ruolo').setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('youngestmember')
                .setDescription('Ottieni la data di creazione dell\'account più recente nel server')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('userinfo')
                .setDescription('Ottieni tutte le informazioni su un utente')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
        )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('inviteinfo')
        //         .setDescription('Ottieni tutte le informazioni su un invito')
        //         .addStringOption(option => option.setName('invite').setDescription('Inserisci un codice invito').setRequired(true))
        // )
        .addSubcommand(subcommand =>
            subcommand
                .setName('emojis')
                .setDescription('Vedi le emoji nel server')
        )
    ,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({fetchReply: true});
        client.loadSubcommands(client, interaction, args);
    },
};