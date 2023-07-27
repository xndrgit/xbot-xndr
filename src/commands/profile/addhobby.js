const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const hobby = interaction.options.getString('hobby');

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Hobbys) {
                if (data.Hobbys.includes(hobby)) {
                    return client.errNormal({
                        error: `questo hobby è già presente nel tuo database!`,
                        type: 'editreply'
                    }, interaction);
                }
                data.Hobbys.push(hobby);
                data.save();
            } else {
                data.Hobbys = hobby;
                data.save();
            }
            client.succNormal({
                text: "Aggiunto il tuo hobby",
                fields: [{
                    name: "⚽┆Hobby",
                    value: `\`\`\`${hobby}\`\`\``,
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