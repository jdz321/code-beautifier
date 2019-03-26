const span = document.querySelector('#time-now');

export default function update() {
	span.textContent = new Date().toISOString();
	setTimeout(update, 1000);
}