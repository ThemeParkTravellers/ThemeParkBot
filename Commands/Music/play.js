
const {
    MessageEmbed, CommandInteraction, Client
} = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Play a song',
    permission: 'CONNECT',
    options: [
        {
            name: 'query',
            description: 'Provide a name or a url for the song.',
            type: 'STRING',
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute(interaction, client) {
        const {
            options,
            member,
            guild,
            channel
        } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel)
            return interaction.reply({
                content: "You must be in a voice channel to be able to use the music commands.",
                ephemeral: true
            });

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
            return interaction.reply({
                content: `I'm already playing music in <#${guild.me.voice.channelId}>.`,
                ephemeral: true
            });

        try {
            interaction.client.distube.play(VoiceChannel, options.getString('query'), {
                textChannel: channel,
                member: member
            });
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`🎶 | Song added to queue!`)
                ]
            });
        } catch (e) {
            console.log(e)
            const errorEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`⛔ Alert: ${e.message}`)
            return interaction.reply({
                embeds: [errorEmbed]
            });
        }
    }
}