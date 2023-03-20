module.exports = function (price) {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
