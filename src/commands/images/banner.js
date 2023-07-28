const Discord = require('discord.js');
const axios = require("axios");

module.exports = async (client, interaction, args) => {
    const user = interaction.options.getUser('user') || interaction.user;

    axios.get(`https://discord.com/api/users/${user.id}`, {
        headers: {
            Authorization: `Bot ${client.token}`,
        },
    }).then(res => {
        const {banner, accent_color} = res.data;

        if (banner) {
            const extension = banner.startsWith("a_") ? ".gif" : ".png";
            const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=1024`;

            client.embed({
                title: `🖼️・Banner dell'utente`,
                image: url,
                type: 'editreply'
            }, interaction)
        } else {
            if (accent_color) {
                client.embed({
                    title: `🖼️・Banner dell'utente`,
                    desc: `${user} non ha un banner, ma ha un colore dell'accento`,
                    color: accent_color,
                    type: 'editreply'
                }, interaction)
            } else {
                client.embed({
                    title: `🖼️・Banner dell'utente`,
                    desc: `${user} non ha un banner e neppure un colore dell'accento`,
                    type: 'editreply'
                }, interaction)
            }
        }
    })
}
