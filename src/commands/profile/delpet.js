const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const pet = interaction.options.getString('pet');
    const user = {User: interaction.user.id}

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Pets) {
                if (!data.Pets.includes(pet)) {
                    return client.errNormal({
                        error: `quell'animale domestico non esiste nel database!`,
                        type: 'editreply'
                    }, interaction);
                }

                const filtered = data.Pets.filter((target) => target !== pet);

                await Schema.findOneAndUpdate(user, {
                    Pets: filtered
                });
            }
            client.succNormal({
                text: "Animale domestico rimosso",
                fields: [{
                    name: "🐶┆Animale domestico",
                    value: `\`\`\`${pet}\`\`\``,
                    inline: true,
                }],
                type: 'editreply'
            }, interaction);
        } else {
            return client.errNormal({
                error: "nessun profilo trovato! Apri un profilo con createprofile",
                type: 'editreply'
            }, interaction);
        }
    })

}