const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 });
const { Token } = require("./config.json");

const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

client.commands = new Collection();

const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { SpotifyPlugin } = require("@distube/spotify");

client.distube = new DisTube(client, {
    leaveOnStop: true,
    leaveOnFinish: true,
    leaveOnEmpty: true,
    emptyCooldown: 30,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: true,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true,
            api: {
                clientId: "spotify client id here",
                clientSecret: "spotify client secret here",
            },
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ],
    youtubeDL: false
});
const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
module.exports = client, status;

require("../Systems/GiveawaySys")(client);

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(Token);