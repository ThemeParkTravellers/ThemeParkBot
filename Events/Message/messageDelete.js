const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} message 
     */
    execute(message) {
        if(message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📕 A [message](${message.url}) by ${message.author.tag} was **deleted**.\n
        **Deleted Message:**:\n \`\`\`\n ${message.content ? message.content : "None" } \n\`\`\` `.slice(0, 4096));

        if(message.attachments.size >= 1) {
            Log.addField("Attachments", `${message.attachments.map(a => a.url)}`, true);
        }

        new WebhookClient({
            url: 'your webhook url here'
        }).send({embeds: [Log]}).catch((err) => console.log(err));
    }
}
