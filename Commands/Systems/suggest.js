const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const DB = require("../../Structures/Schemas/SuggestDB.js");

module.exports = {
    name: "suggest",
    description: "Suggest a command for the bot to add.",
    permission: "SEND_MESSAGES",
    options: [
        {
            name: "type",
            description: "The type of suggestion.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Command",
                    value: "Command"
                },
                {
                    name: "Channels",
                    value: "Channels"
                },
                {
                    name: "Animation",
                    value: "Animation"
                },
                {
                    name: "Other",
                    value: "Other"
                }
            ]
        },
        {
            name: "suggestion",
            description: "The suggestion to be made.",
            type: "STRING",
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guildId, member, user } = interaction;

        const Type = options.getString("type");
        const Suggestion = options.getString("suggestion");

        const Embed = new MessageEmbed()
        .setColor('NAVY')
        .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({dynamic: true}) })
        .addFields(
            {
                name: "Suggestion",
                value: Suggestion,
                inline: false
            },
            {
                name: "Type",
                value: Type,
                inline: true
            },
            {
                name: "Status",
                value: "Pending",
                inline: true
            }
        )

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton().setCustomId("suggest-accept").setLabel("✅ Accept").setStyle("PRIMARY"),
            new MessageButton().setCustomId("suggest-decline").setLabel("⛔ Decline").setStyle("SECONDARY")
        )

        try {

            const M = await interaction.reply({ embeds: [Embed], components: [Buttons], fetchReply: true });

            DB.create({GuildID: guildId, MessageID: M.id, Details: [
                {
                    MemberID: member.id,
                    Type: Type,
                    Suggestion: Suggestion
                }
            ]})

        } catch (err) {
            console.log(err);
        }
    }
}