const {
    MessageEmbed, CommandInteraction, Client
} = require('discord.js');

module.exports = {
    name: 'resume',
    description: 'Resume the music',
    permission: 'CONNECT',
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
            const queue = await client.distube.getQueue(VoiceChannel);
            await queue.resume(VoiceChannel);
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(`▶️ | Music resumed.`)
                ]
            });
        } catch (e) {
            const errorEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`⛔ Alert: ${e.message}`)
            return interaction.reply({
                embeds: [errorEmbed]
            });
        }
    }
}