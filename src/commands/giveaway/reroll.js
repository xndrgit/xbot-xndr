const Discord = require('discord.js');
const ms = require('ms');

/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 * @param {*} args
 * @returns
 */
module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');
    const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID);
    if (!giveaway) return client.errNormal({
        error: "questo ID messaggio non appartiene a questo server",
        type: 'editreply'
    }, interaction)
    client.giveawaysManager.reroll(messageID).then(() => {
        client.succNormal({
            text: `Giveaway rigenerato`,
            type: 'editreply'
        }, interaction);
    }).catch((err) => {
        client.errNormal({
            error: `non ho trovato il giveaway per l'ID messaggio ${messageID}!`,
            type: 'editreply'
        }, interaction)
    });
}