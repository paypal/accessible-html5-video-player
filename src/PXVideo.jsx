const React = window.React || require('react')
const ReactDOM = window.ReactDOM || require('react-dom')
const PropTypes = window.PropTypes || require('prop-types')

const extractVideoType = src => {
  const splatByDot = src.split(".");
  const len = splatByDot.length;

  return splatByDot[len - 1];
};

const PXVideoInit = props => {
  const { id, caption, seekInterval, title, debug } = props;

  const PXVideo = new InitPxVideo({
    videoId: id,
    captionsOnDefault: caption && caption.default,
    seekInterval,
    videoTitle: title,
    debug
  });

  return PXVideo;
};

class PXVideo extends React.Component {
  componentDidMount() {
    const { title, caption, id, seekInterval, debug } = this.props;

    // Initialize video player
    PXVideoInit({
      id,
      caption,
      seekInterval,
      debug,
      title
    });
  }

  render() {
    const {
      sources,
      caption,
      poster,
      width,
      height,
      controls,
      fallback,
      id
    } = this.props;

    // Video Props
    const videoProps = {
      width,
      height
    };

    poster && (videoProps.poster = poster);
    controls && (videoProps.controls = true);

    // Caption Props
    const captionProps = {
      label: caption.label,
      src: caption.src,
      srcLang: caption.lang
    };

    caption.default && (captionProps.default = true);

    return (
      <div className="px-video-container" id={id}>
        <div className="px-video-img-captions-container">
          <div className="px-video-captions hide" />
          <video {...videoProps}>
            {sources &&
              sources.map(src => (
                <source
                  key={src}
                  src={src}
                  type={`video/${extractVideoType(src)}`}
                />
              ))}

            {caption && <track kind="captions" {...captionProps} />}

            {fallback &&
              sources &&
              sources.length >= 1 && (
                <div>
                  <a href={sources[0]}>
                    {poster && (
                      <img
                        src={poster}
                        width={width}
                        height={height}
                        alt="download video"
                      />
                    )}
                  </a>
                </div>
              )}
          </video>
        </div>
        <div className="px-video-controls" />
      </div>
    );
  }
}

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
