const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const food = interaction.options.getString('food');
    const user = {User: interaction.user.id}

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Food) {
                if (!data.Food.includes(food)) {
                    return client.errNormal({
                        error: `quel cibo non esiste nel database!`,
                        type: 'editreply'
                    }, interaction);
                }

                const filtered = data.Food.filter((target) => target !== food);

                await Schema.findOneAndUpdate(user, {
                    Food: filtered
                });
            }
            client.succNormal({
                text: "Cibo rimosso",
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