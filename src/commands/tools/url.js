const Discord = require('discord.js');
const isgd = require('isgd');

module.exports = async (client, interaction, args) => {

    // Ottenere l'URL e il codice personalizzato dal comando
    const url = interaction.options.getString('site');
    const code = interaction.options.getString('code');

    // Utilizzare la libreria isgd per creare un URL breve personalizzato
    isgd.custom(url, code, function (res) {
        // Invio di un messaggio di errore se la creazione dell'URL breve fallisce
        if (res.startsWith("Error")) return client.errNormal({
            error: `${res.replace("Error: ", "")}`,
            type: 'editreply'
        }, interaction)

        // Invio di un messaggio di conferma con l'URL breve creato
        client.succNormal({
            text: `Il tuo URL abbreviato è stato creato!`,
            fields: [
                {
                    name: `🔗┇Link`,
                    value: `${res}`,
                    inline: true,
                }
            ],
            type: 'editreply'
        }, interaction);
    });
}