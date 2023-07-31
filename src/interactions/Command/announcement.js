const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder, ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announcement')
        .setDescription('Gestisci gli annunci')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Annunci help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Crea annuncio')
                .addChannelOption(option => option.setName('channel').setDescription('Seleziona un canale').setRequired(true).addChannelTypes(ChannelType.GuildText).addChannelTypes(ChannelType.GuildNews))
                .addStringOption(option => option.setName('message').setDescription('Il tuo annuncio').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Modifica annuncio')
                .addStringOption(option => option.setName('id').setDescription('ID annuncio da modificare').setRequired(true))
                .addStringOption(option => option.setName('message').setDescription('Modifica annuncio').setRequired(true)),
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const perms = await client.checkUserPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

 