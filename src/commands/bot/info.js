const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const promises = [
        client.shard.broadcastEval(client => client.guilds.cache.size),
        client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        client.shard.broadcastEval(client => client.channels.cache.size),
        client.shard.broadcastEval(client => client.voice.adapters.size)
    ];
    return Promise.all(promises)
        .then(async results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            const totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
            const totalVoice = results[3].reduce((acc, voiceCount) => acc + voiceCount, 0);

            const duration = moment.duration(client.uptime).format("\`D\` [giorni], \`H\` [ore], \`m\` [minuti], \`s\` [secondi]");

            client.embed({
                title: `[🔗]・Informazioni sul Bot`,
                desc: `[____________________________]`,
                thumbnail: client.user.avatarURL({size: 1024}),
                fields: [
                    {
                        name: "[ℹ️]┆Informazioni",
                        value: `[XBot è un bot con cui puoi gestire l'intero server! Con una capacità di 400+ comandi, boost ur server!]`,
                        inline: false,
                    },
                    {
                        name: "_____ \n\n│Generale",
                        value: `_____`,
                        inline: false,
                    },
                    {
                        name: "[🤖]┆Nome del Bot",
                        value: `[${client.user.username}]`,
                        inline: true,
                    },
                    {
                        name: "[🆔]┆ID del Bot",
                        value: `[${client.user.id}]`,
                        inline: true,
                    },
                    {
                        name: "[💻]┆X",
                        value: `[${client.options.shardCount}] X avviata`,
                        inline: true,
                    },
                    {
                        name: "[🔧]┆Proprietario del Bot",
                        value: `[<@!755297485328482356>]`,
                        inline: true,
                    },
                    {
                        name: "[🔧]┆Sviluppatori del Bot",
                        value: `[<@!925431204751224943>]`,
                        inline: true,
                    },
                    {
                        name: "[💻]┆Comandi",
                        value: `[${client.commands.size}] comandi`,
                        inline: true,
                    },
                    {
                        name: "[🌐]┆Server",
                        value: `[${totalGuilds}] servers`,
                        inline: true,
                    },
                    {
                        name: "[🌐]┆Server in questo Shard",
                        value: `[${client.guilds.cache.size}] servers`,
                        inline: true,
                    },
                    {
                        name: "[👥]┆Membri",
                        value: `[${totalMembers}] membri`,
                        inline: true,
                    },
                    {
                        name: "[🔊]┆Canali connessi",
                        value: `[${totalVoice}] canali`,
                        inline: true,
                    },
                    {
                        name: "[📺]┆Canali",
                        value: `[${totalChannels}] canali`,
                        inline: true,
                    },
                    {
                        name: "[📅]┆Creato",
                        value: `[<t:${Math.round(client.user.createdTimestamp / 1000)}>]`,
                        inline: true,
                    },

                    {
                        name: "_____ \n\n│Sistema",
                        value: `_____`,
                        inline: false,
                    },
                    {
                        name: "[🆙]┆Tempo di attività",
                        value: `[${duration}]`,
                        inline: true,
                    },
                    {
                        name: "[⌛]┆Velocità API:",
                        value: `[${client.ws.ping}ms]`,
                        inline: true,
                    },
                    {
                        name: "[🏷]┆Versione del Bot",
                        value: `[${require(`${process.cwd()}/package.json`).version}]`,
                        inline: true,
                    },
                    {
                        name: "[🏷]┆Versione Node.js",
                        value: `[${process.version}]`,
                        inline: true,
                    },
                    {
                        name: "[📂]┆Versione Discord.js",
                        value: `[${Discord.version}]`,
                        inline: true,
                    },
                    {
                        name: "[💾]┆Memoria del Bot",
                        value: `[${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB]`,
                        inline: true,
                    },
                    {
                        name: "[🔗]┆Links",
                        value: `Aggiungimi: [[QUI]](${client.config.discord.botInvite}) \nServer di supporto: [[QUI]](${client.config.discord.serverInvite})`,
                        inline: false,
                    }],
                type: 'editreply'
            }, interaction)
        })
}
