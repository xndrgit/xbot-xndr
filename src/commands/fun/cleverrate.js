module.exports = async (client, interaction, args) => {

    var result = Math.ceil(Math.random() * 40) * 5 + 100;

    client.embed({
        title: `💡・IQ Test`,
        desc: `Your IQ score is ${result}!`,
        type: 'editreply'
    }, interaction)
}

 