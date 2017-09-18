import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './app.global.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      depth: 1
    };

    this.handleDepthChange = this.handleDepthChange.bind(this);
  }

  handleDepthChange(e) {
    const newDepth = e.target.value;

    this.setState({
      depth: newDepth
    });
  }

  renderItem(item, depth = 0, parentSize = item.size, horizontal) {
    const size = (item.size / parentSize) * 100;
    const style = {
      width: horizontal && `${size}%`,
      height: !horizontal && `${size}%`,
      flexDirection: horizontal && 'column'
    };
    const className = classNames({
      item: true,
      item_root: item.type === 'root',
      item_free: item.type === 'free'
    });

    return (
      <div
        key={item.name}
        className={className}
        style={style}
      >
        <div className="item__name">
          { item.name }
        </div>
        {
          !!item.children &&
            item.children.length &&
            depth + 1 <= this.state.depth &&
            item.children.map((childItem) =>
              this.renderItem(childItem, depth + 1, item.size, !horizontal))
        }
      </div>
    );
  }

  renderDiagram(data) {
    return (
      <div className="diagram">
        { this.renderItem(data) }
      </div>
    );
  }

  renderLoader() {
    return (
      <div className="loader">
        <div className="spinner" />
      </div>
    );
  }

  renderPathSelector() {
    return (
      <div className="pathSelector">
        <label
          className="app__footer-label"
          htmlFor="path"
        >
          Path:
        </label>
        <input
          type="text"
          className="app__footer-input"
        />
        <button
          className="app__footer-button"
        >
          Choose...
        </button>
        <button
          className="app__footer-button"
        >
          Analyse
        </button>
      </div>
    );
  }

  renderDepthSelector() {
    return (
      <div className="depthSelector">
        <label
          className="app__footer-label"
          htmlFor="depthRange"
        >
          Depth:
        </label>
        <input
          id="depthRange"
          className="app__footer-input"
          type="range"
          min="0"
          max="7"
          value={this.state.depth}
          onChange={this.handleDepthChange}
        />
      </div>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <div className="app">
        {
          data ?
            this.renderDiagram(data) :
            this.renderLoader()
        }
        <div className="app__footer">
          {
            data ?
              this.renderPathSelector() :
              null
          }
          {
            data ?
              this.renderDepthSelector() :
              null
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.object
};

App.defaultProps = {
  data: null
};

export default App;
