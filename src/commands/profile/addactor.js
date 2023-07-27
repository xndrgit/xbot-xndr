const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const actor = interaction.options.getString('actor');

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Actors) {
                if (data.Actors.includes(actor)) {
                    return client.errNormal({
                        error: `questo attore è già presente nel tuo database!`,
                        type: 'editreply'
                    }, interaction);
                }
                data.Actors.push(actor);
                data.save();
            } else {
                data.Actors = actor;
                data.save();
            }
            client.succNormal({
                text: "Aggiunto il tuo attore",
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