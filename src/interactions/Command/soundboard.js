const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');

module.exports = {

    // Meme Images

    data: new SlashCommandBuilder()
        .setName('soundboard')
        .setDescription('Riproduce tutti i suoni')

        .addSubcommand((subcommand) =>
            subcommand
                .setName('help')
                .setDescription('❓')
        )

        // Windows Sounds
        .addSubcommandGroup((group) =>
            group
                .setName('windows')
                .setDescription('Riproduce i suoni di Windows')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('windowserror')
                        .setDescription('Riproduce il suono di errore di Windows')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('windowsshutdown')
                        .setDescription('Riproduce il suono di spegnimento di Windows')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('windowsstartup')
                        .setDescription('Riproduce il suono di avvio di Windows')
                )
        )

        // Earrape Sounds

        .addSubcommandGroup((group) =>
            group
                .setName('earrape')
                .setDescription('Riproduce i suoni Earrape nel Bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('reee')
                        .setDescription('Riproduce il suono "reee"')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('defaultdance')
                        .setDescription('Riproduce il suono "defaultdance"')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('startup')
                        .setDescription('Riproduce il suono di avvio')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('thomas')
                        .setDescription('Riproduce il suono "thomas"')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('wegothim')
                        .setDescription('Riproduce il suono "wegothim"')
                )
        )

        // Song Sounds

        .addSubcommandGroup((group) =>
            group
                .setName('songs')
                .setDescription('Riproduce i suoni delle canzoni nel Bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('dancememe')
                        .setDescription('Riproduce il suono "dancememe"')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('despacito')
                        .setDescription('Riproduce il suono "despacito"')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('elevator')
                        .setDescription('Riproduce il suono "elevator"')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('rickastley')
                        .setDescription('Riproduce il suono "rickastley"')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('running')
                        .setDescription('Riproduce il suono "running"')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('tobecontinued')
                        .setDescription('Riproduce il suono "tobecontinued"')
                )
        )

        // Discord Sounds

        .addSubcommandGroup((group) =>
            group
                .setName('discord')
                .setDescription('Riproduce i suoni di Discord nel Bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('discordcall')
                        .setDescription('Riproduce il suono di chiamata di Discord')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('discordjoin')
                        .setDescription('Riproduce il suono di ingresso alla chiamata vocale di Discord')
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('discordleave').setDescription('Riproduce il suono di uscita dalla chiamata vocale di Discord')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('discordnotification')
                        .setDescription('Riproduce il suono di notifica di Discord')
                )
        )

        // Discord Sounds

        .addSubcommandGroup((group) =>
            group
                .setName('memes')
                .setDescription('Riproduce i suoni meme')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('fbi')
                        .setDescription('Riproduce suono fbi'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('jeff')
                        .setDescription('Riproduce suono jeff'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('lambo')
                        .setDescription('Riproduce suono lambo'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('missionfailed')
                        .setDescription('Riproduce suono missionfailed'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('moaning')
                        .setDescription('Riproduce suono sbadiglio'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('nani')
                        .setDescription('Riproduce suono nani'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('nyancat')
                        .setDescription('Riproduce suono nyan'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('ohh')
                        .setDescription('Riproduce suono ohh'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('rimshot')
                        .setDescription('Riproduce suono rimshot '),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('roblox')
                        .setDescription('Riproduce suono roblox'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('shotdown')
                        .setDescription('Riproduce suono shotdown'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('spongebob')
                        .setDescription('Riproduce suono spongebob'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('wow')
                        .setDescription('Riproduce suono wow'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('yeet')
                        .setDescription('Riproduce suono yeet'),
                )
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


