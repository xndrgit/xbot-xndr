const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const pet = interaction.options.getString('pet');

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Pets) {
                if (data.Pets.includes(pet)) {
                    return client.errNormal({
                        error: `questo animale domestico è già presente nel tuo database!`,
                        type: 'editreply'
                    }, interaction);
                }
                data.Pets.push(pet);
                data.save();
            } else {
                data.Pets = pet;
                data.save();
            }
            client.succNormal({
                text: "Aggiunto il tuo animale domestico",
                fields: [{
                    name: "🐶┆Animale Domestico",
                    value: `\`\`\`${pet}\`\`\``,
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