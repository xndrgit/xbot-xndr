const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const status = interaction.options.getString('text');

    if (status.length > 30) return client.errNormal({
        error: "il tuo stato non può essere più lungo di 30 caratteri",
        type: 'editreply'
    }, interaction);

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {
            data.Status = status;
            data.save();

            client.succNormal({
                text: "Il tuo stato è stato impostato",
                fields: [{
                    name: "😎┆Stato",
                    value: `\`\`\`${status}\`\`\``,
                    inline: true,
                }],
                type: 'editreply'
            }, interaction);
        } else {
            return client.errNormal({
                error: "nessun profilo trovato! apri un profilo con createprofile",
                type: 'editreply'
            }, interaction);
        }
    })
}