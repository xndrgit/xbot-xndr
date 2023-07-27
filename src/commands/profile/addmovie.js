const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const movie = interaction.options.getString('movie');

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {

            if (data && data.Movies) {
                if (data.Movies.includes(movie)) {
                    return client.errNormal({
                        error: `questo film è già presente nel tuo database!`,
                        type: 'editreply'
                    }, interaction);
                }
                data.Movies.push(movie);
                data.save();
            } else {
                data.Movies = movie;
                data.save();
            }
            client.succNormal({
                text: "Aggiunto il tuo film",
                fields: [{
                    name: "🎬┆Film",
                    value: `\`\`\`${movie}\`\`\``,
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