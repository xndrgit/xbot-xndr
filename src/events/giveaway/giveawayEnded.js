const Discord = require('discord.js');

module.exports = (client, giveaway, winners) => {
    winners.forEach((member) => {
        client.embed({
            title: `🎉・Giveaway terminato`,
            desc: `Congratulazioni ${member.user.username}! Hai vinto!`,
            fields: [
                {
                    name: `🎁┆Premio`,
                    value: `${giveaway.prize}`,
                    inline: true
                },
                {
                    name: `🥳┆Giveaway`,
                    value: `[Cliccami](https://discordapp.com/channels/${giveaway.message.guildId}/${giveaway.message.channelId}/${giveaway.message.id})`,
                    inline: true
                }
            ]
        
        }, member).catch(() => { });
    });
};