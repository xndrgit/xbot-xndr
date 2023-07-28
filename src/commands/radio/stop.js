const Discord = require('discord.js');
const Schema = require("../../database/models/music");

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.voiceLogs.id,
        token: client.webhooks.voiceLogs.token,
    });

    let channel = interaction.member.voice ? interaction.member.voice.channel : null;
    if (!channel) return client.errNormal({error: `il canale non esiste!`, type: 'editreply'}, interaction);

    client.radioStop(channel);

    var remove = await Schema.deleteOne({Guild: interaction.guild.id});

    client.embed({
        title: `📻・Radio interrotta`,
        desc: `La radio è stata interrotta con successo. Per far entrare il bot nel canale usa: \`rplay\``,
        fields: [{
            name: "👤┆Interrotta da",
            value: `${interaction.user} (${interaction.user.tag})`,
            inline: true
        },
            {
                name: "📺┆Canale",
                value: `${channel} (${channel.name})`,
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction)

    let embed = new Discord.EmbedBuilder()
        .setTitle(`📻・Radio interrotta`)
        .setDescription(`_______________ \n\nLa radio è stata interrotta con successo`)
        .addFields(
            {name: "👤┆Interrotta da", value: `${interaction.user} (${interaction.user.tag})`, inline: true},
            {name: "📺┆Canale", value: `${channel} (${channel.name})`, inline: true},
            {name: "⚙️┆Server", value: `${interaction.guild.name} (${interaction.guild.id})`, inline: true},
        )
        .setColor(client.config.colors.normal)
        .setTimestamp();
    webhookClientLogs.send({
        username: 'Log del Bot',
        embeds: [embed],
    });
}
