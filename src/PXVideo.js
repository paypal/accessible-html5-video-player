const React = window.React || require('react')
const ReactDOM = window.ReactDOM || require('react-dom')
const PropTypes = window.PropTypes || require('prop-types')

const { Component, defaultProps } = React

// Utils
import { extractVideoType, PXVideoInit } from '../utils/video'

class PXVideo extends Component {

  componentDidMount() {
    const {
      title,
      caption,
      id,
      seekInterval,
      debug
    } = this.props

    // Initialize video player
    PXVideoInit({ id, caption, seekInterval, debug, title })
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
    } = this.props

    // Video Props
    const videoProps = {
      width,
      height
    }

    poster && (videoProps.poster = poster)
    controls && (videoProps.controls = true)

    // Caption Props
    const captionProps = {
      label: caption.label,
      src: caption.label,
      srcLang: caption.lang
    }

    caption.default && (captionProps.default = true)

    return (
      <div className="px-video-container" id={id}>
        <div className="px-video-img-captions-container">
          <div className="px-video-captions hide"></div>
          <video {...videoProps}>

            {
              sources && sources.map((src, index) => {
                return <source key={index} src={src} type={`video/${extractVideoType(src)}`} />
              })
            }

            {
              caption && (
                <track kind="captions" {...captionProps} />
              )
            }

            {
              fallback && sources && sources.length >= 1 &&
              (
                <div>
                  <a href={sources[0]}>
                    {
                      poster &&
                      (
                        <img src={poster} width={width} height={height} alt="download video" />
                      )
                    }
                  </a>
                </div>
              )
            }
          </video>
        </div>
        <div className="px-video-controls"></div>
      </div>
    )
  }
}

// Declaring PropTypes
PXVideo.PropTypes = {
  sources: PropTypes.array.isRequired,
  title: PropTypes.string,
  caption: PropTypes.shape({
    label: PropTypes.string,
    source: PropTypes.string.isRequired,
    lang: PropTypes.string,
    default: PropTypes.boolean
  }),
  poster: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  controls: PropTypes.boolean,
  id: PropTypes.string.isRequired,
  fallback: PropTypes.boolean,
  seekInterval: PropTypes.number,
  debug: PropTypes.boolean
}

// Assigning default values
PXVideo.defaultProps = {
  width: 640,
  height: 360,
  controls: true,
  fallback: true,
  seekInterval: 20,
  debug: true
}

ReactDOM.render(
  <PXVideo
    sources={[
      'https://www.paypalobjects.com/webstatic/mktg/videos/PayPal_AustinSMB_baseline.mp4',
      'https://www.paypalobjects.com/webstatic/mktg/videos/PayPal_AustinSMB_baseline.webm'
    ]}
    caption={{
      label: 'English captions',
      source: 'media/captions_PayPal_Austin_en.vtt',
      lang: 'EN',
      default: true
    }}
    poster="media/poster_PayPal_Austin2.jpg"
    width="640"
    height="360"
    controls={true}
    id="myvid"
    fallback={true}
  />
  , document.getElementById('app'))