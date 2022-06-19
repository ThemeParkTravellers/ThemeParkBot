const {
    MessageEmbed,
    CommandInteraction,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
    name: "rules",
    description: "Send the rules of the server in the selected channel.",
    permission: "MANAGE_MESSAGES",
    options: [{
        name: "channel",
        description: "The channel to send the rules in.",
        type: "CHANNEL",
        required: true
    }],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const {
            options
        } = interaction;
        const channel = options.getChannel("channel");

        const Rules1 = new MessageEmbed()
            .setColor("NAVY")
            .setTitle("Règlement du serveur")
            .setDescription("Merci de lire et respecter ce règlement. Tout manquement pourrait être sanctionné.")
            .addFields({
                name: "Respect",
                value: `Au niveau du respect, il est interdit :
                -De tenir des propos racistes, homophobes, etc.
                -De mentionner massivement quelqu'un, quelque soit le motif
                -D'avoir un pseudo ou une photo de profil qui pourrait offenser quelqu'un
                
                Les insultes comme le flood ne sont pas appréciés ici, merci d'en utiliser le moins possible, voire pas du tout 😉`
            }, {
                name: "Publicité",
                value: `Toute forme de publicité est interdite, sauf cas exceptionnels.
                Demander à <@&881142340276846622>`
            }, {
                name: "Autres",
                value: `Évitez un maximum les conflits et règlements de comptes, ici on prône la bonne humeur 😛
                Les débats politiques ne sont pas non plus appréciés ici. Vous êtes libres de penser ce que vous voulez, mais merci de ne pas l'exposer ici.`
            })

        const Rules2 = new MessageEmbed()
            .setColor("NAVY")
            .setTitle("Accès au serveur")
            .setDescription(`Merci d'avoir lu le règlement !
            Tu peux maintenant discuter avec les autres membres en toute sérénité 😉`)

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton().setCustomId("rules-accept").setLabel("✅ Accept").setStyle("PRIMARY")
        )

        channel.send({
            content: `Bienvenue dans le serveur Theme Park Travellers!
Ici, tu peux discuter, débattre, t'amuser, bref c'est quand même un super endroit 😀
Alors aide nous à le garder super, en respectant ces quelques petites règles 😉`,
            embeds: [Rules1, Rules2],
            components: [Buttons],
            fetchReply: true
        });
    }
}