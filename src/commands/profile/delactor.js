const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const actor = interaction.options.getString('actor');
    const user = {User: interaction.user.id}

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Actors) {
                if (!data.Actors.includes(actor)) {
                    return client.errNormal({
                        error: `quell'attore non esiste nel database!`,
                        type: 'editreply'
                    }, interaction);
                }

                const filtered = data.Actors.filter((target) => target !== actor);

                await Schema.findOneAndUpdate(user, {
                    Actors: filtered
                });
            }
            client.succNormal({
                text: "Attore rimosso",
                fields: [{
                    name: "👨‍🎤┆Attore",
                    value: `\`\`\`${actor}\`\`\``,
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