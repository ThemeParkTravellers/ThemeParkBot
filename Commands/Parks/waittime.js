const {
    CommandInteraction,
    MessageEmbed
} = require("discord.js");
const DLPDB = require("../../Structures/Schemas/DLPDB");
const WDSDB = require("../../Structures/Schemas/WDSDB");
const {
    updateDatabase,
    //Embed functions
    addEmbedFieldsLands,
    //Arrays
    Railroad
} = require("../../Systems/DisneySys");

function sortRides(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
}

module.exports = {
    name: "waittime",
    description: "Get the wait time for a theme park",
    permission: "SEND_MESSAGES",
    options: [{
        name: "park",
        description: "The theme park to get the wait time for",
        type: "STRING",
        required: true,
        choices: [{
                name: "Disneyland Park",
                value: "Disneyland Park"
            },
            {
                name: "Walt Disney Studios",
                value: "Walt Disney Studios"
            },
            {
                name: "Disneyland Railroad",
                value: "Disneyland Railroad"
            }
        ]
    }],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {

        const {
            options,
            reply
        } = interaction;

        await interaction.deferReply();

        await updateDatabase();
        switch (options.getString('park')) {
            case "Disneyland Park": {

                const DiscoEmbed = new MessageEmbed()
                    .setColor('#0a00ff')
                    .setTitle('Discoveryland')
                    .setThumbnail('https://media.disneylandparis.com/d4th/fr-fr/images/N036714_2022sep28_world_discoveryland-master-visual_16-9_tcm808-234331.jpg')

                const FrontierEmbed = new MessageEmbed()
                    .setColor('#8B4513')
                    .setTitle('Frontierland')
                    .setThumbnail('https://media.disneylandparis.com/d4th/fr-fr/images/N036879_2022sep28_frontierland-master-visual_16-9_tcm808-234328.jpg')

                const FantasyEmbed = new MessageEmbed()
                    .setColor('#FF69B4')
                    .setTitle('Fantasyland')
                    .setThumbnail('https://media.disneylandparis.com/d4th/fr-fr/images/N036715_2022jun10_fantasyland-master-visual_16-9_tcm808-234330.jpg')

                const AdventureEmbed = new MessageEmbed()
                    .setColor('#A9A9A9')
                    .setTitle('Adventureland')
                    .setThumbnail('https://media.disneylandparis.com/d4th/fr-fr/images/N036712_2022jun10_world_adventureland-master-visual_16-9_tcm808-234332.jpg')


                const DLPRides = await DLPDB.find({});

                const DiscoRides = DLPRides.filter(ride => ride.id.startsWith('P1D') && !Railroad.includes(ride.id));
                DiscoRides.sort((a,b) => sortRides(a,b));
                addEmbedFieldsLands(DiscoEmbed, DiscoRides);

                const FrontierRides = DLPRides.filter(ride => ride.id.startsWith('P1R') && !Railroad.includes(ride.id));
                FrontierRides.sort((a,b) => sortRides(a,b));
                addEmbedFieldsLands(FrontierEmbed, FrontierRides);7

                const AdventureRides = DLPRides.filter(ride => ride.id.startsWith('P1A') && !Railroad.includes(ride.id));
                AdventureRides.sort((a,b) => sortRides(a,b));
                addEmbedFieldsLands(AdventureEmbed, AdventureRides);

                const FantasyRides = DLPRides.filter(ride => ride.id.startsWith('P1N') && !Railroad.includes(ride.id));
                FantasyRides.sort((a,b) => sortRides(a,b));
                addEmbedFieldsLands(FantasyEmbed, FantasyRides);
                
                try {
                    return interaction.editReply({
                        embeds: [DiscoEmbed, FrontierEmbed, FantasyEmbed, AdventureEmbed]
                    });
                } catch (e) {
                    console.log(e);
                }
            }
            case "Walt Disney Studios": {

                const ToonEmbed = new MessageEmbed()
                    .setColor('#49beab')
                    .setTitle('Toon Backlot')
                    .setThumbnail('https://media.disneylandparis.com/d4th/fr-fr/images/N034001_2027jun24_world_animation-celebration_5-2_tcm808-235166.jpg?')

                const ToyEmbed = new MessageEmbed()
                    .setColor('#6e895e')
                    .setTitle('Toy Story Playland')
                    .setThumbnail('https://www.ed92.org/wp-content/uploads/2021/08/toy_story_playland-1024x682.jpg')

                const RemyEmbed = new MessageEmbed()
                    .setColor('#fbbb72')
                    .setTitle('La Place de Rémy')
                    .setThumbnail('https://media.disneylandparis.com/d4th/fr-fr/images/n017729_2050jan01_ratatouille-laventure-completement-toquee_16-9_tcm808-159400.jpg')

                const ProdEmbed = new MessageEmbed()
                    .setColor('#666cfb')
                    .setTitle('Production Courtyard')
                    .setThumbnail('https://media.disneylandparis.com/d4th/fr-fr/images/n006536_2021des31_world_tower-of-terror-night-outside_16-9_tcm808-194178.jpg')

                const ACEmbed = new MessageEmbed()
                    .setColor("NAVY")
                    .setTitle("Avengers Campus")
                    .setThumbnail("https://media.disneylandparis.com/d4th/en-us/images/hd16242_2050dec31_world_avengers-campus-key-visual_16-9_tcm795-236755.jpg")


                const ToonRidesId = ["P2XA02", "P2XA00", "P2XA05", "P2XA03"];
                const ToyRidesId = ["P2XA06", "P2XA08", "P2XA07"];
                //const RemyRideId = ["P2XA09"];

                const WDSRides = await WDSDB.find({});

                const ToonRides = WDSRides.filter(ride => ToonRidesId.includes(ride.id));
                ToonRides.sort((a,b) => sortRides(a,b));
                addEmbedFieldsLands(ToonEmbed, ToonRides);

                const ToyRides = WDSRides.filter(ride => ToyRidesId.includes(ride.id));
                ToyRides.sort((a,b) => sortRides(a,b));
                addEmbedFieldsLands(ToyEmbed, ToyRides);

                const RemyRides = await WDSDB.find({id: 'P2XA09'});
                RemyRides.sort((a,b) => sortRides(a,b));
                addEmbedFieldsLands(RemyEmbed, RemyRides);

                const ProdRides = WDSRides.filter(ride => ride.id.startsWith('P2Z'));
                ProdRides.sort((a,b) => sortRides(a,b));
                addEmbedFieldsLands(ProdEmbed, ProdRides);

                const ACRides = WDSRides.filter(ride => ride.id.startsWith('P2AC'));
                ACRides.sort((a,b) => sortRides(a,b));
                addEmbedFieldsLands(ACEmbed, ACRides);

                try {
                    return interaction.editReply({
                        embeds: [ToonEmbed, ToyEmbed, RemyEmbed, ProdEmbed, ACEmbed]
                    });
                } catch (e) {
                    console.log(e);
                }
            }
            case "Disneyland Railroad": {

                const RailEmbed = new MessageEmbed()
                    .setColor('#228B22')
                    .setTitle('Railroad Stations')
                    .setThumbnail('https://media.disneylandparis.com/d4th/fr-fr/images/n017636_2050jan01-disneyland-railroad-frontierland-station_16-9_tcm808-159505.jpg')

                const DLRRides = await DLPDB.find({});
                const RailRides = DLRRides.filter(ride => Railroad.includes(ride.id));

                addEmbedFieldsLands(RailEmbed, RailRides);

                return interaction.editReply({
                    embeds: [RailEmbed]
                });
            }
        }
    }
}