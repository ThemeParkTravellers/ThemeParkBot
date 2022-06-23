const {
  MessageEmbed
} = require('discord.js')

const axios = require('axios');

const DLPDB = require('../Structures/Schemas/DLPDB');
const WDSDB = require('../Structures/Schemas/WDSDB');

const Blacklist = ["P1DA13", "P1RA07", "P1AA00", "P1AA03", "P1AA08", "P1AA05", "P1NA06", "P1NA12", "P1NA17", "P1NA04", "P2AC00"]
const Railroad = ["P1DA10", "P1RA10", "P1NA16"]

async function getInfoOld() {
  const fetchedData = await axios.post(`query url here`, {
    query: `query here`,
    variables: {
      market: 'en-us',
      types: [
        'Attraction',
        'DiningEvent',
        'DinnerShow',
        'Entertainment',
        'Event',
        'GuestService',
        'Recreation',
        'Resort',
        'Restaurant',
        'Shop',
        'Spa',
        'Tour',
        'ThemePark',
      ],
    },
  });
  const activities = fetchedData.data.data.activities
  const attractions = activities.filter(activity => activity.contentType === 'Attraction')
  return attractions;
}

async function getInfo() {
  const fetchedData = await axios.post(`query url here`, {
    query: `query here`,
    variables: {
      market: "fr-fr"
    }
  })
  const data = fetchedData.data.data.activities;
  return data;
}

async function getWaitTimes() {
  const fetchedData = await axios.get(`wait time url here`, {
    headers: {
      'headers': 'here'
    },
    json: true,
  });
  //console.log(fetchedData.data);
  return fetchedData.data;
}

async function updateDatabase() {
  const Info = await getInfo();
  const waitTimes = await getWaitTimes();

  if (waitTimes.length == 0) {
    const DLPClosed = await DLPDB.find({});
    const WDSClosed = await WDSDB.find({});
    DLPClosed.forEach(ride => {
      DLPDB.findOneAndUpdate({
        id: ride.id
      }, {
        status: "REFURBISHMENT"
      }, {
        new: true
      })
    })
    WDSClosed.forEach(ride => {
      WDSDB.findOneAndUpdate({
        id: ride.id
      }, {
        status: 'REFURBISHMENT'
      }, {
        new: true
      })
    })
    return;
  }

  const DPInfos = Info.filter(attraction => attraction.location.id === 'P1');
  const WDSInfos = Info.filter(attraction => attraction.location.id === 'P2');

  DPInfos.forEach(async attraction => {
    rideWait = await waitTimes.find(waitTime => waitTime.entityId === attraction.id);

    if (rideWait) {
      const update = await DLPDB.findOneAndUpdate({
        id: attraction.id
      }, {
        contentType: attraction.contentType,
        name: attraction.name,
        status: rideWait.status,
        singleRider: rideWait.singleRider.isAvailable,
        waitTime: rideWait.postedWaitMinutes,
        singleRiderWaitTime: rideWait.singleRider.singleRiderWaitMinutes || null,
      }, {
        upsert: true,
        new: true
      })
    } else {
      const update = await DLPDB.findOneAndUpdate({
        id: attraction.id
      }, {
        contentType: attraction.contentType,
        name: attraction.name,
        status: "REFURBISHMENT",
        singleRider: false,
        waitTime: "0",
        singleRiderWaitTime: null,
      }, {
        new: true
      })
    }
  })

  WDSInfos.forEach(async attraction => {
    rideWait = await waitTimes.find(waitTime => waitTime.entityId === attraction.id);

    if (rideWait) {
      const update = await WDSDB.findOneAndUpdate({
        id: attraction.id
      }, {
        contentType: attraction.contentType,
        name: attraction.name,
        status: rideWait.status,
        singleRider: rideWait.singleRider.isAvailable,
        waitTime: rideWait.postedWaitMinutes,
        singleRiderWaitTime: rideWait.singleRider.singleRiderWaitMinutes || null,
      }, {
        upsert: true,
        new: true
      })
    } else {
      const update = await WDSDB.findOneAndUpdate({
        id: attraction.id
      }, {
        contentType: attraction.contentType,
        name: attraction.name,
        status: "REFURBISHMENT",
        singleRider: false,
        waitTime: "0",
        singleRiderWaitTime: null,
      }, {
        upsert: true,
        new: true
      })
    }
  })
}

function addEmbedFieldsLands(embed, rides) {
  rides.forEach(async ride => {
    if (Blacklist.includes(ride.id)) return;
    if (ride.id.startsWith('P2AC'))
      return await embed.addFields({
        name: `${ride.name}`,
        value: `Bientôt`,
        inline: true
      })
    switch (ride.status) {
      case "OPERATING": {
        if (ride.singleRider === true) {
          return await embed.addFields({
            name: `${ride.name}`,
            value: `${ride.waitTime ? ride.waitTime : "0"} minutes
            Single Rider: ${ride.singleRiderWaitTime ||"0"} minutes`,
            inline: true
          });
        } else {
          return await embed.addFields({
            name: `${ride.name}`,
            value: `${ride.waitTime || "0"} minutes`,
            inline: true
          });
        }
      }
      case "REFURBISHMENT": {
        return await embed.addFields({
          name: `${ride.name}`,
          value: `Fermé`,
          inline: true
        });
      }
      case "DOWN": {
        return await embed.addFields({
          name: `${ride.name}`,
          value: `En panne`,
          inline: true
        });
      }
      case null: {
        return await embed.addFields({
          name: `${ride.name}`,
          value: `Pas d'infos`,
          inline: true
        });
      }
    }
  });
}

module.exports = {
  //Fetch Disneyland Paris API functions
  getInfo,
  getWaitTimes,
  updateDatabase,
  //Embed functions
  addEmbedFieldsLands,
  //Arrays
  Blacklist,
  Railroad
};