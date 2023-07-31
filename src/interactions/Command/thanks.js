const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('thanks')
        .setDescription('Ottieni una panoramica del sistema dei ringraziamenti')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Ringraziamenti help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Visualizza i tuoi ringraziamenti')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('thanks')
                .setDescription('Ringrazia un utente')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
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
