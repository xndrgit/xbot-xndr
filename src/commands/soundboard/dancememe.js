module.exports = async (client, interaction, args) => {

    if (!interaction.member.voice.channel) return client.errNormal({
        error: `non sei in un canale vocale!`,
        type: 'editreply'
    }, interaction);

    if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id) return client.errNormal({
        error: `non sei nello stesso canale vocale!`,
        type: 'editreply'
    }, interaction);

    client.soundboard(interaction.guild.id, interaction, "https://www.myinstants.com/media/sounds/y2mate-mp3cut_sRzY6rh.mp3");

    client.succNormal({text: "Soundboard avviata! Riproducendo **meme della danza**", type: 'editreply'}, interaction);
};