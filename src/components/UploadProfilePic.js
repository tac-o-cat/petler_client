import S3FileUpload from "react-s3";
import config from "config";

// 1. 이미지 객체를 준비
// 2. 외부에서 업로드 트리거시 s3에 업로드
// 3. s3에 올라간 file url을 return

export default file => {
  return S3FileUpload.uploadFile(file, config.AWS_S3_CONFIG).then(res => res.location);
};
