const Discord = require('discord.js');
const figlet = require('figlet');

module.exports = async (client, interaction, args) => {
    const msg = interaction.options.getString('text');

    if (msg.length > 2000) return client.errNormal({
        error: "testo inferiore di 2000 caratteri!",
        type: 'editreply'
    }, interaction);

    figlet.text(msg, function (err, data) {

        if (err) {
            return client.errNormal({error: "Uoops!", type: 'editreply'}, interaction);
        }

        client.embed({
            title: '💬・Ascii',
            desc: `\`\`\` ${data} \`\`\``,
            type: 'editreply',
        }, interaction);
    })
}

 