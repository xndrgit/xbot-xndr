const Discord = require('discord.js');

const Schema = require("../../database/models/suggestionChannels");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const messageID = interaction.options.getString('id');

    const data = await Schema.findOne({Guild: interaction.guild.id});
    if (data) {
        const suggestionChannel = interaction.guild.channels.cache.get(data.Channel);
        const suggestEmbed = await suggestionChannel.messages.fetch(messageID);
        const embedData = suggestEmbed.embeds[0];

        client.embed({
            title: `${client.emotes.normal.check}・Suggerimento accettato`,
            desc: `\`\`\`${embedData.description}\`\`\``,
            color: client.config.colors.success,
            author: {
                name: embedData.author.name,
                iconURL: embedData.author.iconURL
            },
            type: 'edit'
        }, suggestEmbed)

        try {
            const user = await client.users.cache.find((u) => u.tag === embedData.author.name);

            if (user) {
                client.embed({
                    title: `${client.emotes.normal.check}・Suggerimento accettato`,
                    desc: `Il tuo suggerimento in ${interaction.guild.name} è stato accettato da un moderatore!`,
                    fields: [
                        {
                            name: `💬┆Suggerimento`,
                            value: `${embedData.description}`
                        }
                    ],
                }, user).catch({})
            }
        } catch {
        }

        client.succNormal({
            text: "Suggerimento accettato con successo",
            fields: [
                {
                    name: `💬┆Suggerimento`,
                    value: `${embedData.description}`
                }
            ],
            type: 'editreply'
        }, interaction);
    } else {
        client.errNormal({
            error: `nessun canale per i suggerimenti impostato! per favore, esegui la configurazione`,
            type: 'editreply'
        }, interaction);
    }
}
