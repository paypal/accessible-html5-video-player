'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = window.React || require('react');
var ReactDOM = window.ReactDOM || require('react-dom');
var PropTypes = window.PropTypes || require('prop-types');

var extractVideoType = function extractVideoType(src) {
  var splatByDot = src.split(".");
  var len = splatByDot.length;

  return splatByDot[len - 1];
};

var PXVideoInit = function PXVideoInit(props) {
  var id = props.id,
      caption = props.caption,
      seekInterval = props.seekInterval,
      title = props.title,
      debug = props.debug;


  var PXVideo = new InitPxVideo({
    videoId: id,
    captionsOnDefault: caption && caption.default,
    seekInterval: seekInterval,
    videoTitle: title,
    debug: debug
  });

  return PXVideo;
};

var PXVideo = function (_React$Component) {
  _inherits(PXVideo, _React$Component);

  function PXVideo() {
    _classCallCheck(this, PXVideo);

    return _possibleConstructorReturn(this, (PXVideo.__proto__ || Object.getPrototypeOf(PXVideo)).apply(this, arguments));
  }

  _createClass(PXVideo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          title = _props.title,
          caption = _props.caption,
          id = _props.id,
          seekInterval = _props.seekInterval,
          debug = _props.debug;

      // Initialize video player

      PXVideoInit({
        id: id,
        caption: caption,
        seekInterval: seekInterval,
        debug: debug,
        title: title
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          sources = _props2.sources,
          caption = _props2.caption,
          poster = _props2.poster,
          width = _props2.width,
          height = _props2.height,
          controls = _props2.controls,
          fallback = _props2.fallback,
          id = _props2.id;

      // Video Props

      var videoProps = {
        width: width,
        height: height
      };

      poster && (videoProps.poster = poster);
      controls && (videoProps.controls = true);

      // Caption Props
      var captionProps = {
        label: caption.label,
        src: caption.src,
        srcLang: caption.lang
      };

      caption.default && (captionProps.default = true);

      return React.createElement(
        'div',
        { className: 'px-video-container', id: id },
        React.createElement(
          'div',
          { className: 'px-video-img-captions-container' },
          React.createElement('div', { className: 'px-video-captions hide' }),
          React.createElement(
            'video',
            videoProps,
            sources && sources.map(function (src) {
              return React.createElement('source', {
                key: src,
                src: src,
                type: 'video/' + extractVideoType(src)
              });
            }),
            caption && React.createElement('track', _extends({ kind: 'captions' }, captionProps)),
            fallback && sources && sources.length >= 1 && React.createElement(
              'div',
              null,
              React.createElement(
                'a',
                { href: sources[0] },
                poster && React.createElement('img', {
                  src: poster,
                  width: width,
                  height: height,
                  alt: 'download video'
                })
              )
            )
          )
        ),
        React.createElement('div', { className: 'px-video-controls' })
      );
    }
  }]);

  return PXVideo;
}(React.Component);

// Declaring PropTypes


PXVideo.propTypes = {
  sources: PropTypes.array.isRequired,
  title: PropTypes.string,
  caption: PropTypes.shape({
    label: PropTypes.string,
    src: PropTypes.string.isRequired,
    lang: PropTypes.string,
    default: PropTypes.bool
  }),
  poster: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  controls: PropTypes.bool,
  id: PropTypes.string.isRequired,
  fallback: PropTypes.bool,
  seekInterval: PropTypes.number,
  debug: PropTypes.bool
};

// Assigning default values
PXVideo.defaultProps = {
  width: 640,
  height: 360,
  controls: true,
  fallback: true,
  seekInterval: 20,
  debug: false
};
