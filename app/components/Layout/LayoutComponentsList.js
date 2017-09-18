import React from 'react';
import PropTypes from 'prop-types';

import './LayoutComponentsList.global.scss';

const LayoutComponentsList = ({ children, ...props }) => (
  <div className="LayoutComponentsList" {...props}>
    { children }
  </div>
);

LayoutComponentsList.propTypes = {
  children: PropTypes.node
};

LayoutComponentsList.defaultProps = {
  children: []
};

export default LayoutComponentsList;
