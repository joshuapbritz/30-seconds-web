import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';

const Button = ({
  onClick,
  className = '',
  children,
  ...rest // Needs props to be a link, have accessible name if only icon etc.
}) => (
  <button
    className={ trimWhiteSpace`btn ${className}` }
    onClick={ onClick }
    { ...rest }
  >
    { children }
  </button>
);

Button.propTypes = {
  /** Button onclick event handler */
  onClick: PropTypes.func,
  /** Additional classname(s) for the button */
  className: PropTypes.string,
  /** Children elements */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Any other props to be passed to the component */
  rest: PropTypes.any,
};

export default Button;
