const Discord = require('discord.js');

const Schema = require("../../database/models/reactionRoles");

module.exports = async (client, interaction, args) => {
    const reactions = await Schema.find({Guild: interaction.guild.id});
    if (!reactions) return client.errNormal({
        error: `nessun dato trovato!`,
        type: 'editreply'
    }, interaction);

    let list = "";

    for (let i = 0; i < reactions.length; i++) {
        list += `**${i + 1}** - Categoria: ${reactions[i].Category} \n`;
    }

    await client.embed({
        title: "📃・Ruoli di reazione",
        desc: list,
        type: 'editreply'
    }, interaction);
}