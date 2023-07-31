const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('Gestisci i canali vocali')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Vocali help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('limit')
                .setDescription('Limita stanza vocale')
                .addNumberOption(option => option.setName('limit').setDescription('Inserisci un limite').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lock')
                .setDescription('Blocca stanza vocale personalizzata')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rename')
                .setDescription('Rinomina stanza vocale personalizzata')
                .addStringOption(option => option.setName('name').setDescription('Nuovo nome vocale').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unlock')
                .setDescription('Sblocca il tuo canale vocale personalizzato')
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