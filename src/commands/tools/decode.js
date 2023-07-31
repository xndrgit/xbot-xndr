const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    // Acquisizione del codice binario dal comando
    const code = interaction.options.getString('code');

    // Controllo se il codice è valido
    if (isNaN(parseInt(code))) return client.errNormal({
        error: `Puoi decodificare solo codice binario!`,
        type: 'editreply'
    }, interaction);

    // Conversione del codice binario in testo
    let decode = code.split(' ')
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');

    // Invio del messaggio con il codice binario in input e il testo decodificato in output
    client.embed({
        title: `${client.emotes.normal.check}・Successo!`,
        desc: `Ho decodificato il codice`,
        fields: [
            {
                name: "📥 - Input",
                value: `\`\`\`${code}\`\`\``,
                inline: false,
            },
            {
                name: "📥 - Output",
                value: `\`\`\`${decode}\`\`\``,
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)

}