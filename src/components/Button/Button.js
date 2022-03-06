import React from 'react';
import './Button.scss';

const Button = ({ text, className, onclick }) => {
  return (
    <button className={className + ' btn'} onClick={onclick}>
      {text}
    </button>
  );
};

export default Button;
