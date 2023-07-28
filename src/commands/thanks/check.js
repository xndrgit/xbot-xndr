const Discord = require('discord.js');
const thanksSchema = require("../../database/models/thanks");

module.exports = async (client, interaction, args) => {

    const member = interaction.options.getUser('user');

    thanksSchema.findOne({User: member.id}, async (err, data) => {
        if (data) {
            return client.embed({
                title: `🤝・Ringraziamenti`,
                desc: `**${member.tag}** ha ricevuto \`${data.Received}\` ringraziamenti`,
                type: 'editreply'
            }, interaction);
        } else {
            return client.embed({
                title: `🤝・Ringraziamenti`,
                desc: `**${member.tag}** non ha ancora ricevuto ringraziamenti`,
                type: 'editreply'
            }, interaction);
        }
    });

}
