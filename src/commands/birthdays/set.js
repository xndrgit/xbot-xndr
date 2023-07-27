const Discord = require('discord.js');

const Schema = require("../../database/models/birthday");

module.exports = async (client, interaction, args) => {
    const months = {
        1: "Gennaio",
        2: "Febbraio",
        3: "Marzo",
        4: "Aprile",
        5: "Maggio",
        6: "Giugno",
        7: "Luglio",
        8: "Agosto",
        9: "Settembre",
        10: "Ottobre",
        11: "Novembre",
        12: "Dicembre"
    };

    const day = interaction.options.getNumber('day');
    const month = interaction.options.getNumber('month');

    if (!day || day > 31) return client.errNormal({
        error: "formato del giorno errato!",
        type: 'editreply'
    }, interaction);

    if (!month || month > 12) return client.errNormal({
        error: "formato del mese errato!",
        type: 'editreply'
    }, interaction);

    const convertedDay = suffixes(day);
    const convertedMonth = months[month];
    const birthdayString = `${convertedDay} di ${convertedMonth}`;

    Schema.findOne({Guild: interaction.guild.id, User: interaction.user.id}, async (err, data) => {
        if (data) {
            data.Birthday = birthdayString;
            data.save();
        } else {
            new Schema({
                Guild: interaction.guild.id,
                User: interaction.user.id,
                Birthday: birthdayString
            }).save();
        }
    })

    client.succNormal({
        text: `Compleanno inserito con successo!`,
        fields: [
            {
                name: `${client.emotes.normal.birthday}┆Compleanno`,
                value: `${birthdayString}`
            }
        ],
        type: 'editreply'
    }, interaction);
}

function suffixes(number) {
    const converted = number.toString();

    const lastChar = converted.charAt(converted.length - 1);

    return lastChar == "1" ?
        `${converted}st` : lastChar == "2" ?
            `${converted}nd` : lastChar == '3'
                ? `${converted}rd` : `${converted}th`
}

 