<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const canvas = document.getElementById('canvas') as HTMLCanvasElement;
		const ctx = canvas.getContext('2d');

		initialize();

		function initialize() {
			// Register an event listener to call the resizeCanvas() function
			// each time the window is resized.
			window.addEventListener('resize', resizeCanvas, false);
			// Draw canvas border for the first time.
			resizeCanvas();
		}

		// Runs each time the DOM window resize event fires.
		// Resets the canvas dimensions to match window,
		// then draws the new borders accordingly.
		function resizeCanvas() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		if (ctx) {
			const size = 10;

			let quantity = 2000;
			let x = Math.random() * canvas.width;
			let y = 0;
			let alpha = Math.random() * 2 * Math.PI;
			let lastRender = Date.now();
			let speed = 5;
			const stripes = [];
			const heights = [];
			for (let i = 0; i < quantity; i++) {
				stripes.push(quantity * -50 * Math.random());
				heights.push(100 * Math.random());
			}
			const render = () => {
				ctx.fillStyle = 'blue';
				// ctx.canvas.width = window.innerWidth;
				// ctx.canvas.height = window.innerHeight;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				const W = Math.ceil(canvas.width / stripes.length);
				for (let i = 0; i < stripes.length; i++) {
					let H = stripes[i];
					if (H < canvas.height) {
						H += speed;
					} else {
						H = quantity * -50 * Math.random();
					}
					stripes[i] = H;
					ctx.fillRect(Math.round(i * W), H, Math.round(W), heights[i]);
				}
				requestAnimationFrame(render);
			};
			render();
		}
	});
</script>

<canvas id="canvas" class="absolute top-0 left-0 -z-10 opacity-50"></canvas>
