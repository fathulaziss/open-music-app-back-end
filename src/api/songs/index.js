
const SongsHandler = require('../songs/handler');
const routes = require('../songs/routes');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service }) => {
    const songsHandler = new SongsHandler(service);
    server.route(routes(songsHandler));
  },
};