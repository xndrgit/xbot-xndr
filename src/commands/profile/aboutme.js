const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const aboutme = interaction.options.getString('text');

    if (aboutme.length > 1024) return client.errNormal({
        error: "la tua info non può essere più lunga di 1024 caratteri",
        type: 'editreply'
    }, interaction);

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {
            data.Aboutme = aboutme;
            data.save();

            client.succNormal({
                text: "La tua info è stata impostata",
                fields: [{
                    name: "📘┆Info",
                    value: `\`\`\`${aboutme}\`\`\``,
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