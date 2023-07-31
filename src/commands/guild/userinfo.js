const Discord = require('discord.js');
const axios = require("axios");

const model = require('../../database/models/badge');

module.exports = async (client, interaction, args) => {
    const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
    if (!member) return client.errNormal({
        error: "Questo utente non è in questa gilda!",
        type: 'editreply'
    }, interaction);
    const badgeFlags = {
        DEVELOPER: client.emotes.badges.developer,
        BUGS: client.emotes.badges.bug,
        MANAGEMENT: client.emotes.badges.management,
        PREMIUM: client.emotes.badges.premium,
        SUPPORTER: client.emotes.badges.supporter,
        TEAM: client.emotes.badges.team,
        BOOSTER: client.emotes.badges.booster,
        PARTNER: client.emotes.badges.partner,
        VOTER: client.emotes.badges.voter,
        SUPPORT: client.emotes.badges.support,
        MODERATOR: client.emotes.badges.moderator,
        DESIGNER: client.emotes.badges.designer,
        MARKETING: client.emotes.badges.marketing
    }

    const flags = {
        ActiveDeveloper: "👨‍💻・Sviluppatore attivo",
        BugHunterLevel1: "🐛・Cacciatore di bug Discord",
        BugHunterLevel2: "🐛・Cacciatore di bug Discord",
        CertifiedModerator: "👮‍♂️・Moderatore certificato",
        HypeSquadOnlineHouse1: "🏠・Membro della Casa Coraggio",
        HypeSquadOnlineHouse2: "🏠・Membro della Casa Brillantezza",
        HypeSquadOnlineHouse3: "🏠・Membro della Casa Equilibrio",
        HypeSquadEvents: "🏠・Eventi HypeSquad",
        PremiumEarlySupporter: "👑・Supporter iniziale",
        Partner: "👑・Partner",
        Quarantined: "🔒・In quarantena", // Non sono sicuro se questo esista ancora
        Spammer: "🔒・Spammer", // Non sono sicuro se questo funzioni ancora
        Staff: "👨‍💼・Staff Discord",
        TeamPseudoUser: "👨‍💼・Team Discord",
        VerifiedBot: "🤖・Bot verificato",
        VerifiedDeveloper: "👨‍💻・Sviluppatore bot (early)verificato",
    }

    let Badges = await model.findOne({User: member.user.id});
    if (!Badges) Badges = {User: member.user.id}
    const roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);
    const userFlags = member.user.flags ? member.user.flags.toArray() : [];

    return client.embed({
        title: `👤・Informazioni utente`,
        desc: `Informazioni su ${member.user.username}`,
        thumbnail: member.user.displayAvatarURL({dynamic: true, size: 1024}),
        image: member.user.bannerURL({dynamic: true, size: 1024}),
        fields: [
            {
                name: "Username",
                value: `${member.user.username}`,
                inline: true,
            },
            {
                name: "Discriminator",
                value: `${member.user.discriminator}`,
                inline: true,
            },
            {
                name: "Nickname",
                value: `${member.nickname || 'Nessun nickname'}`,
                inline: true,
            },
            {
                name: "Id",
                value: `${member.user.id}`,
                inline: true,
            },
            {
                name: "Flags",
                value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Nessuno'}`,
                inline: true,
            },
            {
                name: "Badge",
                value: `${Badges.FLAGS ? Badges.FLAGS.map(flag => badgeFlags[flag]).join(' ') : 'Nessuno'}`,
                inline: true,
            },
            {
                name: "Data creazione account Discord",
                value: `<t:${Math.round(member.user.createdTimestamp / 1000)}>`,
                inline: true,
            },
            {
                name: "Data entrata nel server",
                value: `<t:${Math.round(member.joinedAt / 1000)}>`,
                inline: true,
            },
            {
                name: `Ruoli [${roles.length}]`,
                value: `${roles.length ? roles.join(', ') : 'Nessuno'}`,
                inline: false,
            }
        ],
        type: 'editreply'
    }, interaction)
}