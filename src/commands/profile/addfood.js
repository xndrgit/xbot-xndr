const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const food = interaction.options.getString('food');

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Food) {
                if (data.Food.includes(food)) {
                    return client.errNormal({
                        error: `questo cibo è già presente nel tuo database!`,
                        type: 'editreply'
                    }, interaction);
                }
                data.Food.push(food);
                data.save();
            } else {
                data.Food = food;
                data.save();
            }
            client.succNormal({
                text: "Aggiunto il tuo cibo",
                fields: [{
                    name: "🥐┆Cibo",
                    value: `\`\`\`${food}\`\`\``,
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