const Discord = require('discord.js');

const Schema = require("../../database/models/reactionRoles");

module.exports = async (client, interaction, args) => {
    const category = interaction.options.getString('category');
    const role = interaction.options.getRole('role');
    const emoji = interaction.options.getString('emoji');

    const parsedEmoji = Discord.parseEmoji(emoji);
    if (!parsedEmoji) return client.errNormal({
        error: `emoji non trovato in questo server!`,
        type: 'editreply'
    }, interaction);

    Schema.findOne({Guild: interaction.guild.id, Category: category}, async (err, data) => {
        if (data) {
            data.Roles[emoji] = [
                role.id,
                {
                    id: parsedEmoji.id,
                    raw: emoji
                }
            ];

            await Schema.findOneAndUpdate({Guild: interaction.guild.id, Category: category}, data);
        } else {
            new Schema({
                Guild: interaction.guild.id,
                Message: 0,
                Category: category,
                Roles: {
                    [emoji]: [
                        role.id,
                        {
                            id: parsedEmoji.id,
                            raw: emoji
                        }
                    ]
                }
            }).save();
        }

        client.succNormal({
            text: "Ruolo di reazione creato con successo! Crea un pannello nel seguente modo",
            fields: [
                {
                    name: `📘┆Pannello del Menu`,
                    value: `\`/reactionroles menu [nome categoria]\``,
                    inline: true
                },
                {
                    name: `📘┆Pannello dei Pulsanti`,
                    value: `\`/reactionroles button [nome categoria]\``,
                    inline: true
                }
            ],
            type: 'editreply'
        }, interaction);
    });
};