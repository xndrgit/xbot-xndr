const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const question = interaction.options.getString('question');

    var antwoorden = [
        "Indubbiamente!",
        "Negativo Ghost Rider!",
        "Di nuovo, confermo!",
        "Negarlo sarebbe disonesto.",
        "Ti do pienamente ragione.",
        "Purtroppo la mia intelligenza non arriva a tanto.",
        "Le mie fonti dicono di permetterti di sognare!",
        "Se solo la realtà fosse così perfetta..",
        "La mia risposta danzerà con te in testa.",
        "Il cielo è il limite.",
        "Senza ombra di dubbio no!",
        "Senza speranza no!",
        "Infatti!",
        "Certamente!",
        "Aspetta il nuovo aggiornamento.",
        "Confermato, 007!",
        "Mia madre sarebbe d'accordo!",
        "Secondo me sì, boss!",
        "Direi di sì, Cap!",
        "Sì, certo quanto le teorie di Sherlock Holmes!",
        "Proprio così Saiyan!",
        "Assolutamente sulla parola di Spiderman!",
        "Te lo giuro!"
    ]
    var resultaat = Math.floor((Math.random() * antwoorden.length));

    client.embed({
        title: `${client.emotes.normal.ball}・8ball`,
        desc: `Guarda la risposta alla tua domanda!`,
        fields: [
            {
                name: `💬┆La tua domanda`,
                value: `\`\`\`${question}\`\`\``,
                inline: false
            },
            {
                name: `🤖┆Risposta del bot`,
                value: `\`\`\`${antwoorden[resultaat]}\`\`\``,
                inline: false
            }
        ],
        type: 'editreply'
    }, interaction);
}