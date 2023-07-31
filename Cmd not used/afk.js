const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../src/database/models/music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Imposta stato AFK')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('AFK help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Mettiti in AFK')
                .addStringOption(option => option.setName('reason').setDescription('Motivo stato AFK'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Mostra tutti gli utenti AFK')
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