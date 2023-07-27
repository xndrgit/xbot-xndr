const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    Schema.findOne({User: interaction.user.id}, async (err, data) => {

        if (data) {
            Schema.findOneAndDelete({Guild: interaction.guild.id, User: interaction.user.id}).then(() => {
                client.succNormal({
                    text: "Il tuo profilo è stato eliminato!",
                    type: 'editreply'
                }, interaction);
            })
        } else {
            client.errNormal({
                error: 'nessun profilo trovato!',
                type: 'editreply'
            }, interaction)
        }
    })
}