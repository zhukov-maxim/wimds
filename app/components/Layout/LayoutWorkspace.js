import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import './LayoutWorkspace.global.scss';

const workspaceTarget = {
  drop(props, monitor, component) {
    component.props.onChange({
      dropTargetId: component.state.dropTargetId,
      dropSourceType: monitor.getItem().type
    });

    component.setState({
      dropTargetId: undefined
    });
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class LayoutWorkspace extends Component {
  static renderInfoOverlay(dropTargetId) {
    return (
      <div className="LayoutWorkspace__info-overlay">
        Drop target ID: { dropTargetId }
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      dropTargetId: undefined,
      dropTargetTop: undefined,
      dropTargetLeft: undefined,
      dropTargetWidth: undefined,
      dropTargetHeight: undefined
    };

    this.handleDragOver = this.handleDragOver.bind(this);
  }

  handleDragOver(e) {
    const target = e.target;
    const hoveredDropTargetId = target.getAttribute('id');

    if (hoveredDropTargetId === this.state.dropTargetId) {
      return;
    }

    const domRect = target.getBoundingClientRect();

    this.setState({
      dropTargetId: hoveredDropTargetId,
      dropTargetTop: domRect.top,
      dropTargetLeft: domRect.left,
      dropTargetWidth: domRect.width,
      dropTargetHeight: domRect.height
    });
  }

  renderDropTargetArea() {
    const {
      dropTargetId,
      dropTargetTop, dropTargetLeft,
      dropTargetWidth, dropTargetHeight,
      ...props } = this.state;

    const style = {
      top: `${dropTargetTop}px`,
      left: `${dropTargetLeft}px`,
      width: `${dropTargetWidth}px`,
      height: `${dropTargetHeight}px`
    };

    return (
      <div
        className="dropTargetArea"
        style={style}
        {...props}
      />
    );
  }

  render() {
    const { connectDropTarget, children, isOver, ...props } = this.props;
    const { dropTargetId } = this.state;

    return connectDropTarget(
      <div
        className="LayoutWorkspace"
        onDragOver={this.handleDragOver}
        {...props}
      >
        { children }
        { dropTargetId && this.renderDropTargetArea() }
        { dropTargetId && LayoutWorkspace.renderInfoOverlay(dropTargetId) }
      </div>
    );
  }
}

LayoutWorkspace.propTypes = {
  children: PropTypes.node,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
};

LayoutWorkspace.defaultProps = {
  children: []
};

export default DropTarget('componentSample', workspaceTarget, collect)(LayoutWorkspace);
