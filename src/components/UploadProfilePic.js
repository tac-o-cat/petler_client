import S3 from "aws-s3";
import config from "config";
import moment from "moment";

export default file => {
  const S3Client = new S3(config.AWS_S3_CONFIG);
  let newFileName = `${file.name}-${moment().format("YYYYMMDDHHmmss")}`;
  return S3Client.uploadFile(file, newFileName).then(res => res.location);
};
