const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const song = interaction.options.getString('song');

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Songs) {
                if (data.Songs.includes(song)) {
                    return client.errNormal({
                        error: `questa canzone è già presente nel tuo database!`,
                        type: 'editreply'
                    }, interaction);
                }
                data.Songs.push(song);
                data.save();
            } else {
                data.Songs = song;
                data.save();
            }
            client.succNormal({
                text: "Aggiunta la tua canzone",
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