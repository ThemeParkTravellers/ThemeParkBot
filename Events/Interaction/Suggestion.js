const {
    ButtonInteraction,
    Permissions
} = require("discord.js");
const DB = require("../../Structures/Schemas/SuggestDB");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {

        if (!interaction.isButton()) return;

        const {
            guildId,
            customId,
            message,
            member
        } = interaction;

        const SuggestAnwsers = ["suggest-accept", "suggest-decline"];

        if(!SuggestAnwsers.includes(customId)) return;

        if (!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && SuggestAnwsers.includes(customId))
            return interaction.reply({
                content: "You cannot use this button",
                ephemeral: true
            });

        if (SuggestAnwsers.includes(customId))
            DB.findOne({
                GuildID: guildId,
                MessageID: message.id
            }, async (err, data) => {
                if (err) throw err;
                if (!data) return interaction.reply({
                    content: "No data was found in the database",
                    ephemeral: true
                });

                const Embed = message.embeds[0];
                if (!Embed) return;

                switch (customId) {
                    case "suggest-accept": {
                        Embed.fields[2] = {
                            name: "Status",
                            value: "Accepted",
                            inline: true
                        };
                        message.edit({
                            embeds: [Embed.setColor("GREEN")],
                            components: []
                        });
                        return interaction.reply({
                            content: "Suggestion Accepted",
                            ephemeral: true
                        });
                    }
                    case "suggest-decline": {
                        Embed.fields[2] = {
                            name: "Status",
                            value: "Declined",
                            inline: true
                        };
                        message.edit({
                            embeds: [Embed.setColor("RED")],
                            components: []
                        });
                        return interaction.reply({
                            content: "Suggestion Declined",
                            ephemeral: true
                        });
                    }
                }
            })
    }
}