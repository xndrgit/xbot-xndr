const Discord = require('discord.js');
const generator = require('generate-password');

module.exports = async (client, interaction, args) => {

    // Generazione della password utilizzando la libreria generate-password
    const password = generator.generate({
        length: 12,
        symbols: true,
        numbers: true
    });

    // Invio di un messaggio di conferma all'utente che ha richiesto la generazione della password
    client.succNormal({text: `Ho generato una password e te l'ho inviata in DM`, type: 'editreply'}, interaction);

    // Invio della password generata all'utente via messaggio diretto
    client.succNormal({
        text: `La tua password`,
        fields: [
            {
                name: "🔑┇Password",
                value: `${password}`,
                inline: true,
            },
            {
                name: "👣┇Lunghezza",
                value: `12`,
                inline: true,
            }
        ]
    }, interaction.user)

}