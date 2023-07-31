const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('notepad')
        .setDescription('Gestisci le tue note')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Note help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Scrivi nota')
                .addStringOption(option => option.setName('note').setDescription('Your note').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Rimuovi nota')
                .addStringOption(option => option.setName('id').setDescription('Note id').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Modifica nota')
                .addStringOption(option => option.setName('id').setDescription('Note id').setRequired(true))
                .addStringOption(option => option.setName('note').setDescription('New note').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('notes')
                .setDescription('Visualizza note')
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

 