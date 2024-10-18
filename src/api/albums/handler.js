class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name = 'hubla', year } = request.payload;

    const albumId = this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: { albumId },
    });
    response.code(201);
    return response;
  }

  getAlbumByIdHandler(request, h) {
    const { id } = request.params;

    const album = this._service.getAlbumById(id);

    const response = h.response({
      status: 'success',
      data: { album },
    });
    return response;
  }

  putAlbumByIdHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    this._service.editAlbumById(id, request.payload);

    const response = h.response({
      status: 'success',
      data: 'Album berhasil diperbarui',
    });
    return response;
  }

  deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;

    this._service.deleteAlbumById(id);

    const response = h.response({
      status: 'success',
      data: 'Album berhasil dihapus',
    });
    return response;
  }
}

module.exports = AlbumsHandler;