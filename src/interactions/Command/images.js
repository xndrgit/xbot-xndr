const {CommandInteraction, Client} = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
const {ChannelType} = require('discord.js');

module.exports = {

    // Meme Images

    data: new SlashCommandBuilder()
        .setName('images')
        .setDescription('Visualizza tutte le immagini')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Images help')
        )
        .addSubcommandGroup((group) =>
            group
                .setName('memes')
                .setDescription('Visualizza tutti i meme nel bot')
                .addSubcommand((subcommand) =>
                    subcommand.setName('clyde').setDescription('Ottieni un messaggio personalizzato di Clyde')
                        .addStringOption(option => option.setName('text').setDescription('Inserisci un testo').setRequired(true))
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('drake').setDescription('Crea un meme di Drake')
                        .addStringOption(option => option.setName('text1').setDescription('Inserisci un testo').setRequired(true))
                        .addStringOption(option => option.setName('text2').setDescription('Inserisci un testo').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('meme').setDescription('Ottieni un meme casuale'),
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('pooh').setDescription('Crea un meme di Pooh')
                        .addStringOption(option => option.setName('text1').setDescription('Inserisci un testo').setRequired(true))
                        .addStringOption(option => option.setName('text2').setDescription('Inserisci un testo').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('trumptweet').setDescription('Mostra un tweet personalizzato di Donald Trump con il messaggio fornito')
                        .addStringOption(option => option.setName('text').setDescription('Inserisci un testo').setRequired(true))
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('tweet').setDescription('Tweet qualcosa su Twitter')
                        .addStringOption(option => option.setName('text').setDescription('Inserisci un testo').setRequired(true))
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('wasted').setDescription('Overlay di GTA Wasted'),
                )
        )

        // Animal Images

        .addSubcommandGroup((group) =>
            group
                .setName('animals')
                .setDescription('Visualizza tutte le immagini di animali nel bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('bird')
                        .setDescription('Ottieni un uccello casuale'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('cat')
                        .setDescription("Ottieni un gatto casuale")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('dog')
                        .setDescription("Ottieni un cane casuale")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('fox')
                        .setDescription("Ottieni una volpe casuale")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('koala')
                        .setDescription("Ottieni un koala casuale")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('panda')
                        .setDescription("Ottieni un panda casuale")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('redpanda')
                        .setDescription("Ottieni una panda rossa casuale")
                )
        )

        // User Images

        .addSubcommandGroup((group) =>
            group
                .setName('user')
                .setDescription('Visualizza tutte le immagini utente nel bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('ad')
                        .setDescription('Genera un\'immagine di pubblicità')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente per cui vuoi la pubblicità').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('avatar')
                        .setDescription('Visualizza l\'avatar di un utente')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente di cui vuoi l\'avatar').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('banner')
                        .setDescription('Visualizza il banner di un utente')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente di cui vuoi il banner').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('bed')
                        .setDescription('Crea un meme a letto')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente con cui vuoi dormire').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('blur')
                        .setDescription('Crea un\'immagine sfocata')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente da cui vuoi l\'immagine sfocata').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('burn')
                        .setDescription('Crea un\'immagine bruciata')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente da cui vuoi l\'immagine bruciata').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('clown')
                        .setDescription('Genera un\'immagine da clown')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente a cui vuoi fare il clown').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('colorify')
                        .setDescription('Genera un\'immagine colorata')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente da cui vuoi l\'immagine colorata').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('darkness')
                        .setDescription('Crea un\'immagine oscura')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('l\'utente da cui vuoi l\'immagine oscurata').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('facepalm')
                        .setDescription('Genera un\'immagine con gesto del facepalm')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente di cui vuoi l\'immagine del facepalm').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('greyscale')
                        .setDescription('Rendi un\'immagine più grigia')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente a cui vuoi dare un tocco di grigio').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('invert')
                        .setDescription('Inverti un\'immagine')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente di cui vuoi l\'immagine invertita').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('kiss')
                        .setDescription('Bacia un utente')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente che vuoi baciare').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('podium')
                        .setDescription('Crea un podio utente')
                        .addUserOption((option) =>
                            option.setName('user1').setDescription('Il primo utente del podio').setRequired(true),
                        )
                        .addUserOption((option) =>
                            option.setName('user2').setDescription('Il secondo utente del podio').setRequired(true),
                        )
                        .addUserOption((option) =>
                            option.setName('user3').setDescription('Il terzo utente del podio').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('spank')
                        .setDescription('Schiaffa un utente')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente che vuoi schiaffeggiare').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('wanted')
                        .setDescription('Cerca un utente')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('L\'utente che vuoi ricercare').setRequired(true),
                        )
                )
        )

        // Extra Images

        .addSubcommandGroup((group) =>
            group
                .setName('extra')
                .setDescription('Visualizza tutte le immagini extra nel bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('car')
                        .setDescription('Ottieni una macchina casuale'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('glass')
                        .setDescription('Sovrapponi una texture di vetro su un\'immagine'),
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('image').setDescription('Mostra un\'immagine in un embed')
                        .addChannelOption(option => option.setName('channel').setDescription('Canale in cui deve essere visualizzato l\'embed').setRequired(true).addChannelTypes(ChannelType.GuildText))
                        .addStringOption(option => option.setName('image-url').setDescription('Inserisci un URL dell\'immagine').setRequired(true))
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('triggered')
                        .setDescription('Attiva la modalità "Triggered" su te stesso'),
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('wallpaper').setDescription('Restituisce uno sfondo da HDQWalls')
                        .addStringOption(option => option.setName('name').setDescription('Inserisci un nome').setRequired(true))
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
