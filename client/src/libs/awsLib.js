// import { Storage } from "aws-amplify";
import Storage from "@aws-amplify/storage";
import config from "../config";
// Storage: {
//   region: config.s3.REGION,
//   bucket: config.s3.BUCKET,
//   identityPoolId: config.cognito.IDENTITY_POOL_ID,
// },
Storage.configure({
  AWSS3: {
    bucket: config.s3.BUCKET,
    region: config.s3.REGION,
  },
});

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;
  const stored = await Storage.put(`${filename}`, file, {
    contentType: file.type,
    //https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js
    // level: "private",
  });
  console.log(stored);
  return stored.key;
}
