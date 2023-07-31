const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkBotPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageChannels],
        perms: [Discord.PermissionsBitField.Flags.ManageChannels]
    }, interaction)

    if (perms == false) return;

    let limit = interaction.options.getNumber('limit');

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({
        error: `non sei in un canale vocale!`,
        type: 'editreply'
    }, interaction);
    var checkVoice = await client.checkVoice(interaction.guild, channel);
    if (!checkVoice) {
        return client.errNormal({
            error: `non puoi modificare questo canale!`,
            type: 'editreply'
        }, interaction);
    } else {
        channel.setUserLimit(limit);

        client.succNormal({
            text: `Il limite del canale è stato impostato su \`${limit}\`!`,
            fields: [
                {
                    name: `📘┆Canale`,
                    value: `${channel} (${channel.name})`
                }
            ],
            type: 'editreply'
        }, interaction);
    }
}