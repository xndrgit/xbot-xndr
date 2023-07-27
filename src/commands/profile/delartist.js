const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const artist = interaction.options.getString('artist');
    const user = {User: interaction.user.id}

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Artists) {
                if (!data.Artists.includes(artist)) {
                    return client.errNormal({
                        error: `quell'artista non esiste nel database!`,
                        type: 'editreply'
                    }, interaction);
                }

                const filtered = data.Artists.filter((target) => target !== artist);

                await Schema.findOneAndUpdate(user, {
                    Artists: filtered
                });
            }
            client.succNormal({
                text: "Artista rimosso",
                fields: [{
                    name: "🎤┆Artista",
                    value: `\`\`\`${artist}\`\`\``,
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