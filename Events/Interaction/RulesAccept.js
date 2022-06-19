const {
    ButtonInteraction,
    Permissions
} = require("discord.js");
const {
    MemberRoleID
} = require("../../Structures/config.json")

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {

        if (!interaction.isButton()) return;

        const {
            guild,
            customId,
            member
        } = interaction;

        const RulesAnswers = ["rules-accept"];

        if(!RulesAnswers.includes(customId)) return;

        let role = guild.roles.cache.find(r => r.id === MemberRoleID);

        try {
            await member.roles.add(role);
            return interaction.reply({
                content: "You have accepted the rules",
                ephemeral: true
            })
        } catch (err) {
            console.log(err);
        }
    }
}