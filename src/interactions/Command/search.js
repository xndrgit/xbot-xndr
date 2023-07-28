const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Cerca qualcosa su internet')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('❓')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bing')
                .setDescription('Trova qualcosa su Bing')
                .addStringOption(option => option.setName('name').setDescription('Il nome da cercare').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ddg')
                .setDescription('Trova qualcosa su DuckDuckGo')
                .addStringOption(option => option.setName('name').setDescription('Il nome da cercare').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('google')
                .setDescription('Trova qualcosa su Google')
                .addStringOption(option => option.setName('name').setDescription('Il nome da cercare').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('youtube')
                .setDescription('Trova qualcosa su YouTube')
                .addStringOption(option => option.setName('name').setDescription('Il nome da cercare').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('corona')
                .setDescription('Guarda le statistiche sul coronavirus')
                .addStringOption(option => option.setName('country').setDescription('Inserisci un paese').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('crypto')
                .setDescription('Guarda il valore di una criptovaluta')
                .addStringOption(option => option.setName('coin').setDescription('Inserisci una criptovaluta').setRequired(true))
                .addStringOption(option => option.setName('currency').setDescription('Inserisci una valuta').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('docs')
                .setDescription('Guarda la documentazione di discord.js')
                .addStringOption(option => option.setName('name').setDescription('Il nome da cercare').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('github')
                .setDescription('Ottieni informazioni su un utente di GitHub semplicemente inserendo il loro nome utente')
                .addStringOption(option => option.setName('name').setDescription('Inserisci un nome utente di GitHub').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('hexcolour')
                .setDescription('Ottieni informazioni da un colore')
                .addStringOption(option => option.setName('color').setDescription('Inserisci un colore esadecimale').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('itunes')
                .setDescription('Cerca su iTunes una canzone qualsiasi')
                .addStringOption(option => option.setName('song').setDescription('Inserisci il nome di una canzone').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('npm')
                .setDescription('Ottieni informazioni su un pacchetto NPM')
                .addStringOption(option => option.setName('name').setDescription('Inserisci il nome di un pacchetto').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('steam')
                .setDescription('Ottieni informazioni su un\'applicazione su Steam')
                .addStringOption(option => option.setName('name').setDescription('Inserisci il nome di un\'applicazione su Steam').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('translate')
                .setDescription('Traduci del testo')
                .addStringOption(option => option.setName('language').setDescription('Inserisci una lingua').setRequired(true))
                .addStringOption(option => option.setName('text').setDescription('Inserisci del testo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('weather')
                .setDescription('Visualizza le condizioni meteorologiche attuali')
                .addStringOption(option => option.setName('location').setDescription('Inserisci un luogo').setRequired(true))
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

