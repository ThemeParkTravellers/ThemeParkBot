const {
    MessageEmbed, CommandInteraction, Client
} = require('discord.js');

module.exports = {
    name: 'options',
    description: 'Options for the music commands.',
    permission: 'CONNECT',
    options: [
        {
            name: 'loop',
            description: 'Set the loop mode.',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'mode',
                    description: 'Select a mode.',
                    type: 'STRING',
                    required: true,
                    choices: [
                        {
                            name: 'off',
                            value: 'off'
                        },
                        {
                            name: 'song',
                            value: 'song'
                        },
                        {
                            name: 'queue',
                            value: 'queue'
                        }
                    ]
                }
            ]
        },
        {
            name: 'volume',
            description: 'Set the volume.',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'percent',
                    description: '10 = 10%',
                    type: 'INTEGER',
                    required: true,
                }
            ]
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
            switch (options.getSubcommand()) {
                case 'loop': {
                    switch (options.getString('mode')) {
                        case 'off': {
                            await client.distube.setRepeatMode(VoiceChannel, 0);
                        }
                        case 'song': {
                            await client.distube.setRepeatMode(VoiceChannel, 1);
                        }
                        case 'queue': {
                            await client.distube.setRepeatMode(VoiceChannel, 2);
                        }
                    }
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`🔁 | Loop mode set to \`${options.getString('mode')}\``)
                        ]
                    });
                }
                case 'volume': {
                    const Volume = options.getInteger('percent');
                    if (Volume < 1 || Volume > 100)
                        return interaction.reply({
                            embeds: [new MessageEmbed()
                                .setColor("RED")
                                .setDescription(`🔇 | Volume must be between 1 and 100.`)
                            ]
                        });

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`📶 | Volume has been set to \`${Volume}%\``)
                        ]
                    });
                }
            }
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