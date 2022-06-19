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

        //https://discord.com/api/webhooks/987697562561675295/3Qr0v4O6laqPZTFOW44_lG2XK-1ta4Qj-eBnBC65L1QllyuyQLubPn63ATayzuqmt-oI
        const Welcomer = new WebhookClient({
            id: "987697562561675295",
            token: "3Qr0v4O6laqPZTFOW44_lG2XK-1ta4Qj-eBnBC65L1QllyuyQLubPn63ATayzuqmt-oI"
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