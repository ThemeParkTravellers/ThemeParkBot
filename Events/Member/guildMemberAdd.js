const {
    MessageEmbed,
    WebhookClient,
    GuildMember
} = require("discord.js");
const {
    MemberCountChannelID,
    BotCountChannelID
} = require("../../Structures/config.json");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    async execute(member) {
        const {
            user,
            guild
        } = member;

        const { channels, members } = guild;

        const Welcomer = new WebhookClient({
            id: "your webhook id here",
            token: "your webhook token here"
        });
        await Welcomer.edit({
            name: user.username,
            avatar: user.avatarURL({
                dynamic: true,
                size: 512
            })
        })

        const Welcome = new MessageEmbed()
            .setColor("AQUA")
            .setAuthor({
                name: user.tag,
                iconURL: user.avatarURL({
                    dynamic: true,
                    size: 512
                })
            })
            .setThumbnail(user.avatarURL({
                dynamic: true,
                size: 512
            }))
            .setDescription(`
            Welcome ${member} to the **${guild.name}**!\n
            Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
            Latest Member Count: **${guild.memberCount}**`)
            .setFooter({
                text: `ID: ${user.id}`
            })

        Welcomer.send({
            embeds: [Welcome]
        });

        const MemberCountChannel = channels.cache.find(c => c.id === MemberCountChannelID);
        const BotCountChannel = channels.cache.find(c => c.id === BotCountChannelID);

        MemberCountChannel.setName(`👦 Membres : ${members.cache.filter((m) => !m.user.bot).size}`);
        BotCountChannel.setName(`🤖 Bots : ${members.cache.filter((m) => m.user.bot).size}`);

    }
}
