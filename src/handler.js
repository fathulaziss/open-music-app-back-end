const { nanoid } = require('nanoid');
const albums = require('./albums');
const songs = require('./songs');

const addAlbumHandler = (request, h) => {
  const { name, year } = request.payload;
  const id = nanoid(16);

  const newAlbum = { id, name, year };

  albums.push(newAlbum);

  const isSuccess = albums.filter((album) => album.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      data: {
        'albumId' : id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    staus: 'fail',
    message: 'Album gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAlbumByIdHandler = (request, h) => {
  const { id } = request.params;
  const album = albums.filter((album) => album.id === id)[0];

  if (album !== undefined) {
    return {
      status: 'success',
      data: { album },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Album tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const { name, year } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = albums.findIndex((album) => album.id === id);

  if (index !== -1) {
    albums[index] = {
      id,
      name,
      year,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Album berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    staus: 'fail',
    message: 'Gagal memperbarui album. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = albums.findIndex((album) => album.id === id);

  if (index !== -1) {
    albums.slice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Album berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Album gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const addSongHandler = (request, h) => {
  const { title, year, genre, performer, duration } = request.payload;
  const id = nanoid(16);
  const albumId = albums[albums.length - 1].id;

  const newSong = { id, title, year, genre, performer, duration, albumId };
  songs.push(newSong);

  const isSuccess = songs.filter((song) => song.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      staus: 'success',
      data: { 'songId': id },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    staus: 'fail',
    message: 'Song gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllSongHandler = () => {
  const newSongs = songs.map((song) => ({
    id: song.id, title: song.title, performer: song.performer
  }));

  return ({
    status: 'success',
    data: ({ songs: newSongs })
  });

};

const getSongByIdHandler = (request, h) => {
  const { id } = request.params;
  const song = songs.filter((song) => song.id === id)[0];

  if (song !== undefined) {
    return {
      status: 'success',
      data: { song },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Song tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, year, genre, performer, duration, albumId } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
    songs[index] = {
      id,
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Song berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    staus: 'fail',
    message: 'Gagal memperbarui song. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
    songs.slice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Song berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    staus: 'fail',
    message: 'Song gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addAlbumHandler,
  getAlbumByIdHandler,
  editAlbumByIdHandler,
  deleteAlbumByIdHandler,
  addSongHandler,
  getAllSongHandler,
  getSongByIdHandler,
  editSongByIdHandler,
  deleteSongByIdHandler,
};