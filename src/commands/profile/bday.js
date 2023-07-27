const Schema = require('../../database/models/profile');

module.exports = async (client, interaction) => {

    const joined = interaction.options.getString('bday');
    const split = joined.trim().split("/");

    let [day, month] = split;

    if (!day || !month) return client.errUsage({usage: "setbday [giorno]/[mese]", type: 'editreply'}, interaction);

    if (isNaN(day) || isNaN(month)) {
        return client.errNormal({
            error: "la data che hai fornito non è un numero valido",
            type: 'editreply'
        }, interaction);
    }

    day = parseInt(day);
    month = parseInt(month);

    if (!day || day > 31) return client.errNormal({
        error: "formato del giorno errato!",
        type: 'editreply'
    }, interaction);
    if (!month || month > 12) return client.errNormal({
        error: "formato del mese errato!",
        type: 'editreply'
    }, interaction);

    const bday = `${day}/${month}`;

    Schema.findOne({User: interaction.user.id}, async (err, data) => {
        if (data) {
            data.Birthday = bday;
            data.save();

            client.succNormal({
                text: "La tua data di compleanno è stata impostata",
                fields: [{
                    name: "🎂┆Compleanno",
                    value: `\`\`\`${bday}\`\`\``,
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