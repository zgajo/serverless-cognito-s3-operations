const Wrapper = require("./wrapper/s3");

const BUCKET_NAME = "sls-cognito-backend-uploadedswaggers3bucket";

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      message: "Authenticated call!",
      input: event,
    }),
  };

  callback(null, response);
};

module.exports.getFiles = async (event, context, callback) => {
  let response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: null,
    isBase64Encoded: false,
  };

  let wrapper = new Wrapper();

  return wrapper
    .listObjectsV2({ Bucket: BUCKET_NAME, MaxKeys: 1000 })
    .then((data) => {
      let tasks = [];

      for (let i = 0; i < data.Contents.length; i++) {
        tasks.push(
          wrapper.listObjectVersions({
            Bucket: BUCKET_NAME,
            Prefix: data.Contents[i].Key,
          })
        );
      }

      return Promise.resolve(tasks);
    })
    .then(async (tasks) => {
      return Promise.all(tasks).then((res) => {
        response.body = JSON.stringify(res);
        return Promise.resolve(response);
      });
    })
    .catch((error) => {
      response.statusCode = 500;
      response.body = JSON.stringify(error);
      return Promise.resolve(response);
    });
};
