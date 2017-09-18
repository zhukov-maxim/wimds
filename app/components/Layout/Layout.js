import React from 'react';
import PropTypes from 'prop-types';

import './Layout.global.scss';

const Layout = ({ children, ...props }) => (
  <div className="Layout" {...props}>
    { children }
  </div>
);

Layout.propTypes = {
  children: PropTypes.node
};

Layout.defaultProps = {
  children: []
};

export default Layout;
