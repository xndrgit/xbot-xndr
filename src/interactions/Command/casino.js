const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('casino')
        .setDescription('Gioca al gioco del casinò')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Casino help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('blackjack')
                .setDescription('Gioca a un gioco di blackjack per vincere denaro')
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci un importo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('crash')
                .setDescription('Più rischi, più ricompense')
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci un importo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roulette')
                .setDescription('Gioca alla roulette')
                .addStringOption(option => option.setName('color').setDescription('Inserisci un colore esadecimale').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci un importo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('slots')
                .setDescription('Gioca alle slot machine')
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci un importo').setRequired(true))
        ),

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