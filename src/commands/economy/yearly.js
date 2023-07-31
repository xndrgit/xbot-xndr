const Schema = require("../../database/models/economy");
const Schema2 = require("../../database/models/economyTimeout");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;
    let timeout = 31557600000; // 1 anno in millisecondi
    let amount = 5000; // quantità di denaro della ricompensa annuale

    // recupera i dati dell'utente dal database
    Schema2.findOne({Guild: interaction.guild.id, User: user.id}, async (err, dataTime) => {
        if (dataTime && dataTime.Yearly !== null && timeout - (Date.now() - dataTime.Yearly) > 0) {
            // se l'utente ha già raccolto la ricompensa annuale, invia un messaggio di errore con il tempo rimanente
            let time = (dataTime.Yearly / 1000 + timeout / 1000).toFixed(0);
            return client.errWait({
                time: time,
                type: 'editreply'
            }, interaction);
        } else {
            // se l'utente non ha ancora raccolto la ricompensa annuale, invia un messaggio di successo e aggiungi il denaro al suo account
            client.succNormal({
                text: `Hai raccolto la tua ricompensa annuale di **${client.emotes.economy.coins} $${amount}**`,
                type: 'editreply'
            }, interaction);

            client.succNormal({
                text: `Hai raccolto la tua ricompensa annuale!`,
                fields: [
                    {
                        name: `${client.emotes.economy.coins}┆Guadagnato`,
                        value: `$${amount}`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction);

            // aggiorna i dati dell'utente nel database
            if (dataTime) {
                dataTime.Yearly = Date.now();
                dataTime.save();
            } else {
                new Schema2({
                    Guild: interaction.guild.id,
                    User: user.id,
                    Yearly: Date.now()
                }).save();
            }

            // aggiungi la quantità di denaro al conto dell'utente
            client.addMoney(interaction, user, amount);
        }
    })
}