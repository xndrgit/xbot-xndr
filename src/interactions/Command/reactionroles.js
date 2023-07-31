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
                .setDescription('Ruoli reazione help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Aggiungi un ruolo reazione')
                .addStringOption(option => option.setName('category').setDescription('Categoria nuova/esistente per i ruoli').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('Seleziona un ruolo').setRequired(true))
                .addStringOption(option => option.setName('emoji').setDescription('Inserisci un emoji per il ruolo').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Elimina una categoria per i ruoli reazione')
                .addStringOption(option => option.setName('category').setDescription('Nome della categoria da eliminare').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Mostra tutte le categorie per i ruoli')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('button')
                .setDescription('Mostra tutti i ruoli reazione con bottoni')
                .addStringOption(option => option.setName('category').setDescription('Categoria dei ruoli reazione').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Canale in cui appariranno i ruoli reazione').addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('menu')
                .setDescription('Mostra tutti i ruoli reazione in un menu')
                .addStringOption(option => option.setName('category').setDescription('Nome della categoria per i ruoli reazione').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Canale in cui appariranno i ruoli reazione').addChannelTypes(ChannelType.GuildText))
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