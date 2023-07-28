const Discord = require('discord.js');
const Schema = require("../../database/models/music");

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.voiceLogs.id,
        token: client.webhooks.voiceLogs.token,
    });

    let channel = interaction.member.voice ? interaction.member.voice.channel : null;
    if (!channel) return client.errNormal({text: `Il canale non esiste!`, type: 'editreply'}, interaction);

    client.radioStart(channel);

    Schema.findOne({Guild: interaction.guild.id}, async (err, data) => {
        if (data) {
            data.Channel = channel.id;
            data.save();
        } else {
            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
            }).save();
        }
    })

    client.embed({
        title: `📻・Radio avviata`,
        desc: `La radio è stata avviata con successo \nPer far uscire il bot usa: \`rleave\``,
        fields: [{
            name: "👤┆Avviata da",
            value: `${interaction.user} (${interaction.user.tag})`,
            inline: true
        },
            {
                name: "📺┆Canale",
                value: `${channel} (${channel.name})`,
                inline: true
            },
            {
                name: "🎶┆Stazione radio",
                value: `[Radio 538](https://www.538.nl/)`,
                inline: true
            },
        ],
        type: 'editreply'
    }, interaction)

    let embed = new Discord.EmbedBuilder()
        .setTitle(`📻・Radio avviata`)
        .setDescription(`_______________ \n\nLa radio è stata avviata con successo`)
        .addFields(
            {name: "👤┆Avviata da", value: `${interaction.user} (${interaction.user.tag})`, inline: true},
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
