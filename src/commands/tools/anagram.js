const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {

    const word = interaction.options.getString('word');

    fetch(`http://www.anagramica.com/all/${encodeURIComponent(word)}`).then((res) => res.json()).catch({})
        .then(async (json) => {
            let content = ``;
            if (!json.all[0]) return client.errNormal({
                error: "Nessuna parola trovata!",
                type: 'editreply'
            }, interaction)

            json.all.forEach(i => {
                content += `${i}\n`;
            });

            client.embed({
                title: `❓・Anagramma`,
                desc: `Ho formato una parola con le lettere dati`,
                fields: [
                    {
                        name: `💬┇Parola(e)`,
                        value: content
                    }
                ],
                type: 'editreply'
            }, interaction)
        }).catch({})

}