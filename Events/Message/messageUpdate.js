const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageUpdate",
    /**
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     */
    execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return;

        if(oldMessage.content === newMessage.content) return;

        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > Count ? " ..." : "");
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > Count ? " ..." : "");

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📘 A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}.\n
        **Original**:\n \`\`\`\n ${Original} \n\`\`\` \n**Edited**:\n \`\`\`\n ${Edited} \n\`\`\` `)
        .setFooter({ text: `Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}` });

        new WebhookClient({
            url: 'https://discord.com/api/webhooks/987660815215771708/x9Ce6FLP3920gp1Ce-gGESfzcf6qTlIiqeYlb2gFwQJCbYN9jKZTgR5ev9q_EEDKK7We'
        }).send({embeds: [Log]}).catch((err) => console.log(err));
    }
}