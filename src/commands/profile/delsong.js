const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const song = interaction.options.getString('song');
    const user = {User: interaction.user.id}

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Songs) {
                if (!data.Songs.includes(song)) {
                    return client.errNormal({
                        error: `quella canzone non esiste nel database!`,
                        type: 'editreply'
                    }, interaction);
                }

                const filtered = data.Songs.filter((target) => target !== song);

                await Schema.findOneAndUpdate(user, {
                    Songs: filtered
                });
            }
            client.succNormal({
                text: "Canzone rimossa",
                fields: [{
                    name: "🎶┆Canzone",
                    value: `\`\`\`${song}\`\`\``,
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