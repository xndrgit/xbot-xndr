const fetch = require("node-fetch");
const generator = require('generate-password');

module.exports = async (client, interaction, args) => {

    const password = generator.generate({
        length: 10,
        symbols: true,
        numbers: true
    });

    const user = interaction.options.getUser('user');

    if (!user) return client.errUsage({usage: "hack [mention user]", type: 'editreply'}, interaction)

    function wait(ms) {
        let start = new Date().getTime();
        let end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }

    client.embed({
        title: '💻・Hacking',
        desc: `The hack on ${user} started...`,
        type: 'editreply'
    }, interaction).then(msg => {

        wait(340);
        client.embed({
            title: '💻・Hacking',
            desc: `Searching for user information..`,
            type: 'edit',
        }, msg).then(i => {

            wait(340);
            client.embed({
                title: '💻・Hacking',
                desc: `Searching for IP address...`,
                type: 'edit',
            }, msg).then(i => {

                wait(340);
                client.embed({
                    title: '💻・Hacking',
                    desc: `The users ip address was found!`,
                    fields: [
                        {
                            name: '🔗┆IP Adress',
                            value: `\`\`\`127.0.0.1\`\`\``,
                            inline: true,
                        }
                    ],
                    type: 'edit',
                }, msg).then(i => {

                    wait(260);
                    client.embed({
                        title: '💻・Hacking',
                        desc: `Searching for Discord login...`,
                        type: 'edit',
                    }, msg).then(i => {

                        wait(230);
                        client.embed({
                            title: '💻・Hacking',
                            desc: `The users discord login was found!`,
                            fields: [
                                {
                                    name: '📨┆Email',
                                    value: `\`\`\`${user.username}onDiscord@gmail.com\`\`\``
                                },
                                {
                                    name: '🔑┆Password',
                                    value: `\`\`\`${password}\`\`\``
                                }
                            ],
                            type: 'edit',
                        }, msg).then(i => {

                            wait(100);
                            client.embed({
                                title: '💻・Hacking',
                                desc: `Search for Discord token...`,
                                type: 'edit'
                            }, msg).then(i => {

                                wait(400);
                                fetch(`https://some-random-api.com/bottoken?${user.id}`).then((res) => res.json()).catch({}).then(async (json) => {
                                    client.embed({
                                        title: '💻・Hacking',
                                        desc: `The users discord account token was found!`,
                                        fields: [
                                            {
                                                name: '🔧┆Token',
                                                value: `\`\`\`${json.token}\`\`\``,
                                                inline: true
                                            }
                                        ],
                                        type: 'edit',
                                    }, msg).then(i => {

                                        wait(340);
                                        client.embed({
                                            title: '💻・Hacking',
                                            desc: `Reporting account to Discord for breaking TOS...`,
                                            type: 'edit',
                                        }, msg).then(i => {

                                            wait(380);
                                            client.succNormal({
                                                text: `${user} is succesfully hacked. All the user's information was send to your dm`,
                                                type: 'edit'
                                            }, msg);
                                            client.embed({
                                                title: 'Scherzavo ;p',
                                                image: "https://media.tenor.com/LkQzw7k5DV4AAAAd/anime-hacking.gif",
                                            }, interaction.user)
                                        })
                                    })
                                }).catch({})
                            })
                        })
                    })
                })
            })
        })
    })

}

 