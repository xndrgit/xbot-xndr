module.exports = async (client, interaction, args) => {

    var result = Math.floor(Math.random() * 21) * 5 + 100;

    client.embed({
        title: `💡・IQ Test`,
        desc: `il tuo IQ è di **${result}** !`,
        type: 'editreply'
    }, interaction)
}

 