
const notificationTemplate = (message) => `<div class="notification">
	<span class="notification__message">${message}</span>
	<button id="notificationClose" class="notitication__close">close</button>
</div>`;

let closeTimeout = null;

/**
 * @param {Event} evt An optional event if called by an event listener
 **/
function closeNotification(evt) {
	// If we are triggered by an event listener prevent the default actions
	if(evt && evt.preventDefault) {
		evt.preventDefault();
	}

	// Get the notification and add the closing class to animate exit
	const notification = document.getElementById('notification');
	notification.classList.add('notification--close');
	// After half a second remove the notification element
	notification.parentNode.removeChild(notification)
}

/**
 * Show a notification message
 * @param {string} message The notification message to show
 **/
function showNotification(message) {
	// Cancel the close timeout for any existing notifications
	if(closeTimeout) {
		clearTimeout(closeTimeout);
	}

	// Load the notification and if it does not exist create one
	let notification = document.getElementById('notification');
	if(!notification) {
		notification = document.createElement('div');
		notification.id = 'notification';
		document.body.appendChild(notification);
	}

	// Populate the notification with our HTML and message
	notification.innerHTML = notificationTemplate(message);

	// Add close event and timeout
	notification
		.querySelector('#notificationClose')
		.addEventListener('click', closeNotification);
	closeTimeout = setTimeout(closeNotification, 5000);
}

export default showNotification;
