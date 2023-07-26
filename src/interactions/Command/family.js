const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('family')
        .setDescription('Crea una famiglia')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('❓')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('adopt')
                .setDescription('Adotta')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Elimina'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('disown')
                .setDescription('Rinnega')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un uente').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('divorce')
                .setDescription('Divorzia')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un uente').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('family')
                .setDescription(`Visualizza`)
                .addUserOption(option => option.setName('user').setDescription('Seleziona un uente').setRequired(false)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('propose')
                .setDescription('Sposa')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un uente').setRequired(true)),
        ),

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

 