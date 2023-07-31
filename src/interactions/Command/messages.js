const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('messages')
        .setDescription('Visualizza il sistema di messaggi')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Messaggi help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Aggiungi messaggi a un utente')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci una quantità di messaggi').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deletereward')
                .setDescription('Cancella un premio per i messaggi')
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci una quantità di messaggi').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('createreward')
                .setDescription('Crea un premio per i messaggi')
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci una quantità di messaggi').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('Il ruolo per questo premio').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Rimuovi messaggi da un utente')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci una quantità di messaggi').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('show')
                .setDescription('Visualizza i tuoi messaggi')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rewards')
                .setDescription('Mostra tutti i premi per i messaggi')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('Visualizza la classifica dei messaggi')
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
