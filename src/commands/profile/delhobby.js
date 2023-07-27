const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const hobby = interaction.options.getString('hobby');
    const user = {User: interaction.user.id}

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Hobbys) {
                if (!data.Hobbys.includes(hobby)) {
                    return client.errNormal({
                        error: `quel hobby non esiste nel database!`,
                        type: 'editreply'
                    }, interaction);
                }

                const filtered = data.Hobbys.filter((target) => target !== hobby);

                await Schema.findOneAndUpdate(user, {
                    Hobbys: filtered
                });
            }
            client.succNormal({
                text: "Hobby rimosso",
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