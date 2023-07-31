const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const {ChannelType} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stickymessages')
        .setDescription('Gestisce i messaggi appiccicosi')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Ottieni informazioni sui comandi della categoria dei messaggi appiccicosi')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stick')
                .setDescription('Appiccica un messaggio in un canale')
                .addChannelOption(option => option.setName('channel').setDescription('Seleziona un canale').setRequired(true).addChannelTypes(ChannelType.GuildText))
                .addStringOption(option => option.setName('message').setDescription('Il tuo messaggio appiccicoso').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('messages')
                .setDescription('Mostra tutti i messaggi appiccicosi del tuo server')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unstick')
                .setDescription('Rimuovi un messaggio appiccicoso da un canale')
                .addChannelOption(option => option.setName('channel').setDescription('Seleziona un canale').setRequired(true).addChannelTypes(ChannelType.GuildText))
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
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};
