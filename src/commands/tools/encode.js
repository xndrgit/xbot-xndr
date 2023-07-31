const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    // Ottenere il testo da convertire in binario dal comando
    const text = interaction.options.getString('text');

    // Convertire il testo in una stringa binaria
    let encode = text.split("").map(x => x.charCodeAt(0).toString(2)).join(" ");

    // Invio del messaggio con il testo convertito in binario
    client.embed({
        title: `${client.emotes.normal.check}・Success!`,
        description: `Ho convertito il testo in testo binario`,
        fields: [
            {
                name: "📥┇Input",
                value: `\`\`\`${text}\`\`\``,
                inline: false,
            },
            {
                name: "📤┇Output",
                value: `\`\`\`${encode}\`\`\``,
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)

}