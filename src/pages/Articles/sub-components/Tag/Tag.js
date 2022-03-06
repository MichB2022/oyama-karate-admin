import React from 'react';
import './Tag.scss';
import { IoMdClose } from 'react-icons/io';

const Tag = ({ name, id, tags, ReloadVar, setReloadVar }) => {
  return (
    <>
      <div className='tag'>
        <p>{name}</p>
        <div
          className='cross-container'
          onClick={() => {
            tags.splice(
              tags.findIndex((el) => el.id === id),
              1
            );
            setReloadVar(!ReloadVar);
          }}
        >
          <IoMdClose />
        </div>
      </div>
    </>
  );
};

export default Tag;
