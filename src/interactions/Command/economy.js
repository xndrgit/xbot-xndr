const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('economy')
        .setDescription('Gioca al gioco dell\'economia nel tuo server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Economia help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('additem')
                .setDescription('Aggiungi un oggetto ruolo al negozio dell\'economia')
                .addRoleOption(option => option.setName('role').setDescription('Seleziona un ruolo').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci un importo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('addmoney')
                .setDescription('Aggiungi denaro a un utente')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci un importo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('balance')
                .setDescription('Visualizza il tuo bilancio')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('beg')
                .setDescription('Chiedi l\'elemosina per del denaro')
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('buy')
                .setDescription('Acquista oggetti nel negozio del Bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Cancella l\'economia')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('crime')
                .setDescription('Commetti un crimine')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('daily')
                .setDescription('Richiedi il tuo denaro quotidiano')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deleteitem')
                .setDescription('Elimina un oggetto ruolo dal negozio dell\'economia')
                .addRoleOption(option => option.setName('role').setDescription('Seleziona un ruolo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deposit')
                .setDescription('Deposita denaro in banca')
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci un importo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fish')
                .setDescription('Pesca dei pesci')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('hourly')
                .setDescription('Richiedi il tuo denaro orario')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('hunt')
                .setDescription('Caccia degli animali')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('monthly')
                .setDescription('Richiedi il tuo denaro mensile')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pay')
                .setDescription('Paga un utente')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci un importo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('present')
                .setDescription('Ricevi un regalo settimanale')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('removemoney')
                .setDescription('Rimuovi denaro da un utente')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci un importo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rob')
                .setDescription('Rapina un utente')
                .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('store')
                .setDescription('Mostra il negozio di questo server')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('weekly')
                .setDescription('Richiedi il tuo denaro settimanale')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('withdraw')
                .setDescription('Preleva il tuo denaro')
                .addNumberOption(option => option.setName('amount').setDescription('Inserisci un importo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('work')
                .setDescription('Vai a lavorare')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('yearly')
                .setDescription('Richiedi il tuo denaro annuale')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('Visualizza la classifica economica')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Il tipo di classifica che vuoi visualizzare')
                        .setRequired(true)
                        .addChoices(
                            {name: 'Denaro', value: 'money'},
                            {name: 'Banca', value: 'bank'}
                        )
                )
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