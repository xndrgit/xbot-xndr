const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 6);

    client.embed({
        title: `🎲・Lancia il dado`,
        desc: `Ti è uscito il ${result}`,
        type: 'editreply'
    }, interaction);
}

 