const Schema = require('../../database/models/profile');
const isHexcolor = require('is-hexcolor');

module.exports = async (client, interaction) => {

    const color = interaction.options.getString('color');

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {
            if (!isHexcolor(color)) return client.errNormal({
                error: "non hai specificato un colore esadecimale! esempio: #ff0000",
                type: 'editreply'
            }, interaction);

            data.Color = color;
            data.save();

            client.succNormal({
                text: "Il tuo colore preferito è stato impostato",
                fields: [{
                    name: "🎨┆Colore",
                    value: `\`\`\`${color}\`\`\``,
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