const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('games')
        .setDescription('Gioca!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Giochi help')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('8ball')
                .setDescription('Sì o no? chiedimelo!')
                .addStringOption(option => option.setName('question').setDescription('La domanda che vuoi fare').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fasttype')
                .setDescription('Impara a digitare più velocemente'),
        )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('music-trivia')
        //         .setDescription('Gioca al trivia musicale')
        //         .addNumberOption(option => option.setName('number').setDescription('Il numero di canzoni').setRequired(true)),
        // )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roll')
                .setDescription('Tira un dado'),
        )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('rps')
        //         .setDescription('Gioca a sasso carta forbice contro il bot')
        //         .addStringOption(option =>
        //             option.setName('option')
        //                 .setDescription('Scegli ciò che vuoi')
        //                 .setRequired(true)
        //                 .addChoices(
        //                     { name: '🪨 Sasso', value: 'rock' },
        //                     { name: '📃 Carta', value: 'paper' },
        //                     { name: '✂️ Forbici', value: 'scissors' }
        //                 )
        //         )
        // )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('skipword')
        //         .setDescription('Salta la parola corrente'),
        // )
        .addSubcommand(subcommand =>
            subcommand
                .setName('snake')
                .setDescription('Gioca al gioco del serpente'),
        )
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('trivia')
        //         .setDescription('Gioca a Trivia'),
        // )
        .addSubcommand(subcommand =>
            subcommand
                .setName('willyoupressthebutton')
                .setDescription('Gioca a Will You Press The Button'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('wouldyourather')
                .setDescription('Gioca a Would You Rather'),
        ),

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