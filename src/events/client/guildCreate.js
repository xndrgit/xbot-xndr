const Discord = require('discord.js');

const Functions = require("../../database/models/functions");

module.exports = async (client, guild) => {
    const webhookClient = new Discord.WebhookClient({
        id: client.webhooks.serverLogs.id,
        token: client.webhooks.serverLogs.token,
    });

    if (guild == undefined) return;

    new Functions({
        Guild: guild.id,
        Prefix: client.config.discord.prefix
    }).save();

    try {
        const promises = [
            client.shard.broadcastEval(client => client.guilds.cache.size),
            client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        ];
        Promise.all(promises)
            .then(async (results) => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const embed = new Discord.EmbedBuilder()
                    // toTranslate welcome
                    .setTitle(`🟢 ︵‿︵‿︵‿︵👻 boo! \nsono stato aggiunto su un nuovo server, ${guild.name}!`)
                    .addFields(
                        {name: "Server totali:", value: `${totalGuilds}`, inline: true},
                        {name: "Nome del server", value: `${guild.name}`, inline: true},
                        {name: "Id del server", value: `${guild.id}`, inline: true},
                        {name: "Membri del server", value: `${guild.memberCount}`, inline: true},
                        {name: "Titolare del server", value: `<@!${guild.ownerId}> (${guild.ownerId})`, inline: true},
                    )
                    .setThumbnail("https://cdn.discordapp.com/attachments/843487478881976381/852419422392156210/BotPartyEmote.png")
                    .setColor(client.config.colors.normal)
                webhookClient.send({
                    username: 'Bot Logs',
                    avatarURL: client.user.avatarURL(),
                    embeds: [embed],
                });
            })

        let defaultChannel = "";
        guild.channels.cache.forEach((channel) => {
            if (channel.type == Discord.ChannelType.GuildText && defaultChannel == "") {
                if (channel.permissionsFor(guild.members.me).has(Discord.PermissionFlagsBits.SendMessages)) {
                    defaultChannel = channel;
                }
            }
        })

        let row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Invita")
                    .setURL(client.config.discord.botInvite)
                    .setStyle(Discord.ButtonStyle.Link),

                new Discord.ButtonBuilder()
                    .setLabel("Supporta server")
                    .setURL(client.config.discord.serverInvite)
                    .setStyle(Discord.ButtonStyle.Link),
            );

        client.embed({
            title: "Grazie per avermi invitato!",
            image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474668052/bot_banner_invite.jpg",
            fields: [{
                name: "❓┆Come configurarmi?",
                value: 'Prefisso standard = \`/\` \nPer eseguire le configurazioni con il bot esegui \`/setup\`',
                inline: false,
            },
                {
                    name: "☎️┆Supporto?",
                    value: `Puoi mandare un DM a <@925431204751224943> per richiedere supporto o entrare [[QUI]](${client.config.discord.serverInvite})`,
                    inline: false,
                },
                {
                    name: "💻┆Quali sono i comandi?",
                    value: 'Per visualizzare la lista dei comandi esegui  \`/help\`',
                    inline: false,
                },
                {
                    name: "📨┆Invita il bot!",
                    value: `Invita il bot, cliccando [[QUI]](${client.config.discord.botInvite})`,
                    inline: false,
                },
            ],
            components: [row], 
        }, defaultChannel)
    }
    catch (err) {
        console.log(err);
    }


};