const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invites')
        .setDescription('Inviti')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Inviti help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Aggiungi inviti ad un utente')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Numero di inviti').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Rimuovi inviti ad un utente')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Numero di inviti').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('show')
                .setDescription('Mostra inviti')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('Classifica')
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};

 