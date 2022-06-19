const { CommandInteraction, MessageEmbed } = require("discord.js");
const { DisneylandParisMagicKingdom, DisneylandParisWaltDisneyStudios } = require("../../Structures/Utils/ThemeParks");

const AttractionsDP = {};
const AttractionsWDS = {};
const BlackList = ['P1MA02', 'P1MA00', 'P1DA14', 'P1MA03', 'P1MA04', 'P1RA07', 'P1AA05', 'P1DA13', 'P1AA08', 'P1MA06'];
const RailList = ['P1DA10', 'P1RA10', 'P1NA16', 'P1MA05']

module.exports = {
    name: "waittime",
    description: "Get the wait time for a theme park",
    permission: "SEND_MESSAGES",
    options: [
        {
            name: "park",
            description: "The theme park to get the wait time for",
            type: "STRING",
            required: true,
            choices: [
                {
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
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;

        const Park = options.getString("park");

        switch(Park) {
            case "Disneyland Park": {
                DisneylandParisMagicKingdom.GetWaitTimes().then(async (rideTimes) => {
                    rideTimes.forEach((ride) => {
                        const RideID = ride.id.split("_P1").pop()
                        if (RideID.length > 4 || ride.waitTime == null) {
                            return;
                        }
                        if (BlackList.includes(`P1${RideID}`) || ride.status == 'Down' || ride.status == 'Refurbishment' || ride.status == 'Closed') {
                            AttractionsDP[RideID] = [`${ride.name}`, `${ride.status}`, `0`]
                            return;
                        }
                        if (ride.waitTime == 60) {
                            AttractionsDP[RideID] = [`${ride.name}`, `${ride.status}`, `1h`]
                            return;
                        }
                        if (ride.waitTime > 60 & ride.waitTime < 120) {
                            const heures = ride.waitTime - 60
                            AttractionsDP[RideID] = [`${ride.name}`, `${ride.status}`, `1h et ${heures}`]
                            return;
                        }
                        if (ride.waitTime == 120) {
                            AttractionsDP[RideID] = [`${ride.name}`, `${ride.status}`, `2h`]
                            return;
                        }
                        if (ride.waitTime > 120) {
                            const heures = ride.waitTime - 120
                            AttractionsDP[RideID] = [`${ride.name}`, `${ride.status}`, `2h et ${heures}`]
                            return;
                        }
                        if (ride.waitTime == 180) {
                            AttractionsDP[RideID] = [`${ride.name}`, `${ride.status}`, `3h`]
                            return;
                        }
                        if (ride.waitTime >= 180) {
                            const heures = ride.waitTime - 180
                            AttractionsDP[RideID] = [`${ride.name}`, `${ride.status}`, `3h et ${heures}`]
                            return;
                        }
                        AttractionsDP[RideID] = [`${ride.name}`, `${ride.status}`, `${ride.waitTime}`]
                    });
                    const DiscoEmbed = new MessageEmbed()
                        .setColor('#0a00ff')
                        .setTitle('Discoveryland')
                        .setThumbnail('https://www.ed92.org/wp-content/uploads/2021/12/20151125_Jo_35-768x512.jpg')
                        .addFields({
                            name: `${AttractionsDP['DA08'][0]}`,
                            value: `${AttractionsDP['DA08'][1]} (${AttractionsDP['DA08'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['DA04'][0]}`,
                            value: `${AttractionsDP['DA04'][1]} (${AttractionsDP['DA04'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['DA03'][0]}`,
                            value: `${AttractionsDP['DA03'][1]} (${AttractionsDP['DA03'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['DA09'][0]}`,
                            value: `${AttractionsDP['DA09'][1]} (${AttractionsDP['DA09'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['DA07'][0]}`,
                            value: `${AttractionsDP['DA07'][1]} (${AttractionsDP['DA07'][2]})`,
                            inline: true
                        })
                    const FrontierEmbed = new MessageEmbed()
                        .setColor('#8B4513')
                        .setTitle('Frontierland')
                        .setThumbnail('https://www.ed92.org/wp-content/uploads/2021/03/20150913_Jo_10-768x512.jpg')
                        .addFields({
                            name: `${AttractionsDP['RA03'][0]}`,
                            value: `${AttractionsDP['RA03'][1]} (${AttractionsDP['RA03'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['RA06'][0]}`,
                            value: `${AttractionsDP['RA06'][1]} (${AttractionsDP['RA06'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['RA00'][0]}`,
                            value: `${AttractionsDP['RA00'][1]} (${AttractionsDP['RA00'][2]})`,
                            inline: true
                        }, )
                    const FantasyEmbed = new MessageEmbed()
                        .setColor('#FF69B4')
                        .setTitle('Fantasyland')
                        .setThumbnail('https://www.ed92.org/wp-content/uploads/2021/03/Fantasyland-11.jpg')
                        .addFields({
                            name: `${AttractionsDP['NA01'][0]}`,
                            value: `${AttractionsDP['NA01'][1]} (${AttractionsDP['NA01'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['NA09'][0]}`,
                            value: `${AttractionsDP['NA09'][1]} (${AttractionsDP['NA09'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['NA13'][0]}`,
                            value: `${AttractionsDP['NA13'][1]} (${AttractionsDP['NA13'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['NA03'][0]}`,
                            value: `${AttractionsDP['NA03'][1]} (${AttractionsDP['NA03'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['NA10'][0]}`,
                            value: `${AttractionsDP['NA10'][1]} (${AttractionsDP['NA10'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['NA07'][0]}`,
                            value: `${AttractionsDP['NA07'][1]} (${AttractionsDP['NA07'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['NA00'][0]}`,
                            value: `${AttractionsDP['NA00'][1]} (${AttractionsDP['NA00'][2]})`,
                            inline: true
                        })
                    const AdventureEmbed = new MessageEmbed()
                        .setColor('#A9A9A9')
                        .setTitle('Adventureland')
                        .setThumbnail('https://www.ed92.org/wp-content/uploads/2021/06/20151023_Jo_04-768x512.jpg')
                        .addFields({
                            name: `${AttractionsDP['AA02'][0]}`,
                            value: `${AttractionsDP['AA02'][1]} (${AttractionsDP['AA02'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['AA01'][0]}`,
                            value: `${AttractionsDP['AA01'][1]} (${AttractionsDP['AA01'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['AA04'][0]}`,
                            value: `${AttractionsDP['AA04'][1]} (${AttractionsDP['AA04'][2]})`,
                            inline: true
                        })
                    return interaction.reply({
                        embeds: [DiscoEmbed, FrontierEmbed, FantasyEmbed, AdventureEmbed]
                    });
                }).catch((err) => {
                    console.log(err);
                    return interaction.reply('Une erreur est survenue');
                })
                return;
            }
            case "Walt Disney Studios": {
                DisneylandParisWaltDisneyStudios.GetWaitTimes().then(async (rideTimes) => {
                    rideTimes.forEach((ride) => {
                        const RideID = ride.id.split("_P2").pop()
                        if (RideID.length > 4 || ride.waitTime == null || RideID == 'FD03') {
                            return;
                        }
                        if (ride.status == 'Down' || ride.status == 'Refurbishment' || ride.status == 'Closed') {
                            AttractionsWDS[RideID] = [`${ride.name}`, `${ride.status}`, `0`]
                            return;
                        }
                        if (ride.waitTime == 60) {
                            AttractionsWDS[RideID] = [`${ride.name}`, `${ride.status}`, `1h`]
                            return;
                        }
                        if (ride.waitTime > 60 & ride.waitTime < 120) {
                            const heures = ride.waitTime - 60
                            AttractionsWDS[RideID] = [`${ride.name}`, `${ride.status}`, `1h et ${heures}`]
                            return;
                        }
                        if (ride.waitTime == 120) {
                            AttractionsWDS[RideID] = [`${ride.name}`, `${ride.status}`, `2h`]
                            return;
                        }
                        if (ride.waitTime > 120) {
                            const heures = ride.waitTime - 120
                            AttractionsWDS[RideID] = [`${ride.name}`, `${ride.status}`, `2h et ${heures}`]
                            return;
                        }
                        if (ride.waitTime == 180) {
                            AttractionsWDS[RideID] = [`${ride.name}`, `${ride.status}`, `3h`]
                            return;
                        }
                        if (ride.waitTime >= 180) {
                            const heures = ride.waitTime - 180
                            AttractionsWDS[RideID] = [`${ride.name}`, `${ride.status}`, `3h et ${heures}`]
                            return;
                        }
                        AttractionsWDS[RideID] = [`${ride.name}`, `${ride.status}`, `${ride.waitTime}`]
                    });
                    //console.log(AttractionsWDS)
                    const TBEmbed = new MessageEmbed()
                        .setColor('#49beab')
                        .setTitle('Toon Backlot')
                        .setThumbnail('https://www.chroniquedisney.fr/img/liste/listePA-STU-TS-03.jpg')
                        .addFields({
                            name: `${AttractionsWDS['XA00'][0]}`,
                            value: `${AttractionsWDS['XA00'][1]} (${AttractionsWDS['XA00'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsWDS['XA02'][0]}`,
                            value: `${AttractionsWDS['XA02'][1]} (${AttractionsWDS['XA02'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsWDS['XA03'][0]}`,
                            value: `${AttractionsWDS['XA03'][1]} (${AttractionsWDS['XA03'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsWDS['XA05'][0]}`,
                            value: `${AttractionsWDS['XA05'][1]} (${AttractionsWDS['XA05'][2]})`,
                            inline: true
                        })
                    const TSPEmbed = new MessageEmbed()
                        .setColor('#6e895e')
                        .setTitle('Toy Story Playland')
                        .setThumbnail('https://www.ed92.org/wp-content/uploads/2021/08/toy_story_playland-1024x682.jpg')
                        .addFields({
                            name: `${AttractionsWDS['XA06'][0]}`,
                            value: `${AttractionsWDS['XA06'][1]} (${AttractionsWDS['XA06'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsWDS['XA07'][0]}`,
                            value: `${AttractionsWDS['XA07'][1]} (${AttractionsWDS['XA07'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsWDS['XA08'][0]}`,
                            value: `${AttractionsWDS['XA08'][1]} (${AttractionsWDS['XA08'][2]})`,
                            inline: true
                        })
                    const PDREmbed = new MessageEmbed()
                        .setColor('#fbbb72')
                        .setTitle('La Place de Rémy')
                        .setThumbnail('https://www.ed92.org/wp-content/uploads/2021/08/ratatouille-1024x681.jpg')
                        .addFields({
                            name: `${AttractionsWDS['XA09'][0]}`,
                            value: `${AttractionsWDS['XA09'][1]} (${AttractionsWDS['XA09'][2]})`,
                            inline: true
                        })
                    const PCEmbed = new MessageEmbed()
                        .setColor('#666cfb')
                        .setTitle('Production Courtyard')
                        .setThumbnail('https://www.ed92.org/wp-content/uploads/2021/05/2490710e94f75f0c54497ea982961dab-768x511.jpg')
                        .addFields({
                            name: `${AttractionsWDS['ZA02'][0]}`,
                            value: `${AttractionsWDS['ZA02'][1]} (${AttractionsWDS['ZA02'][2]})`,
                            inline: true
                        })
                    return interaction.reply({
                        embeds: [TBEmbed, TSPEmbed, PDREmbed, PCEmbed]
                    });
                }).catch((err) => {
                    console.log(err);
                    return interaction.reply('Une erreur est survenue');
                })
                return;
            }
            case "Disneyland Railroad": {
                DisneylandParisMagicKingdom.GetWaitTimes().then(async (rideTimes) => {
                    rideTimes.forEach((ride) => {
                        const RideID = ride.id.split("_P1").pop();
                        if (RailList.includes(`P1${RideID}`)) {
                            if (ride.waitTime == null) {
                                AttractionsDP[RideID] = [`${ride.name}`, `${ride.status}`, `0`]
                            } else {
                                AttractionsDP[RideID] = [`${ride.name}`, `${ride.status}`, `${ride.waitTime}`]
                            }
                        } else {
                            return;
                        }
                    });
                    const Embed = new MessageEmbed()
                        .setColor('#228B22')
                        .setTitle('Railroad Stations')
                        .setThumbnail('https://media.disneylandparis.com/d4th/fr-fr/images/n017636_2050jan01-disneyland-railroad-frontierland-station_16-9_tcm808-159505.jpg')
                        .addFields({
                            name: `${AttractionsDP['DA10'][0]}`,
                            value: `${AttractionsDP['DA10'][1]} (${AttractionsDP['DA10'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['RA10'][0]}`,
                            value: `${AttractionsDP['RA10'][1]} (${AttractionsDP['RA10'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['NA16'][0]}`,
                            value: `${AttractionsDP['NA16'][1]} (${AttractionsDP['NA16'][2]})`,
                            inline: true
                        }, {
                            name: `${AttractionsDP['MA05'][0]}`,
                            value: `${AttractionsDP['MA05'][1]} (${AttractionsDP['MA05'][2]})`,
                            inline: true
                        })
                    return interaction.reply({
                        embeds: [Embed]
                    });
                }).catch((err) => {
                    console.log(err);
                    return interaction.reply('Une erreur est survenue');
                })
                return;
            }
        }
    }
}