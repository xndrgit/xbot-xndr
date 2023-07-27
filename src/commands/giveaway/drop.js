const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const gchannel = interaction.options.getChannel('channel');
    const duration = interaction.options.getString('duration');
    const winnerCount = interaction.options.getNumber('winners');
    const prize = interaction.options.getString('prize');

    client.giveawaysManager.start(gchannel, {
        duration: ms(duration),
        prize: `${client.emotes.normal.gift} - ${prize}`,
        lastChance: {
            enabled: true,
            content: `${client.emotes.normal.error} **ULTIMA POSSIBILITÀ PER PARTECIPARE!** ${client.emotes.normal.error}`,
            threshold: 5000,
            embedColor: '#FF0000'
        },
        pauseOptions: {
            isPaused: true,
            content: '⚠️ **QUESTO GIVEAWAY È IN PAUSA!** ⚠️',
            unPauseAfter: null,
            embedColor: '#FFFF00'
        },
        winnerCount: parseInt(winnerCount),
        hostedBy: interaction.user,
        thumbnail: interaction.guild.iconURL({dynamic: true, size: 1024}),
        isDrop: true,
        messages: {
            giveaway: `${client.emotes.normal.party} **GIVEAWAY** ${client.emotes.normal.party}`,
            giveawayEnded: `${client.emotes.normal.party} **GIVEAWAY TERMINATO** ${client.emotes.normal.party}`,
            drawing: `${client.emotes.normal.clock} - Termina il: **{timestamp}**!`,
            dropMessage: `Sii il primo a reagire con 🥳`,
            winMessage: "Congratulazioni {winners}! Hai appena vinto **{this.prize}** !",
            embedFooter: "Giveaway!",
            embedColor: client.config.colors.normal,
            noWinner: "Giveaway cancellato, non ci sono stati abbastanza partecipanti. \n",
            hostedBy: `${client.emotes.normal.party} - Organizzato da: {this.hostedBy}`,
            winners: `🏆 - Vincitore/i`,
            endedAt: "Termina il:",
            units: {
                seconds: "secondi",
                minutes: "minuti",
                hours: "ore",
                days: "giorni",
                pluralS: false
            },
        },

    }).then((gData) => {
        client.succNormal({
            text: `Giveaway avviato in ${gchannel}`,
            type: 'ephemeraledit'
        }, interaction);
    });
}