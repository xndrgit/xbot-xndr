const model = require('../../database/models/badge');
const Schema = require('../../database/models/profile');
const CreditsSchema = require("../../database/models/votecredits");

module.exports = async (client, interaction) => {

    const badgeFlags = {
        DEVELOPER: client.emotes.badges.developer,
        EVENT: client.emotes.badges.event,
        BOOSTER: client.emotes.badges.booster,
        BUGS: client.emotes.badges.bug,
        MANAGEMENT: client.emotes.badges.management,
        PREMIUM: client.emotes.badges.premium,
        SUPPORTER: client.emotes.badges.supporter,
        TEAM: client.emotes.badges.team,
        PARTNER: client.emotes.badges.partner,
        VOTER: client.emotes.badges.voter,
        SUPPORT: client.emotes.badges.support,
        MODERATOR: client.emotes.badges.moderator,
        DESIGNER: client.emotes.badges.designer,
        MARKETING: client.emotes.badges.marketing,
        ACTIVE: client.emotes.badges.active,
        VIP: client.emotes.badges.vip
    }

    const flags = {
        ActiveDeveloper: "👨‍💻・Active Developer",
        BugHunterLevel1: "🐛・Discord Bug Hunter",
        BugHunterLevel2: "🐛・Discord Bug Hunter",
        CertifiedModerator: "👮‍♂️・Certified Moderator",
        HypeSquadOnlineHouse1: "🏠・House Bravery Member",
        HypeSquadOnlineHouse2: "🏠・House Brilliance Member",
        HypeSquadOnlineHouse3: "🏠・House Balance Member",
        HypeSquadEvents: "🏠・HypeSquad Events",
        PremiumEarlySupporter: "👑・Early Supporter",
        Partner: "👑・Partner",
        Quarantined: "🔒・Quarantined", // Not sure if this is still a thing
        Spammer: "🔒・Spammer", // Not sure if this one works
        Staff: "👨‍💼・Discord Staff",
        TeamPseudoUser: "👨‍💼・Discord Team",
        VerifiedBot: "🤖・Verified Bot",
        VerifiedDeveloper: "👨‍💻・(early)Verified Bot Developer",
    }

    const user = interaction.options.getUser('user') || interaction.user;

    Schema.findOne({User: user.id}, async (err, data) => {
        if (data) {
            let Badges = await model.findOne({User: user.id});

            let credits = 0;
            const creditData = await CreditsSchema.findOne({User: user.id});

            if (Badges && Badges.FLAGS.includes("DEVELOPER")) {
                credits = "∞";
            } else if (creditData) {
                credits = creditData.Credits;
            }

            if (!Badges) Badges = {User: user.id};

            const userFlags = user.flags ? user.flags.toArray() : [];

            client.embed({
                title: `${client.user.username}・Profilo`,
                desc: '_____',
                thumbnail: user.avatarURL({dynamic: true}),
                fields: [{
                    name: "👤┆Utente",
                    value: user.username,
                    inline: true
                },
                    {
                        name: "📘┆Discriminator",
                        value: user.discriminator,
                        inline: true
                    },
                    {
                        name: "🆔┆ID",
                        value: user.id,
                        inline: true
                    },
                    {
                        name: "👨‍👩‍👦┆Gender",
                        value: `${data.Gender || 'Non impostato'}`,
                        inline: true
                    },
                    {
                        name: "🔢┆Età",
                        value: `${data.Age || 'Non impostato'}`,
                        inline: true
                    },
                    {
                        name: "🎂┆Compleanno",
                        value: `${data.Birthday || 'Non impostato'}`,
                        inline: true
                    },
                    {
                        name: "🎨┆Colore prefe",
                        value: `${data.Color || 'Non impostato'}`,
                        inline: true
                    },
                    {
                        name: "🐶┆Animale prefe",
                        value: `${data.Pets.join(', ') || 'Non impostato'}`,
                        inline: true
                    },
                    {
                        name: "🍕┆Cibo prefe",
                        value: `${data.Food.join(', ') || 'Non impostato'}`,
                        inline: true
                    },
                    {
                        name: "🎶┆Canzone prefe",
                        value: `${data.Songs.join(', ') || 'Non impostato'}`,
                        inline: true
                    },
                    {
                        name: "🎤┆Artista prefe",
                        value: `${data.Artists.join(', ') || 'Non impostato'}`,
                        inline: true
                    },
                    {
                        name: "🎬┆Film prefe",
                        value: `${data.Movies.join(', ') || 'Non impostato'}`,
                        inline: true
                    },
                    {
                        name: "👨‍🎤┆Attore prefe",
                        value: `${data.Actors.join(', ') || 'Non impostato'}`,
                        inline: true
                    },
                    // {
                    //     name: "🏴┆Origin",
                    //     value: `${data.Orgin || 'Not set'}`,
                    //     inline: true
                    // },
                    {
                        name: "🎮┆Hobby Prefe",
                        value: `${data.Hobbys.join(', ') || 'Non impostato'}`,
                        inline: true
                    },
                    {
                        name: "😛┆Stato",
                        value: `${data.Status || 'Non impostato'}`,
                        inline: true
                    },
                    {
                        name: "📛┆Bot Badges",
                        value: `${Badges.FLAGS ? Badges.FLAGS.map(flag => badgeFlags[flag]).join(' ') : 'Nulla'}`,
                        inline: true
                    },
                    {
                        name: "🏷️┆Discord Badges",
                        value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Nulla' || 'Nulla'}`,
                        inline: true
                    },
                    {
                        name: "💳┆Dcredits",
                        value: `${credits || 'Nulla'}`,
                        inline: true
                    },
                    {
                        name: "ℹ️┆Info",
                        value: `${data.Aboutme || 'Non impostato'}`,
                        inline: false
                    },], type: 'editreply'
            }, interaction);
        } else {
            return client.errNormal({
                error: "profilo non trovato! apri un profilo con /profile create",
                type: 'editreply'
            }, interaction);
        }
    })
}

 