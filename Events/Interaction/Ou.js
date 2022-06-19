const {
    ButtonInteraction,
    Permissions
} = require("discord.js");
const DB = require("../../Structures/Schemas/OuDB");

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

        const OuAnswers = ["Ou-accept", "Ou-decline"];

        if(!OuAnswers.includes(customId)) return;

        if (!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && OuAnswers.includes(customId))
            return interaction.reply({
                content: "You cannot use this button",
                ephemeral: true
            });

        DB.findOne({
            GuildID: guildId,
            AnswerID: message.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) return interaction.reply({
                content: "No data was found in the database",
                ephemeral: true
            });

            const Embed = message.embeds[0];
            if (!Embed) return;

            switch (customId) {
                case "Ou-accept": {
                    Embed.fields[1] = {
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
                case "Ou-decline": {
                    Embed.fields[1] = {
                        name: "Status",
                        value: "Declined",
                        inline: true
                    };
                    message.edit({
                        embeds: [Embed.setColor("RED")],
                        components: []
                    });
                    DB.deleteOne({
                        GuildID: guildId,
                        AnswerID: message.id
                    }, (err) => {
                        if (err) throw err;
                    })
                    return interaction.reply({
                        content: "Suggestion Declined",
                        ephemeral: true
                    });
                }
            }
        })
    }
}