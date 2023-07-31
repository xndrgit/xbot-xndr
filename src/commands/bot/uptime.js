const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const duration = moment.duration(client.uptime).format("\`D\` [giorni], \`H\` [ore], \`m\` [minuti], \`s\` [secondi]");
    const upvalue = (Date.now() / 1000 - client.uptime / 1000).toFixed(0);

    client.embed({
        title: `[${client.emotes.normal.arrowUp}]・Tempo di attività`,
        desc: `[Vedi quanto tempo il Bot è stato attivo]`,
        fields: [
            {
                name: "[⌛]┇Tempo di attività",
                value: `[${duration}]`,
                inline: true
            },
            {
                name: "[⏰]┇Online dal",
                value: `<t:${upvalue}>`,
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction)
}
