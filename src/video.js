export const extractVideoType = src => {
  const splatByDot = src.split('.'),
    len = splatByDot.length

  return splatByDot[len - 1]
}

export const PXVideoInit = props => {
  const { id, caption, seekInterval, title, debug } = props

  const PXVideo = new InitPxVideo({
    "videoId": id,
    "captionsOnDefault": caption && caption.default,
    "seekInterval": seekInterval,
    "videoTitle": title,
    "debug": debug
  })

  return PXVideo
}