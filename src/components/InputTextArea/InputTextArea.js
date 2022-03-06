import React from 'react';
import './InputTextArea.scss';

const InputTextArea = ({ label, className, value, id }) => {
  return (
    <div className='section-info'>
      <p className={`info ${className}`}>{label}</p>
      <textarea type='text' defaultValue={value} id={id} />
    </div>
  );
};

export default InputTextArea;
