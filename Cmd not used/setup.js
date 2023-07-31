const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const {ChannelType} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Gestisci il setup')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('❓')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('tickets')
                .setDescription('Setup dei ticket')
                .addChannelOption(option => option.setName('category').setDescription('Seleziona una categoria in cui i ticket dovrebbero essere inseriti.').setRequired(true).addChannelTypes(ChannelType.GuildCategory))
                .addRoleOption(option => option.setName('role').setDescription('Seleziona il ruolo di supporto.').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Il canale per il pannello dei ticket.').setRequired(true).addChannelTypes(ChannelType.GuildText))
                .addChannelOption(option => option.setName('logs').setDescription('Il canale per i log dei ticket.').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('customvoice')
                .setDescription('Setup dei canali vocali personalizzati')
                .addChannelOption(option => option.setName('category').setDescription('Seleziona una categoria in cui i canali verranno creati').setRequired(true).addChannelTypes(ChannelType.GuildCategory))
                .addStringOption(option => option.setName('channelname').setDescription('Il modello per i nomi dei canali').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('logs')
                .setDescription('Setup dei log del server')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('Il setup che vuoi')
                        .setRequired(true)
                        .addChoices(
                            {name: 'Log server', value: 'serverLogs'},
                            {name: 'Log livelli', value: 'levelLogs'},
                            {name: 'Log boost', value: 'boostLogs'}
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Il canale per i log').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fun')
                .setDescription('Setup dei canali svago del server')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('Il setup che vuoi')
                        .setRequired(true)
                        .addChoices(
                            {name: 'Compleanni', value: 'birthdays'},
                            {name: 'Chatbot', value: 'chatbot'},
                            {name: 'Recensioni', value: 'reviews'},
                            {name: 'Suggerimenti', value: 'suggestions'},
                            {name: 'Starboard', value: 'starboard'}
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Il canale per lo svago').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('games')
                .setDescription('Setup dei canali game del server')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('The setup that you want')
                        .setRequired(true)
                        .addChoices(
                            {name: 'Counting', value: 'counting'},
                            {name: 'Guess the number', value: 'gtn'},
                            {name: 'Guess the word', value: 'gtw'},
                            {name: 'Word snake', value: 'wordsnake'}
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('The channel for the game').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcomechannels')
                .setDescription('Setup the welcome channels')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('The setup that you want')
                        .setRequired(true)
                        .addChoices(
                            {name: 'Welcome channel', value: 'welcomechannel'},
                            {name: 'Leave channnel', value: 'leavechannel'}
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('The channel that you want').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcomerole')
                .setDescription('Setup the welcome role')
                .addRoleOption(option => option.setName('role').setDescription('The role that you want').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticketpanel')
                .setDescription('Setup the ticket panel')
                .addStringOption(option => option.setName('name').setDescription('The name of the ticket panel').setRequired(true))
                .addStringOption(option => option.setName('description').setDescription('The description of the ticket panel').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deletesetup')
                .setDescription('Delete a Bot setup')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('The setup that you want')
                        .setRequired(true)
                        .addChoices(
                            {name: 'Tickets', value: 'tickets'},
                            {name: 'Custom voice', value: 'customvoice'},
                            {name: 'Server logs', value: 'serverlogs'},
                            {name: 'Level logs', value: 'levellogs'},
                            {name: 'Boost logs', value: 'boostlogs'},
                            {name: 'Birthdays', value: 'birthdays'},
                            {name: 'Chatbot', value: 'chatbot'},
                            {name: 'Reviews', value: 'reviews'},
                            {name: 'Suggestions', value: 'suggestions'},
                            {name: 'Counting', value: 'counting'},
                            {name: 'Guess the number', value: 'gtn'},
                            {name: 'Guess the word', value: 'gtw'},
                            {name: 'Welcome channel', value: 'welcomechannel'},
                            {name: 'Leave channel', value: 'leavechannel'},
                            {name: 'Welcome role', value: 'welcomerole'},
                            {name: 'Word snake', value: 'wordsnake'}
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
        const perms = await client.checkUserPerms({
            flags: [Discord.PermissionsBitField.Flags.Administrator],
            perms: [Discord.PermissionsBitField.Flags.Administrator]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

