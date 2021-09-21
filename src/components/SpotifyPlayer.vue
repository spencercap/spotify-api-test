<template>
	<div class="d-flex flex-column">
		spotify player
		<input v-model="spot.accessToken" type="text" placeholder="spotify access token">

		<!-- <div>

		</div> -->
		<button @click="play">
			play
		</button>
		<button @click="pause">
			pause
		</button>

		<div style="width: fit-content;">
			<input
				v-model.number="spot.vol"
				id="volControl"
				type="range"
				min="0.00"
				max="1.00"
				step="0.01"
				@change="setVolume(spot.vol)"
			>
			<label for="volControl" style="width: 80px; padding: 0 10px;">
				{{ spot.vol }}
			</label>
		</div>

		<!-- <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			bewm: 'skeet',
			spot: {
				accessToken: 'BQAd6RByFPxA-1W2grLrxrCYO4dLBodMuQ-NOElf3H3-MSnc8EsVC_KuWp7ELiNEf2wrGAGq3Q1NcZMwMorzvM2LlI_XifuLFdoTWF3E-ji4OhMM2oH1E8qIA-OrqwMaL2IEEU7e2SA2AJxZ6A6rhoGJul9vCZ1fRT0',
				vol: 0.5
			},
			player: null as any
		}
	},
	mounted() {
		console.log('SpotifyPlayer mounted');

		setTimeout(() => {
			this.initPlayer();
		}, 1000);
	},
	methods: {
		async initPlayer() {
			console.log('initPlayer');

			if (this.spot.accessToken) {
				// we have a token, set it for the API
				// API
				// SpotifyUtils.setAccessToken(this.$root.accessToken.accessToken);

				const tok = this.spot.accessToken;
				this.player = new window.Spotify.Player({
				// const player = new window.Spotify.Player({
					name: 'Spot API test player',
					getOAuthToken: (callback: (token: string) => void) => {
						// Run code to get a fresh access token
						// as needed
						callback(tok);
					},
					volume: 0.1 // initial volume
				});

				if (this.player) {
					this.player.addListener(
						'ready',
						({ device_id }: { device_id: string }) => {
							console.log('player object is ready');
							console.log(device_id);
							// this.deviceId = device_id;

							// always start playing superfreak
							// try some playback!
							// SpotifyUtils.play(
							// 	['spotify:track:2dCmGcEOQrMQhMMS8Vj7Ca'],
							// 	device_id
							// );
						}
					);

					// helpful for arbitray ended events + for volume control from elsewhere
					this.player.addListener('player_state_changed', (state: any) => {
						console.log('player_state_changed', state);

						// if (state && !state.loading) {
						// 	// if (!state.paused) {
						// 	// }
						// 	this.localPaused = state.paused;
						// }
					});

					const connect = await this.player.connect();
					console.log('player connect', connect);

					// bus.on('spot-vol-set', async (v: number) => {
					// 	// console.log('bus on: spot-vol-set', v);
					// 	await this.player.setVolume(v);
					// });

					// bus.on('spot-vol-duck', async (isDucking: boolean) => {
					// 	// console.log('bus on: spot-vol-duck', isDucking);
					// 	let vol = this.volOps[this.volIdx];

					// 	if (isDucking) {
					// 		// await this.player.setVolume(0.25);
					// 		await this.player.setVolume(0.25 * vol); // 25% volume
					// 	} else {
					// 		// resume volume
					// 		// let vol = this.volOps[this.volIdx];
					// 		await this.player.setVolume(vol);
					// 	}
					// });
				} else {
					console.warn('no player!');
				}
			} else {
				console.warn('there is no token!');
			}

		},

		async setVolume(val: number) {
			console.log('setVolume', val);

			if (this.player) {
				await this.player.setVolume(val);
			}
		},

		play() {
			if (this.player) {
				this.player.togglePlay();
			}
		},
		pause() {
			if (this.player) {
				this.player.pause();
			}
		}
	}
});
</script>

<style scoped>

</style>
