import React from 'react';
import '../styles.css';
const Button = ({ onClick }) => (
  <button type="button" className="Button" onClick={onClick}>
    <span className="btton">Load more</span>
  </button>
);

export default Button;
