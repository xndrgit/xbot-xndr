module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `💨・Quanto puzzi?`,
        desc: `Puzzi al ${result}% `,
        type: 'editreply'
    }, interaction)
}

 