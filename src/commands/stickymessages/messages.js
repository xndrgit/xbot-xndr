const Discord = require('discord.js');

const Schema = require("../../database/models/stickymessages");

module.exports = async (client, interaction, args) => {
    const data = await Schema.find({Guild: interaction.guild.id});

    if (data.length > 0) {
        let list = '';

        for (var i = 0; i < data.length; i++) {
            list += `**${i + 1}** - Canale: ${data[i].Channel}\n`;
        }

        await client.embed({
            title: `💬・Messaggi appiccicosi`,
            desc: list,
            type: 'editreply'
        }, interaction);
    } else {
        client.errNormal({
            error: "nessun dato trovato!",
            type: 'editreply'
        }, interaction);
    }
}
