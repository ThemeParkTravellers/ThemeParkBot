const {
    CommandInteraction,
    MessageEmbed
} = require("discord.js");
const DB = require('../../Structures/Schemas/OuDB');

module.exports = {
    name: "listedtc",
    description: "Returns a list of all your current DTCs",
    permission: "SEND_MESSAGES",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const {
            guildId,
            member
        } = interaction;

        const DTCs = await DB.find({
            GuildID: guildId,
            UserID: member.id
        });

        const DTCEmbed = new MessageEmbed()
            .setColor("NAVY")
            .setAuthor({
                name: member.user.tag,
                iconURL: member.displayAvatarURL({
                    dynamic: true
                })
            })
            .setTitle("Your DTCs");

        DTCs.forEach(DTC => {
            DTCEmbed.addField(`<t:${parseInt(DTC.Time)}:f>`, `\`\`\`${DTC.Message}\`\`\``);
        })

        if (DTCEmbed.fields.length === 0) {
            DTCEmbed.setDescription("You don't have any DTCs");
        }

        interaction.reply({
            embeds: [DTCEmbed]
        });
    }
}