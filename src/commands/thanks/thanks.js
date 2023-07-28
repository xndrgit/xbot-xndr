const Discord = require('discord.js');

const thanksSchema = require("../../database/models/thanks");
const thanksAuthor = require("../../database/models/thanksAuthor");

module.exports = async (client, interaction, args) => {

    const target = interaction.options.getUser('user');
    if (!target) return client.errUsage({usage: "thanks [menziona l'utente]", type: 'editreply'}, interaction);

    if (target.id === interaction.user.id) return client.errNormal({
        error: `non puoi ringraziare te stesso!`,
        type: 'editreply'
    }, interaction);

    thanksAuthor.findOne({User: target.id, Author: interaction.user.id}, async (err, data) => {
        if (data) {
            client.errNormal({error: `hai già ringraziato questo utente!`, type: 'editreply'}, interaction);
        } else {
            thanksSchema.findOne({User: target.id}, async (err, data) => {
                if (data) {
                    data.Received += 1;
                    data.save();
                    client.succNormal({
                        text: `Hai ringraziato <@${target.id}>! Ora hanno \`${data.Received}\` ringraziamenti`,
                        type: 'editreply'
                    }, interaction);
                } else {
                    new thanksSchema({
                        User: target.id,
                        UserTag: target.tag,
                        Received: 1,
                    }).save();
                    client.succNormal({
                        text: `Hai ringraziato <@${target.id}>! Ora hanno \`1\` ringraziamento`,
                        type: 'editreply'
                    }, interaction);
                }
            })

            new thanksAuthor({
                User: target.id,
                Author: interaction.user.id,
            }).save();
        }
    })
}
