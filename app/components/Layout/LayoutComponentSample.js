import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import './LayoutComponentSample.global.scss';

const sampleSource = {
  beginDrag(props) {
    return {
      type: props.type
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class LayoutComponentSample extends Component {
  render() {
    const { children, style, type, connectDragSource, isDragging, ...props } = this.props;

    return connectDragSource(
      <div
        className="LayoutComponentSample"
        style={style}
        title={type}
        {...props}
      >
        { children }
      </div>
    );
  }
}

LayoutComponentSample.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line
  style: PropTypes.object,
  type: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  // eslint-disable-next-line
  isDragging: PropTypes.bool.isRequired
};

LayoutComponentSample.defaultProps = {
  children: [],
  style: {}
};

export default DragSource('componentSample', sampleSource, collect)(LayoutComponentSample);
