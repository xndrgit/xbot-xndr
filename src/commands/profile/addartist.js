const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const artist = interaction.options.getString('artist');

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Artists) {
                if (data.Artists.includes(artist)) {
                    return client.errNormal({
                        error: `questo artista è già presente nel tuo database!`,
                        type: 'editreply'
                    }, interaction);
                }
                data.Artists.push(artist);
                data.save();
            } else {
                data.Artists = artist;
                data.save();
            }
            client.succNormal({
                text: "Aggiunto il tuo artista",
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