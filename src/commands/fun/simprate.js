module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `👀・Quanto sei simp?`,
        desc: `${result}%`,
        type: 'editreply'
    }, interaction)
}

 