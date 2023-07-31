const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthdays')
        .setDescription('Visualizza/registra compleanno')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Compleanni help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Visualizza compleanno')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Rimuovi compleanno')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Visualizza compleanni')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Inserisci compleanno')
                .addNumberOption(option => option.setName('day').setDescription('Il giorno del tuo compleanno').setRequired(true))
                .addNumberOption(option => option.setName('month').setDescription('Il mese del tuo compleanno').setRequired(true))
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

 