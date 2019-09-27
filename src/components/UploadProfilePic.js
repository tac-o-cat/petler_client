import React from "react";
import ImagesUploader from "react-images-uploader";
import "react-images-uploader/styles.css";

const UploadProfilePic = () => {
  // url에 POST request 보낼 주소 넣기.
  // https://github.com/aleksei0807/react-images-uploader
  return (
    <ImagesUploader
      url="localhost:3000"
      optimisticPreviews
      label="프로필 사진"
      multiple={false}
      onLoadEnd={err => {
        if (err) {
          /* eslint-disable no-console */
          console.error(err);
        }
      }}
    />
  );
};

export default UploadProfilePic;
