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
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  width: "70px",
  height: "70px",
  transition: "border .24s ease-in-out",
  margin: "20px"
};

// const baseStyleTrack = {
//   flex: 1,
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   padding: "20px",
//   borderWidth: 2,
//   borderRadius: 2,
//   borderColor: "#eeeeee",
//   borderStyle: "dashed",
//   backgroundColor: "#fafafa",
//   color: "#bdbdbd",
//   outline: "none",
//   width: "70px",
//   height: "20px",
//   transition: "border .24s ease-in-out",
//   margin: "10px"
// };

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
        <p>upload album artwork</p>
      </div>
    </div>
  );
};

export default StyledDropzone;