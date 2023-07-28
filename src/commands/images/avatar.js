module.exports = async (client, interaction, args) => {
    const user = interaction.options.getUser('user') || interaction.user;

    client.embed({
        title: `🖼️・Avatar dell'utente`,
        image: user.displayAvatarURL({dynamic: false, size: 1024}),
        type: 'editreply'
    }, interaction)
}
