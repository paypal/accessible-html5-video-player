<img src="images/logo_347x50_PPa11y.png" width="347" height="50" alt="PayPal accessibility logo" />

#Accessible HTML5 Video Player

## by the PayPal Accessibility Team
See the [Authors](#authors) section below for details.

## What is it?
A lightweight HTML5 video player which includes support for captions and screen reader accessibility. For details, read the blog post [Introducing an Accessible HTML5 Video Player](https://www.paypal-engineering.com/2014/09/05/introducing-an-accessible-html5-video-player/) on the PayPal Engineering blog.

## Features
- Provides an HTML5 video player with custom controls.
- Supports captions; simply denote a VTT caption file using the standard HTML5 video syntax.
- Uses native HTML5 form controls for volume (range input) and progress indication (progress element).
- Accessible to keyboard-only users and screen reader users.
- Option provided to set captions on or off by default (upon loading).
- Option provided to set number of seconds by which to rewind and forward.
- Text strings for the controls are externalized to allow for internationalization (fall 2015).
- No dependencies. Written in "vanilla" JavaScript.
- When JavaScript is unavailable, the browser's native controls are used.

## Implementation

###CSS and Image
Insert the CSS in the Head of your HTML document. You'll also need to upload the sprite image (or use your own) and adjust the path in the CSS file.

```html
<link rel="stylesheet" href="/css/px-video.css" />
```

###HTML
Insert the HTML5 video markup in the Body of your HTML document. Replace the video, poster, and caption URLs. Modify the sizes of video and fallback image as needed.
```html
<div class="px-video-container" id="myvid">
	<div class="px-video-img-captions-container">
		<div class="px-video-captions hide" aria-hidden="true"></div>
		<video width="640" height="360" poster="media/foo.jpg" controls>
			<source src="foo.mp4" type="video/mp4" />
			<source src="foo.webm" type="video/webm" />
			<track kind="captions" label="English captions" src="media/foo.vtt" srclang="en" default />
			<div>
				<a href="foo.mp4">
					<img src="media/foo.jpg" width="640" height="360" alt="download video" />
				</a>
			</div>
		</video>
	</div>
	<div class="px-video-controls"></div>
</div>
```

###JavaScript
Insert two JavaScript files right before the closing Body element of your HTML document. Add a Script element to initialize the video. Options are passed in JSON format. The options are:

- videoId: the value of the ID of the widget container (string) [required]
- captionsOnDefault: denotes whether to show or hide caption upon loading (boolean) [optional, default is true]
- seekInterval: the number of seconds to rewind and fast forward (whole number) [optional, default is 10]
- videoTitle: short title of video; used for aria-label attribute on Play button to clarify to screen reader user what will be played (text) [optional, default is "Play"]
- debug: turn console logs on or off (boolean) [optional, default is false]

```html
<script src="js/strings.js"></script>
<script src="js/px-video.js"></script>
<script>
// Initialize
new InitPxVideo({
	"videoId": "myvid",
	"captionsOnDefault": true,
	"seekInterval": 20,
	"videoTitle": "clips of stand-up comedy",
	"debug": true
});
</script>
```

## Live Demo
[View Demo](http://paypal.github.io/accessible-html5-video-player/)

## Feedback and Contributions
If you experience any errors or if you have ideas for improvement, please feel free to open an issue or send a pull request.

You can also follow and contact the PayPal Accessibility team on Twitter: [@PayPalInclusive](https://twitter.com/paypalinclusive)

## Authors
The original authors of this project are:
- Dennis Lembree, primary developer || [https://github.com/weboverhauls](https://github.com/weboverhauls) || [@dennisl](https://twitter.com/dennisl)
- Victor Tsaran, consultation and testing || [https://github.com/vick08](https://github.com/vick08) || [@vick08](https://twitter.com/vick08)
- Jason Gabriele, consultation
- Tim Resudek, design

## Browser Support
- Chrome: full support.
- Safari: full support.
- Firefox: full support.
- Internet Explorer 10, 11: full support.
- Internet Explorer 9: native video player used (aesthetic choice since HTML5 range input and progress element are not supported).
- Internet Explorer 8: renders fallback content of video element (in the demo, this is an image linked to the video file).
- Smartphones and tablets: controls and captions are not customized as both are natively supported in latest versions.

## Limitations and Known Issues
- Currently, only one caption file per video is supported.
- Only VTT caption files are supported (not SRT nor TTML). VTT cue settings are not supported but inline styles function (see first few lines of example).
- The controls have a minimum width of 360px.

## Related Resources
- [HTML5 Video Events and API](http://www.w3.org/2010/05/video/mediaevents.html) - by W3C
- [Adding captions and subtitles to HTML5 video](https://developer.mozilla.org/en-US/Apps/Build/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video#Internet_Explorer) - by MDN
- [Simple SubRip to WebVTT converter](https://atelier.u-sub.net/srt2vtt/) - tool to convert SRT captions to WebVTT
- [Able Player](https://github.com/ableplayer/ableplayer) - accessible cross-browser media player by Terrill Thompson

### Projects influenced by the PayPal Accessible HTML5 Video Player
- [Universal Video Player](https://source.ind.ie/project/video-player) - by Ind.ie, @LauraKalbag
- [Plyr](https://github.com/selz/plyr) - by @sam_potts, @selz

## Copyright and License
Copyright 2014, PayPal under [the BSD license](LICENSE.md).

