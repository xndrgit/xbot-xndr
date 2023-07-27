const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const age = interaction.options.getNumber('number');

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {
            if (isNaN(age)) return client.errNormal({
                error: "numero non valido fornito",
                type: 'editreply'
            }, interaction)

            data.Age = age;
            data.save();

            client.succNormal({
                text: "La tua età è stata impostata",
                fields: [{
                    name: "📆┆Età",
                    value: `\`\`\`${age}\`\`\``,
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