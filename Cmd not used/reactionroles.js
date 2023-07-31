const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const {ChannelType} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionroles')
        .setDescription('Gestisci i ruoli di reazione del server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('❓')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Aggiungi un ruolo di reazione')
                .addStringOption(option => option.setName('category').setDescription('Nome della categoria per il gruppo dei ruoli di reazione').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('Seleziona un ruolo').setRequired(true))
                .addStringOption(option => option.setName('emoji').setDescription('Inserisci un emoji').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Elimina una categoria di ruoli di reazione')
                .addStringOption(option => option.setName('category').setDescription('Nome della categoria per il gruppo dei ruoli di reazione').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Mostra tutte le categorie di ruoli di reazione di questo server')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('button')
                .setDescription('Mostra tutti i ruoli di reazione con bottoni')
                .addStringOption(option => option.setName('category').setDescription('Nome della categoria per il gruppo dei ruoli di reazione').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Canale in cui appariranno i ruoli di reazione').addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('menu')
                .setDescription('Mostra tutti i ruoli di reazione in un menu')
                .addStringOption(option => option.setName('category').setDescription('Nome della categoria per il gruppo dei ruoli di reazione').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Canale in cui appariranno i ruoli di reazione').addChannelTypes(ChannelType.GuildText))
        )
    ,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({fetchReply: true});
        const perms = await client.checkPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageRoles],
            perms: [Discord.PermissionsBitField.Flags.ManageRoles]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};