module.exports = formatDateMongoDB = (date) => {
  const dateFromMongoDB = new Date(date);
  const day = dateFromMongoDB.getDate().toString().padStart(2, "0");
  const month = (dateFromMongoDB.getMonth() + 1).toString().padStart(2, "0");
  const year = dateFromMongoDB.getFullYear().toString();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};
