const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools')
        .setDescription('Usa alcuni strumenti interessanti')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('❓')
        )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('anagram')
        //         .setDescription('[Use english!] Forma una parola con determinate lettere')
        //         .addStringOption(option => option.setName('word').setDescription('[Use english!] La parola che vuoi formare').setRequired(true))
        // )
        .addSubcommand(subcommand =>
            subcommand
                .setName('button')
                .setDescription('Crea un pulsante')
                .addStringOption(option => option.setName('url').setDescription('L\'URL per il pulsante').setRequired(true))
                .addStringOption(option => option.setName('text').setDescription('Il testo per il pulsante').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('calculator')
                .setDescription('Calcola una somma')
        )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('decode')
        //         .setDescription('Decodifica un codice binario in testo')
        //         .addStringOption(option => option.setName('code').setDescription('Il codice binario che vuoi decodificare').setRequired(true))
        // )
        .addSubcommand(subcommand =>
            subcommand
                .setName('emojify')
                .setDescription('Converti il testo in emoji')
                .addStringOption(option => option.setName('text').setDescription('Il testo che vuoi convertire').setRequired(true))
        )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('encode')
        //         .setDescription('Codifica il testo in codice binario')
        //         .addStringOption(option => option.setName('text').setDescription('Il testo che vuoi codificare').setRequired(true))
        // )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('enlarge')
        //         .setDescription('Ingrandisci un\'emoji')
        //         .addStringOption(option => option.setName('emoji').setDescription('L\'emoji che vuoi ingrandire').setRequired(true))
        // )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('mcskin')
        //         .setDescription('Visualizza la skin di un utente di Minecraft')
        //         .addStringOption(option => option.setName('name').setDescription('Il nome utente del giocatore').setRequired(true))
        // )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('mcstatus')
        //         .setDescription('Visualizza lo stato di un server di Minecraft')
        //         .addStringOption(option => option.setName('ip').setDescription('L\'indirizzo IP del server di MC').setRequired(true))
        // )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pwdgen')
                .setDescription('Genera una password')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('qrcode')
                .setDescription('Genera un QR Code')
                .addStringOption(option => option.setName('text').setDescription('Il testo che vuoi convertire').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remind')
                .setDescription('Imposta un promemoria')
                // .addStringOption(option => option.setName('time').setDescription('L\'ora per il tuo promemoria').setRequired(true))
                .addStringOption(option => option.setName('message').setDescription('Il messaggio per il tuo promemoria').setRequired(true))
        )
    // .addSubcommand(subcommand =>
    //     subcommand
    //         .setName('sourcebin')
    //         .setDescription('Carica il codice su Source Bin')
    //         .addStringOption(option => option.setName('language').setDescription('Il linguaggio del tuo codice').setRequired(true))
    //         .addStringOption(option => option.setName('code').setDescription('Il tuo codice').setRequired(true))
    // )
    // .addSubcommand(subcommand =>
    //     subcommand
    //         .setName('url')
    //         .setDescription('Crea un URL abbreviato')
    //         .addStringOption(option => option.setName('site').setDescription('Il link al sito web').setRequired(true))
    //         .addStringOption(option => option.setName('code').setDescription('Il codice per l\'URL').setRequired(true))
    // )
    // .addSubcommand(subcommand =>
    //     subcommand
    //         .setName('review')
    //         .setDescription('Scrivi una recensione')
    //         .addNumberOption(option => option.setName('stars').setDescription('Il numero di stelle (max 5)').setRequired(true))
    //         .addStringOption(option => option.setName('message').setDescription('Una breve descrizione con la recensione'))
    // )
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