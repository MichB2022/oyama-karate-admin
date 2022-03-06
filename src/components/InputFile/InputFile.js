import React from 'react';
import './InputFile.scss';

const InputFile = ({ label, className, value, id }) => {
  return (
    <div className='section-info'>
      <p className={`info ${className}`}>{label}</p>
      <label htmlFor='file-input' className='file-input-container'>
        <input type='file' name='file-input' value={value} id={id} />
      </label>
    </div>
  );
};

export default InputFile;
