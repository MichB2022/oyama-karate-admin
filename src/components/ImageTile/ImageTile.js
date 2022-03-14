import { useState } from 'react';
import { httpRequest } from '../../utils/requests';
import './ImageTile.scss';

const ImageTile = ({ url, alt, deletePath }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  console.log(url);
  return (
    <>
      {!isDeleted && (
        <div className='image-tile'>
          <img src={url} alt={alt} />
          <button
            onClick={() => {
              httpRequest('DELETE', deletePath);
              setIsDeleted(true);
            }}
          >
            USUŃ
          </button>
        </div>
      )}
    </>
  );
};

export default ImageTile;
