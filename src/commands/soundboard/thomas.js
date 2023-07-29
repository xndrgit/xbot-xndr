module.exports = async (client, interaction, args) => {

    if (!interaction.member.voice.channel) return client.errNormal({
        error: `Non sei in un canale vocale!`,
        type: 'editreply'
    }, interaction);

    if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id) return client.errNormal({
        error: `Non sei nello stesso canale vocale!`,
        type: 'editreply'
    }, interaction);

    client.soundboard(interaction.guild.id, interaction, "https://www.myinstants.com/media/sounds/thomas.mp3");

    client.succNormal({text: "Soundboard avviata! Riproducendo **thomas**", type: 'editreply'}, interaction);
};