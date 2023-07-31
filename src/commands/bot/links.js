const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.StringSelectMenuBuilder()
                .setCustomId('Bot-linkspanel')
                .setPlaceholder('❌┆Nessuna selezione')
                .addOptions([
                    {
                        label: `[Support server]`,
                        description: `[Unisciti al server di supporto]`,
                        emoji: "❓",
                        value: "support-linkspanel",
                    },
                    {
                        label: `[Invite Bot]`,
                        description: `[Invita il Bot nel tuo server]`,
                        emoji: "📨",
                        value: "invite-linkspanel",
                    },
                    {
                        label: `[Community Server]`,
                        description: `[Unisciti al server della community!]`,
                        emoji: "🌍",
                        value: "community-linkspanel",
                    },
                    {
                        label: `[Top.gg]`,
                        description: `[Mostra il link di top.gg]`,
                        emoji: "📃",
                        value: "top.gg-linkspanel",
                    },
                ]),
        );

    client.embed({
        title: `[🔗]・Link`,
        desc: `[Accedi a tutti i link del Bot! Scegli il link di cui hai bisogno dal menu qui sotto]`,
        image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474668052/Bot_banner_invite.jpg",
        components: [row],
        type: 'editreply'
    }, interaction)
}
