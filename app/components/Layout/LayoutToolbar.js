import React from 'react';
import PropTypes from 'prop-types';

import './LayoutToolbar.global.scss';

const LayoutToolbar = ({ children, ...props }) => (
  <div className="LayoutToolbar" {...props}>
    { children }
  </div>
);

LayoutToolbar.propTypes = {
  children: PropTypes.node
};

LayoutToolbar.defaultProps = {
  children: []
};

export default LayoutToolbar;
