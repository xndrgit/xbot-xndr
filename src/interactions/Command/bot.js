const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Informazioni sul bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Bot help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Ottieni informazioni sul bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ping')
                .setDescription('Visualizza il ping del bot in ms')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('changelogs')
                .setDescription('Ottieni i changelog del bot')
        )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('donate')
        //         .setDescription('Ottieni il link per donare al bot')
        // )
        .addSubcommand(subcommand =>
            subcommand
                .setName('links')
                .setDescription('Ottieni un messaggio con tutti i link del bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('owner')
                .setDescription('Ottieni informazioni sul proprietario')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('socials')
                .setDescription('Ottieni i social del bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('support')
                .setDescription('Ottieni un invito al server di supporto')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('uptime')
                .setDescription('Mostra il tempo di attività del bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('vote')
                .setDescription('Verifica se hai votato')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('feedback')
                .setDescription('Invia la tua opinione sugli sviluppatori del bot')
                .addStringOption(option => option.setName("feedback").setDescription("Il tuo feedback").setRequired(true))
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