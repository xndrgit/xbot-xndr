const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const country = interaction.options.getString('country');

    if (country.length > 50) return client.errNormal({
        error: "il tuo Paese di origine non può superare i 50 caratteri",
        type: 'editreply'
    }, interaction);

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {
            data.Orgin = country;
            data.save();

            client.succNormal({
                text: "La tua origine è stata impostata",
                fields: [{
                    name: "🌍┆Paese",
                    value: `\`\`\`${country}\`\`\``,
                    inline: true,
                }],
                type: 'editreply'
            }, interaction);
        } else {
            return client.errNormal({
                error: "nessun profilo trovato! apri un profilo con il comando createprofile",
                type: 'editreply'
            }, interaction);
        }
    })
}