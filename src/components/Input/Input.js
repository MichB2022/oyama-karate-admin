import React from 'react';
import './Input.scss';

const Input = ({ label, className, value, id }) => {
  return (
    <div className='section-info'>
      <p className='info'>{label}</p>
      <input type='text' className={className} defaultValue={value} id={id} />
    </div>
  );
};

export default Input;
