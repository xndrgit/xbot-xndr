const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverstats')
        .setDescription('Gestisci le statistiche del server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Statistiche help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('boosts')
                .setDescription('Tieni traccia del numero di boost')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('tier')
                .setDescription('Mostra graduatoria del numero di boost')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('channels')
                .setDescription('Tieni traccia del numero di canali')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stage-channels')
                .setDescription('Tieni traccia del numero di canali stage')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('text-channels')
                .setDescription('Tieni traccia del numero di canali di testo')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('voice-channels')
                .setDescription('Tieni traccia del numero di canali vocali')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('news-channels')
                .setDescription('Tieni traccia del numero di canali delle notizie')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('members')
                .setDescription('Tieni traccia del numero di membri')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bots')
                .setDescription('Tieni traccia del numero di bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roles')
                .setDescription('Tieni traccia del numero di ruoli')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('emoji')
                .setDescription('Tieni traccia del numero di emoji')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('static-emoji')
                .setDescription('Tieni traccia del numero di emoji statiche')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('animated-emoji')
                .setDescription('Tieni traccia del numero di emoji animate')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('time')
                .setDescription('Tieni traccia del tuo fuso orario corrente')
                .addStringOption(option =>
                    option.setName('timezone')
                        .setDescription('Il fuso orario che desideri impostare (es. Europe/Amsterdam)')
                        .setRequired(true)
                )
        ),

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({fetchReply: true});
        const perms = await client.checkPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageChannels],
            perms: [Discord.PermissionsBitField.Flags.ManageChannels]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};