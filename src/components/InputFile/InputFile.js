import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { API_UPLOADS_URL } from '../../configs/api';
import './InputFile.scss';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  marginTop: 16,
  backgroundColor: 'transparent'
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  width: '100%'
};

const img = {
  display: 'block',
  width: '100%'
};

// imgState - array of images [{img: '', alt: ''}]
const InputFile = ({
  label,
  className,
  maxFileNumber,
  imgState,
  setImgState,
  filesRootFolder,
  withoutThumbs
}) => {
  const [files, setFiles] = useState([]);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/jpeg,image/png,image/webp',
    maxFiles: maxFileNumber
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );

      setImgState(
        acceptedFiles.map(
          (file) =>
            (file = { img: file, alt: file.name.replace(/\.[^/.]+$/, '') })
        )
      );
    }
  }, [acceptedFiles]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  let thumbs;
  if (imgState[0].imgUrl) {
    thumbs = (
      <div style={thumb}>
        <div style={thumbInner}>
          <img
            src={`${API_UPLOADS_URL}/${filesRootFolder}/${imgState[0].imgUrl}`}
            style={img}
          />
        </div>
      </div>
    );
  } else {
    thumbs = files.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    ));
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className='section-info'>
      <p className={`info ${className}`}>{label}</p>
      <div className='file-input-container'>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Przeciągnij zdjęcie lub kliknij, aby dodać</p>
          <em>(Tylko pliki typu *.jpeg lub *.png lub *.webp)</em>
        </div>
        {!withoutThumbs && <aside style={thumbsContainer}>{thumbs}</aside>}
      </div>
    </div>
  );
};

export default InputFile;
