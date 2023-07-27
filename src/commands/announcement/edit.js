const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const message = interaction.options.getString('message');
    const messageId = interaction.options.getString('id');

    const editMessage = await interaction.channel.messages.fetch(messageId);

    client.embed({
        title: `📢・Annuncio!`,
        desc: message,
        type: 'edit'
    }, editMessage);

    client.succNormal({
        text: `Annuncio modificato con successo!`,
        type: 'ephemeraledit'
    }, interaction);
}

 