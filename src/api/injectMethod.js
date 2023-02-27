const normalController = (data, statusCode, res) => {
    if (data.status == "success") {
        const content = data.data
        res.json(require('./standardAPI').jsonSuccess(content, statusCode));
      } else res.json(data);
}

module.exports = normalController