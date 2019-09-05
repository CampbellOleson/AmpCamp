import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyleImage = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#404040",
  borderStyle: "dashed",
  backgroundColor: "#707070",
  color: "#404040",
  outline: "none",
  width: "100px",
  height: "90px",
  transition: "border .24s ease-in-out",
  margin: "20px"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const StyledDropzone = props => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: "image/*" });

  const style = useMemo(
    () => ({
      // ...(props.type === "track" ? baseStyleTrack : baseStyleImage),
      ...baseStyleImage,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  return (
    <div
      className="dropzone"
      onDrop={image => props.fileDrop(image.dataTransfer.files[0])}
    >
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>drop album artwork here</p>
      </div>
    </div>
  );
};

export default StyledDropzone;
