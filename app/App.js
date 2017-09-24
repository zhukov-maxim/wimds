import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import io from './io';

import './app.global.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      depth: 1,
      isAnalyzing: false,
      path: props.path
    };

    this.handleChooseButtonClick = this.handleChooseButtonClick.bind(this);
    this.handleAnalyzeButtonClick = this.handleAnalyzeButtonClick.bind(this);
    this.handlePathChange = this.handlePathChange.bind(this);
    this.handlePathChoose = this.handlePathChoose.bind(this);
    this.handleDepthChange = this.handleDepthChange.bind(this);
  }

  addDirectory(node) {
    if (node) {
      node.directory = true;
      node.webkitdirectory = true;
    }
  }

  handleChooseButtonClick() {
    this.chooseDirectoryButton.click();
  }

  handleAnalyzeButtonClick() {
    const data = io.getFolderContent(this.state.path);

    this.setState({
      data
    });
  }

  handlePathChange(e) {
    const path = e.target.value;

    this.setState({
      path
    });
  }

  handlePathChoose(e) {
    const path = e.target.files[0].path;

    this.setState({
      path
    });
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
          value={this.state.path}
          onChange={this.handlePathChange}
        />
        <input
          type="file"
          className="app__footer-input"
          style={{ display: 'none' }}
          ref={node => {
            this.chooseDirectoryButton = node;
            this.addDirectory(node);
          }}
          onChange={this.handlePathChoose}
        />
        <button
          className="app__footer-button"
          onClick={this.handleChooseButtonClick}
        >
          Choose...
        </button>
        <button
          className="app__footer-button"
          onClick={this.handleAnalyzeButtonClick}
          disabled={!this.state.path}
        >
          Analyze
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
    const { data } = this.state;

    return (
      <div className="app">
        <div className="app__content">
          {
            data ?
              this.renderDiagram(data) :
              null
          }
        </div>
        <div className="app__footer">
          {
            this.renderPathSelector()
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
  path: PropTypes.string
};

App.defaultProps = {
  path: io.getHomeDir()
};

export default App;
