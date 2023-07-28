const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const {ChannelType} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Modifica le impostazioni del bot secondo le tue preferenze')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Ottieni informazioni sui comandi della categoria "config"')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('levels')
                .setDescription('Abilita/disabilita i livelli')
                .addBooleanOption(option => option.setName('boolean').setDescription('Seleziona un valore booleano').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setcolor')
                .setDescription('Imposta un colore personalizzato per le embed')
                .addStringOption(option => option.setName("color").setDescription("Inserisci un colore esadecimale").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setverify')
                .setDescription('Configura il pannello di verifica')
                .addBooleanOption(option => option.setName('enable').setDescription('Seleziona un valore booleano').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Seleziona un canale').setRequired(true).addChannelTypes(ChannelType.GuildText))
                .addRoleOption(option => option.setName('role').setDescription('Seleziona un ruolo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setchannelname')
                .setDescription('Imposta un nome personalizzato per il canale delle statistiche del server')
                .addStringOption(option => option.setName("name").setDescription("Inserisci un nome per il canale o invia HELP per gli argomenti richiesti").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('levelmessage')
                .setDescription('Imposta il messaggio del livello del bot')
                .addStringOption(option => option.setName("message").setDescription("Inserisci un messaggio per i livelli o invia HELP per gli argomenti richiesti").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcomemessage')
                .setDescription('Imposta il messaggio di benvenuto')
                .addStringOption(option => option.setName("message").setDescription("Inserisci un messaggio di benvenuto o invia HELP per gli argomenti richiesti").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leavemessage')
                .setDescription('Imposta il messaggio di addio')
                .addStringOption(option => option.setName("message").setDescription("Inserisci un messaggio di addio o invia HELP per gli argomenti richiesti").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticketmessage')
                .setDescription('Imposta il messaggio per i ticket del bot')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Tipo di messaggio per i ticket')
                        .setRequired(true)
                        .addChoices(
                            {name: 'apri', value: 'open'},
                            {name: 'chiudi in DM', value: 'close'}
                        )
                )
                .addStringOption(option => option.setName("message").setDescription("Inserisci un messaggio per il ticket").setRequired(true))
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
