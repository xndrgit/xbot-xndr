const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const {ChannelType} = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Organizza un giveaway nel tuo server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('❓')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('start')
                .setDescription('Avvia giveaway')
                .addChannelOption(option => option.setName('channel').setDescription('Il canale in cui deve essere creato il giveaway').setRequired(true).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement))
                .addStringOption(option => option.setName('duration').setDescription('Durata del giveaway').setRequired(true))
                .addNumberOption(option => option.setName('winners').setDescription('Il numero di vincitori del giveaway').setRequired(true))
                .addStringOption(option => option.setName('prize').setDescription('Il premio del giveaway').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('drop')
                .setDescription('Avvia un giveaway di tipo drop')
                .addChannelOption(option => option.setName('channel').setDescription('Il canale in cui deve essere creato il giveaway').setRequired(true).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement))
                .addStringOption(option => option.setName('duration').setDescription('Durata del giveaway').setRequired(true))
                .addNumberOption(option => option.setName('winners').setDescription('Il numero di vincitori del giveaway').setRequired(true))
                .addStringOption(option => option.setName('prize').setDescription('Il premio del giveaway').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('reroll')
                .setDescription('Ritira un giveaway')
                .addStringOption(option => option.setName('message').setDescription('ID messaggio giveaway').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('end')
                .setDescription('Termina un giveaway')
                .addStringOption(option => option.setName('message').setDescription('ID messaggio giveaway').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Modifica la durata di un giveaway')
                .addStringOption(option => option.setName('message').setDescription('ID messaggio giveaway').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Elimina un giveaway')
                .addStringOption(option => option.setName('message').setDescription('ID messaggio giveaway').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pause')
                .setDescription('Giveaway in pausa')
                .addStringOption(option => option.setName('message').setDescription('ID messaggio giveaway').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unpause')
                .setDescription('Giveaway non più in pausa')
                .addStringOption(option => option.setName('message').setDescription('ID messaggio giveaway').setRequired(true)),
        ),

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({fetchReply: true});
        const perms = await client.checkUserPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

