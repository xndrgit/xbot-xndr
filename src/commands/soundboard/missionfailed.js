module.exports = async (client, interaction, args) => {

    if (!interaction.member.voice.channel) return client.errNormal({
        error: `non sei in un canale vocale!`,
        type: 'editreply'
    }, interaction);

    if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id) return client.errNormal({
        error: `non sei nello stesso canale vocale!`,
        type: 'editreply'
    }, interaction);

    client.soundboard(interaction.guild.id, interaction, "https://www.myinstants.com/media/sounds/dank-meme-compilation-volume-17_cutted.mp3");

    client.succNormal({text: "Soundboard avviata! Riproducendo **mission failed**", type: 'editreply'}, interaction);
};