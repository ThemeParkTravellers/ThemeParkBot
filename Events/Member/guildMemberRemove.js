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
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    async execute(member) {
        const {
            user,
            guild
        } = member;


        const Logger = new WebhookClient({
            id: "987697562561675295",
            token: "3Qr0v4O6laqPZTFOW44_lG2XK-1ta4Qj-eBnBC65L1QllyuyQLubPn63ATayzuqmt-oI"
        });

        await Logger.edit({
            name: user.username,
            avatar: user.avatarURL({
                dynamic: true,
                size: 512
            })
        })

        const Log = new MessageEmbed()
            .setColor("RED")
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
            ${member} has left the community\n
            Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\n
            Latest Member Count: **${guild.memberCount}**`)
            .setFooter({
                text: `ID: ${user.id}`
            })

        Logger.send({
            embeds: [Log]
        });

        const MemberCountChannel = channels.cache.find(c => c.id === MemberCountChannelID);
        const BotCountChannel = channels.cache.find(c => c.id === BotCountChannelID);

        MemberCountChannel.setName(`👦 Membres : ${members.cache.filter((m) => !m.user.bot).size}`);
        BotCountChannel.setName(`🤖 Bots : ${members.cache.filter((m) => m.user.bot).size}`);
    }
}