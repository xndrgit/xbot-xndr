const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthdays')
        .setDescription('Visualizza o registra un compleanno')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('❓')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Visualizza il tuo compleanno')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Rimuovi il tuo compleanno')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Visualizza tutti i compleanni')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Inserisci il tuo compleanno')
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

 