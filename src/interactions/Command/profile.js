const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
// const Discord = require('discord.js');
// const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Crea un profilo per il server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('❓')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Crea profilo')
        ).addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Rimuovi profilo')
        ).addSubcommand(subcommand =>
            subcommand
                .setName('profile')
                .setDescription('Visualizza profilo')
                .addUserOption((option) =>
                    option.setName('user').setDescription('Seleziona utente').setRequired(false),
                )
        ).addSubcommand(subcommand =>
            subcommand
                .setName('aboutme')
                .setDescription('Inserisci info')
                .addStringOption(option => option.setName('text').setDescription('Inserisci info').setRequired(true))
        ).addSubcommand(subcommand =>
            subcommand
                .setName('age')
                .setDescription('Inserisci età')
                .addNumberOption(option => option.setName('number').setDescription('Inserisci età').setRequired(true))
        ).addSubcommand(subcommand =>
            subcommand
                .setName('bday')
                .setDescription('Inserisci compleanno')
                .addStringOption(option => option.setName('bday').setDescription('Inserisci bday').setRequired(true))
        )

        .addSubcommandGroup((group) =>
            group
                .setName('actor')
                .setDescription('Inserisci attore preferito')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addactor')
                        .setDescription('Aggiungi attore')
                        .addStringOption(option => option.setName('actor').setDescription('Attore').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delactor')
                        .setDescription("Rimuovi attore")
                        .addStringOption(option => option.setName('actor').setDescription('Attore').setRequired(true)),
                )
        ).addSubcommandGroup((group) =>
            group
                .setName('artist')
                .setDescription('Inserisci artista preferito')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addartist')
                        .setDescription('Aggiungi artista')
                        .addStringOption(option => option.setName('artist').setDescription('Artista').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delartist')
                        .setDescription("Rimuovi artista")
                        .addStringOption(option => option.setName('artist').setDescription('Artista').setRequired(true)),
                )
        ).addSubcommand(subcommand =>
            subcommand
                .setName('color')
                .setDescription('Inserisci colore preferito')
                .addStringOption(option => option.setName('color').setDescription('Colore').setRequired(true)),
        ).addSubcommandGroup((group) =>
            group
                .setName('food')
                .setDescription('Inserisci cibo preferito')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addfood')
                        .setDescription('Inserisci cibo preferito')
                        .addStringOption(option => option.setName('food').setDescription('Cibo').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delfood')
                        .setDescription("Rimuovi cibo preferito")
                        .addStringOption(option => option.setName('food').setDescription('Cibo').setRequired(true)),
                )
        ).addSubcommandGroup((group) =>
            group
                .setName('movie')
                .setDescription('Inserisci film preferito')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addmovie')
                        .setDescription('Inserisci film preferito')
                        .addStringOption(option => option.setName('movie').setDescription('Film').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delmovie')
                        .setDescription("Rimuovi film preferito")
                        .addStringOption(option => option.setName('movie').setDescription('Film').setRequired(true)),
                )
        ).addSubcommandGroup((group) =>
            group
                .setName('pet')
                .setDescription('Inserisci animale preferito')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addpet')
                        .setDescription('Inserisci animale preferito')
                        .addStringOption(option => option.setName('pet').setDescription('Animale').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delpet')
                        .setDescription("Rimuovi animale preferito")
                        .addStringOption(option => option.setName('pet').setDescription('Animale').setRequired(true)),
                )
        ).addSubcommandGroup((group) =>
            group
                .setName('song')
                .setDescription('Inserisci canzone preferita')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addsong')
                        .setDescription('inserisci canzone preferita')
                        .addStringOption(option => option.setName('song').setDescription('Canzone').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delsong')
                        .setDescription("rimuovi canzone preferita")
                        .addStringOption(option => option.setName('song').setDescription('Canzone').setRequired(true)),
                )
        ).addSubcommand(subcommand =>
            subcommand
                .setName('gender')
                .setDescription('Inserisci il tuo gender')
        ).addSubcommandGroup((group) =>
            group
                .setName('hobbies')
                .setDescription('Inserisci hobby preferito')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addhobby')
                        .setDescription('Inserisci hobby preferito')
                        .addStringOption(option => option.setName('hobby').setDescription('Hobby').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delhobby')
                        .setDescription("Rimuovi hobby preferito")
                        .addStringOption(option => option.setName('hobby').setDescription('Hobby').setRequired(true)),
                )
        ).
        // addSubcommand(subcommand =>
        //     subcommand
        //         .setName('origin')
        //         .setDescription('Set your origin')
        //         .addStringOption(option => option.setName('country').setDescription('Enter a country').setRequired(true))
        // ).
        addSubcommand(subcommand =>
            subcommand
                .setName('status')
                .setDescription('Inserisci stato')
                .addStringOption(option => option.setName('text').setDescription('Stato').setRequired(true))
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

 