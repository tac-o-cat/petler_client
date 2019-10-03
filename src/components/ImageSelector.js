import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const ImageSelector = props => {
  const Box = styled.div`
    .imgPreview {
      position: relative;
      display: block;
      width: 96px;
      height: 96px;
      margin: 0 auto 1rem;
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #c4c4c4;

      img {
        max-width: 100%;
        height: 100%;
      }
    }

    label {
      display: block;
      width: 100%;
      cursor: pointer;

      input {
        display: none;
      }
    }
  `;

  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  useEffect(() => {
    if (file) {
      props.onImageReady(file);
    }
  }, [file]);

  const handleImageChange = e => {
    e.preventDefault();

    const reader = new FileReader();
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      reader.onloadend = () => {
        setFile(selectedFile);
        setImagePreviewUrl(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const { prevImg } = props;

  return (
    <Box>
      <div className="imgPreview">
        {imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="" />
        ) : (
          <img src={prevImg} alt="prevImage" />
        )}
      </div>
      <Button variant="contained" size="small">
        <label>
          프로필 편집
          <input type="file" onChange={e => handleImageChange(e)} />
        </label>
      </Button>
    </Box>
  );
};

export default ImageSelector;
