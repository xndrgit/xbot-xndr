const Discord = require('discord.js');
const sourcebin = require('sourcebin');

module.exports = async (client, interaction, args) => {

    // Ottenere il linguaggio di programmazione e il codice dal comando
    const language = interaction.options.getString('language');
    const code = interaction.options.getString('code');

    // Utilizzare la libreria sourcebin per creare un nuovo bin e caricare il codice
    const bin = await sourcebin.create(
        [
            {
                content: `${code}`,
                language: `${language}`,
            },
        ],
        {
            title: '💻・Random Code',
            description: 'This code was uploaded via Bot',
        },
    ).then(value => {
        // Invio di un messaggio di conferma con il link al bin creato
        client.succNormal({
            text: `Il tuo codice è stato pubblicato!`,
            fields: [
                {
                    name: `🔗┇Link`,
                    value: `[Clicca qui per vedere il tuo codice](${value.url})`,
                    inline: true,
                }
            ],
            type: 'editreply'
        }, interaction);
    })

}