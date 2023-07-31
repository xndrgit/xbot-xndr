const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('custom-commands')
        .setDescription('Crea alcuni comandi personalizzati')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Custom help'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Crea un comando personalizzato')
                .addStringOption(option => option.setName('command').setDescription('Il nome del comando').setRequired(true))
                .addStringOption(option => option.setName('text').setDescription('La risposta del comando').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Elimina un comando personalizzato')
                .addStringOption(option => option.setName('command').setDescription('Il nome del comando').setRequired(true)),
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