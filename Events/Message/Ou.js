const {
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const DB = require("../../Structures/Schemas/OuDB");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message 
     * @returns 
     */
    async execute(message) {

        const {
            author,
            content,
            guildId,
            createdTimestamp
        } = message;

        if (author.bot) return;

        if (content.split(" ").includes("où" || "Où")) {
            const OuEmbed = new MessageEmbed()
                .setColor("RED")
                .setAuthor({
                    name: author.tag,
                    iconURL: author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .addFields({
                    name: "Message",
                    value: `\`\`\`${content}\`\`\``,
                    inline: false
                }, {
                    name: "Status",
                    value: "Pending",
                    inline: true
                })

            const Buttons = new MessageActionRow();
            Buttons.addComponents(
                new MessageButton().setCustomId("Ou-accept").setLabel("✅ Accept").setStyle("PRIMARY"),
                new MessageButton().setCustomId("Ou-decline").setLabel("⛔ Decline").setStyle("SECONDARY")
            )

            try {

                const M = await message.reply({
                    embeds: [OuEmbed],
                    components: [Buttons],
                    fetchReply: true
                });

                await DB.create({
                    GuildID: guildId,
                    UserID: author.id,
                    Time: parseInt(createdTimestamp / 1000),
                    Message: content,
                    AnswerID: M.id
                })

            } catch (err) {
                console.log(err);
            }

        }
    }
}