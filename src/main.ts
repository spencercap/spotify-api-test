import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

// css
import './css/basics.css';

// globals
declare global {
	interface Window {
		onSpotifyWebPlaybackSDKReady: any;
		spotifyPlayer: any;
		Spotify: any;
	}
}

// spotify player logistics, we MUST load their
// player api from an https request, can't build with it
window.onSpotifyWebPlaybackSDKReady = () => {
	console.log('spot sdk playback ready');

	// window.spotifyPlayer = new window.Spotify.Player({
	// 	name: 'Superfreak Player'
	// });
};

app.mount('#app');
