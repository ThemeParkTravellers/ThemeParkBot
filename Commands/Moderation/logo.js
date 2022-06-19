const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "logo",
    description: "Changes the logo of the server.",
    permission: "MANAGE_GUILD",
    options: [
        {
            name: "url",
            description: "The url of the logo.",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guild } = interaction;

        const logoURL = options.getString("url");

        function isValidHttpUrl(string) {
            let url;
            try {
                url = new URL(string);
            } catch (_) {
                return false;
            }
            return url.protocol === "http:" || url.protocol === "https:";
        }

        if (!isValidHttpUrl(logoURL)) return interaction.reply({
            content: 'Invalid URL.',
            ephemeral: true
        });

        try {
            interaction.deferReply();
            await guild.setIcon(logoURL);
            return interaction.editReply({
                content: 'Successfully changed the server logo.'
            });
        } catch (e) {
            console.log(e);
            return interaction.reply({
                content: 'There was an error while changing the server logo.',
                ephemeral: true
            });
        }
    }
}