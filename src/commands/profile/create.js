const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {
    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {
            return client.errNormal({error: "hai già un profilo bot", type: "editreply"}, interaction);
        } else {
            new Schema({
                User: interaction.user.id
            }).save();

            client.succNormal({
                text: "Profilo creato! Visualizza il tuo profilo eseguendo \`profile\`",
                type: "editreply"
            }, interaction);
        }
    })
}