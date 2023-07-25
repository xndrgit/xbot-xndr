const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fun')
        .setDescription('Comandi for fun')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('❓')
        )

        // Meme Commands

        .addSubcommandGroup((group) =>
            group
                .setName('meme')
                .setDescription('Comandi meme')
                // .addSubcommand(subcommand =>
                //     subcommand
                //         .setName('confused')
                //         .setDescription('React with a Confused Nick Young meme')
                // )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('cleverrate')
                        .setDescription('Quanto sei intelligente?')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('howgay')
                        .setDescription('Quanto sei gay?')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('simprate')
                        .setDescription('Quanto sei simp?')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('stankrate')
                        .setDescription('Quanto puzzi?')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('dinochrome')
                        .setDescription('🦖')
                )
                // .addSubcommand(subcommand =>
                //     subcommand
                //         .setName('epicgamerrate')
                //         .setDescription('See how much of an epic gamer you are')
                // )

                .addSubcommand(subcommand =>
                    subcommand
                        .setName('roast')
                        .setDescription('Insulta')
                        .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
                )
                // .addSubcommand(subcommand =>
                //     subcommand
                //         .setName('rickroll')
                //         .setDescription('Get a rickroll')
                // )
        )

        // User Commands

        .addSubcommandGroup((group) =>
            group
                .setName('user')
                .setDescription('Comandi utente')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('hack')
                        .setDescription('Hack!')
                        .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('hug')
                        .setDescription('Hug!')
                        .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('gif')
                        .setDescription('Cerca gif')
                        .addStringOption(option => option.setName('text').setDescription('Inserisci un testo').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('kill')
                        .setDescription('Kill!')
                        .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('lovemeter')
                        .setDescription('Ship!')
                        .addUserOption(option => option.setName('user1').setDescription('Seleziona un utente').setRequired(true))
                        .addUserOption(option => option.setName('user2').setDescription('Seleziona un utente').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('sudo')
                        .setDescription('🥷')
                        .addUserOption(option => option.setName('user').setDescription('Seleziona un utente').setRequired(true))
                        .addStringOption(option => option.setName('text').setDescription('Inserisci un testo').setRequired(true))
                )
        )

        // Text Commands

        .addSubcommandGroup((group) =>
            group
                .setName('text')
                .setDescription('Comandi testo')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('say')
                        .setDescription('Scrivo per te')
                        .addStringOption(option => option.setName('text').setDescription('Enter a text').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('ascii')
                        .setDescription('Testo ascii')
                        .addStringOption(option => option.setName('text').setDescription('Inserisci un testo').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('reverse')
                        .setDescription('Inverti testo')
                        .addStringOption(option => option.setName('text').setDescription('Enter a text').setRequired(true))
                )

        )

        // Extra Commands

        .addSubcommandGroup((group) =>
            group
                .setName('extra')
                .setDescription('Comandi extra')
                // .addSubcommand(subcommand =>
                //     subcommand
                //         .setName('birdfact')
                //         .setDescription('Get a random bird fact')
                // )
                // .addSubcommand(subcommand =>
                //     subcommand
                //         .setName('catfact')
                //         .setDescription('Get a random cat fact')
                // )
                // .addSubcommand(subcommand =>
                //     subcommand
                //         .setName('dogfact')
                //         .setDescription('Get a random dog fact')
                // )
                // .addSubcommand(subcommand =>
                //     subcommand
                //         .setName('fact')
                //         .setDescription('Get a random fact')
                // )
                // .addSubcommand(subcommand =>
                //     subcommand
                //         .setName('koalafact')
                //         .setDescription('Get a random koalafact fact')
                // )
                // .addSubcommand(subcommand =>
                //     subcommand
                //         .setName('pandafact')
                //         .setDescription('Get a random pandafact fact')
                // )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('token')
                        .setDescription('Token')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('worldclock')
                        .setDescription('Orologio mondiale')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('xmas')
                        .setDescription('🎄')
                )
        ),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};

 