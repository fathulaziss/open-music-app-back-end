const Hapi = require('@hapi/hapi');
const AlbumsService = require('./services/inMemory/AlbumsService');
const SongsService = require('./services/inMemory/SongsService');
const albums = require('./api/albums');
const songs = require('./api/songs');

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();

  const server = Hapi.server({
    port: 3000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: albums,
    options: { service: albumsService },
  });

  await server.register({
    plugin: songs,
    options: { service: songsService },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();