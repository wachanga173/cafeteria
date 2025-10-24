
// Show/hide menu sections based on current time
document.addEventListener('DOMContentLoaded', function() {
	const now = new Date();
	const hour = now.getHours();

	const breakfastSection = document.getElementById('breakfast');
	const lunchSection = document.getElementById('lunch');
	const drinksSection = document.getElementById('drinks');

	// Hide all by default
	breakfastSection.style.display = 'none';
	lunchSection.style.display = 'none';
	drinksSection.style.display = 'none';

	// Breakfast: 7am - 11am
	if (hour >= 7 && hour < 11) {
		breakfastSection.style.display = '';
	}
	// Drinks: 11am - 9pm
	if (hour >= 11 && hour < 21) {
		drinksSection.style.display = '';
	}
	// Lunch: 12pm - 9pm
	if (hour >= 12 && hour < 21) {
		lunchSection.style.display = '';
	}

	// Add order buttons to each menu item
	function addOrderButtons(sectionId) {
		const section = document.getElementById(sectionId);
		if (!section) return;
		const rows = section.querySelectorAll('table tr');
		rows.forEach((row, idx) => {
			// Skip header row
			if (idx === 0) return;
			const itemCell = row.querySelector('td:first-child');
			const priceCell = row.querySelector('td.price');
			if (itemCell && priceCell) {
				const btn = document.createElement('button');
				btn.textContent = 'Order';
				btn.className = 'order-btn';
				btn.onclick = function() {
					addToOrder(itemCell.textContent, priceCell.textContent);
				};
				row.appendChild(btn);
			}
		});
	}

	addOrderButtons('breakfast');
	addOrderButtons('lunch');
	addOrderButtons('drinks');

	// Order logic
	const order = [];
	const orderSummary = document.getElementById('order-summary');
	const orderList = document.getElementById('order-list');
	const orderTotal = document.getElementById('order-total');
	const submitOrderBtn = document.getElementById('submit-order');

	function addToOrder(item, price) {
		order.push({ item, price });
		updateOrderSummary();
	}

	function updateOrderSummary() {
		orderSummary.style.display = order.length ? '' : 'none';
		orderList.innerHTML = '';
		let total = 0;
		order.forEach(({ item, price }, idx) => {
			const li = document.createElement('li');
			li.textContent = `${item} - ${price}`;
			orderList.appendChild(li);
			total += parseFloat(price.replace(/[^\d.]/g, ''));
		});
		orderTotal.textContent = `Total: $${total.toFixed(2)}`;
	}

	if (submitOrderBtn) {
		submitOrderBtn.onclick = function() {
			alert('Thank you for your order!');
			order.length = 0;
			updateOrderSummary();
		};
	}
});

