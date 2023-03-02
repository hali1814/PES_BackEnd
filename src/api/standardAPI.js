const jsonFailureCallApi = (err) => ({
  status: "error",
  message: "Unable to communicate with database",
  err: err
});

const jsonSuccessCallApi = (instance) => ({
    status: 'success',
    data: instance
})

const jsonSuccess = (data, statusCode) => ({
  status: "success",
  error: false,
  responseTime: new Date(),
  statusCode: statusCode,
  author: "Hào hoa sành điệu 6 múi phong cách hàn quốc",
  data: data,
});

const jsonFailure = (data, statusCode) => ({
  status: "failure",
  error: false,
  responseTime: new Date(),
  statusCode: statusCode,
  author: "Hào hoa sành điệu 6 múi phong cách hàn quốc",
  data: data,
});


const jsonBaned = (data, statusCode) => ({
  status: "baned",
  error: false,
  responseTime: new Date(),
  statusCode: statusCode,
  author: "Hào hoa sành điệu 6 múi phong cách hàn quốc",
  data: data,
});

const jsonInactive = (data, statusCode) => ({
  status: "inactive",
  error: false,
  responseTime: new Date(),
  statusCode: statusCode,
  author: "Hào hoa sành điệu 6 múi phong cách hàn quốc",
  data: data,
});
module.exports = { jsonFailure, jsonSuccess, jsonFailureCallApi, jsonSuccessCallApi, jsonBaned, jsonInactive };
