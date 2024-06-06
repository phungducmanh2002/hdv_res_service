class DataResponse {
  constructor(code = null, message = "", data = {}) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static Clone(obj) {
    const dataResponse = new DataResponse();
    dataResponse.code = obj.code;
    dataResponse.message = obj.message;
    dataResponse.data = obj.data;
    return dataResponse;
  }

  static Oke(data = null, message = "oke") {
    return new DataResponse(200, message, data);
  }

  static BadRequest(message) {
    return new DataResponse(400, message, data);
  }

  static BadRequest(data = null, message = "bad request") {
    return new DataResponse(400, message, data);
  }

  static Forbidden(data = null, message = "forbidden") {
    return new DataResponse(403, message, data);
  }

  static Notfound(data = null, message = "not found") {
    return new DataResponse(404, message, data);
  }

  static ServerError(data = null, message = "server error") {
    return new DataResponse(500, message, data);
  }
}

module.exports = DataResponse;
