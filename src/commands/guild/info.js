const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    let verifLevels = {
        "0": "Nessuna",
        "1": "Bassa",
        "2": "Media",
        "3": "(╯°□°）╯︵  ┻━┻",
        "4": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
    }

    let region = {
        "brazil": `:flag_br: `,
        "eu-central": `:flag_eu: `,
        "singapore": `:flag_sg: `,
        "us-central": `:flag_us: `,
        "sydney": `:flag_au: `,
        "us-east": `:flag_us: `,
        "us-south": `:flag_us: `,
        "us-west": `:flag_us: `,
        "eu-west": `:flag_eu: `,
        "vip-us-east": `:flag_us: `,
        "europe": `:flag_gb:`,
        "amsterdam": `:flag_nl:`,
        "hongkong": `:flag_hk: `,
        "russia": `:flag_ru: `,
        "southafrica": `:flag_za: `
    }

    let tier = {
        "0": "Nessuno",
        "1": "TIER 1",
        "2": "TIER 2",
        "3": "**TIER 3**"
    }

    const members = await interaction.guild.members.fetch();

    client.embed({
        title: `ℹ️・Informazioni server`,
        desc: `Informazioni sul server ${interaction.guild.name}`,
        thumbnail: interaction.guild.iconURL({dynamic: true, size: 1024}),
        image: interaction.guild.bannerURL({size: 1024}),
        fields: [
            {
                name: "Nome server:",
                value: `${interaction.guild.name}`,
                inline: true,
            },
            {
                name: "ID server:",
                value: `${interaction.guild.id}`,
                inline: true,
            },
            {
                name: "Proprietario:",
                value: `<@!${interaction.guild.ownerId}>`,
                inline: true
            },
            {
                name: "Livello di verifica:",
                value: `${verifLevels[interaction.guild.verificationLevel]}`,
                inline: true
            },
            {
                name: "Livello di boost:",
                value: `${tier[interaction.guild.premiumTier]}`,
                inline: true
            },
            {
                name: "Numero di boost:",
                value: `${interaction.guild.premiumSubscriptionCount || '0'} boost`,
                inline: true
            },
            {
                name: "Creato il:",
                value: `<t:${Math.round(interaction.guild.createdTimestamp / 1000)}>`,
                inline: true
            },
            {
                name: "Membri:",
                value: `${interaction.guild.memberCount} membri!`,
                inline: true
            },
            {
                name: "Bot:",
                value: `${members.filter(member => member.user.bot).size} bot!`,
                inline: true
            },
            {
                name: "Canali testuali:",
                value: `${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildText).size} canali!`,
                inline: true
            },
            {
                name: "Canali vocali:",
                value: `${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildVoice).size} canali!`,
                inline: true
            },
            {
                name: "Canali stage:",
                value: `${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildStageVoice).size} canali!`,
                inline: true
            },
            {
                name: "Canali news:",
                value: `${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildAnnouncement).size} canali!`,
                inline: true
            },
            {
                name: "Thread pubblici:",
                value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_PUBLIC_THREAD').size} thread!`,
                inline: true
            },
            {
                name: "Thread privati:",
                value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_PRIVATE_THREAD').size} thread!`,
                inline: true
            },
            {
                name: "Ruoli:",
                value: `${interaction.guild.roles.cache.size} ruoli!`,
                inline: true
            },
            {
                name: "Numero di emoji:",
                value: `${interaction.guild.emojis.cache.size} emoji`,
                inline: true
            },
            {
                name: "Numero di sticker:",
                value: `${interaction.guild.stickers.cache.size} sticker`,
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction)
}