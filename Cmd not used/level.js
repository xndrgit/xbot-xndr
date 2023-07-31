const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');
const Schema = require("../src/database/models/functions");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('levels')
        .setDescription('Visualizza il sistema di livelli')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('❓')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setlevel')
                .setDescription('Imposta un nuovo livello per un utente')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                .addNumberOption(option => option.setName('level').setDescription('Inserisci un nuovo livello').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deletereward')
                .setDescription('Elimina una ricompensa di livello')
                .addNumberOption(option => option.setName('level').setDescription('Inserisci un livello').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('createreward')
                .setDescription('Crea una ricompensa di livello')
                .addNumberOption(option => option.setName('level').setDescription('Inserisci un livello').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('Il ruolo per questa ricompensa').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setxp')
                .setDescription('Imposta una nuova esperienza per un utente')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci una quantità di esperienza').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rank')
                .setDescription('Visualizza il tuo attuale livello')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rewards')
                .setDescription('Mostra tutte le ricompense di livello')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('Visualizza la classifica dei livelli')
        )
    ,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const guild = await Schema.findOne({Guild: interaction.guild.id});
        if (!guild.Levels) return client.errNormal({
            error: `Il sistema di livelli è disabilitato!`,
            type: 'ephemeral'
        }, interaction);

        await interaction.deferReply({fetchReply: true});
        client.loadSubcommands(client, interaction, args);
    },
};
