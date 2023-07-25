const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const {ChannelType} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('automod')
        .setDescription('Manage the auto mod')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('❓')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antiinvite')
                .setDescription('attiva/disattiva anti invita')
                .addBooleanOption(option => option.setName('active').setDescription('Select a boolean').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antilinks')
                .setDescription('attiva/disattiva anti links')
                .addBooleanOption(option => option.setName('active').setDescription('Select a boolean').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antispam')
                .setDescription('attiva/disattiva anti spam')
                .addBooleanOption(option => option.setName('active').setDescription('Select a boolean').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('linkschannel')
                .setDescription('Gestisci i link in un canale')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Che vuoi fare con il canale?')
                        .setRequired(true)
                        .addChoices(
                            {name: 'Aggiungi', value: 'add'},
                            {name: 'Rimuovi', value: 'remove'}
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Seleziona un canale').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommandGroup(group =>
            group
                .setName('blacklist')
                .setDescription('Gestisci la blacklist')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('display')
                        .setDescription('Visualizza la blacklist')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('add')
                        .setDescription('Aggiungi una parola nella blacklist')
                        .addStringOption(option => option.setName('word').setDescription('Parola per la blacklist').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('remove')
                        .setDescription('Rimuovi una parola dalla blacklist')
                        .addStringOption(option => option.setName('word').setDescription('Parola per la blacklist').setRequired(true))
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
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

 