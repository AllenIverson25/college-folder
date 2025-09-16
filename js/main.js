document.addEventListener('DOMContentLoaded', function () {
	// Smooth scrolling for internal links
	document.querySelectorAll('a[href^="#"]').forEach(link => {
		link.addEventListener('click', function (e) {
			const targetId = this.getAttribute('href');
			if (targetId.length > 1) {
				e.preventDefault();
				const el = document.querySelector(targetId);
				if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});

	// Program card: show/hide details
	document.querySelectorAll('.more-info').forEach(btn => {
		btn.addEventListener('click', function () {
			const target = document.querySelector(this.dataset.target);
			if (!target) return;
			// toggle visibility
			target.classList.toggle('d-none');
			target.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	});

	// Tuition calculator
	const tuitionForm = document.getElementById('tuitionForm');
	if (tuitionForm) {
		tuitionForm.addEventListener('submit', function (e) {
			e.preventDefault();
			const perCredit = parseFloat(document.getElementById('tuitionPerCredit').value) || 0;
			const credits = parseFloat(document.getElementById('credits').value) || 0;
			const scholarship = parseFloat(document.getElementById('scholarship').value) || 0;
			const total = (perCredit * credits) - scholarship;
			const display = document.getElementById('tuitionResult');
			display.textContent = `$${total.toFixed(2)}`;
		});
	}

	// Inquiry form validation and modal confirmation
	const inquiryForm = document.getElementById('inquiryForm');
	if (inquiryForm) {
		inquiryForm.addEventListener('submit', function (e) {
			e.preventDefault();
			if (!inquiryForm.checkValidity()) {
				inquiryForm.classList.add('was-validated');
				return;
			}

			// Show bootstrap modal to confirm (without sending to server)
			const modalEl = document.getElementById('inquiryModal');
			const modal = new bootstrap.Modal(modalEl);
			modal.show();

			// Clear form after submit
			inquiryForm.reset();
			inquiryForm.classList.remove('was-validated');
		});
	}

	// Highlight active section in navbar on scroll
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.nav-link');
	function onScroll() {
		const scrollPos = window.scrollY + 120;
		sections.forEach(sec => {
			if (sec.offsetTop <= scrollPos && (sec.offsetTop + sec.offsetHeight) > scrollPos) {
				navLinks.forEach(a => {
					const href = a.getAttribute('href');
					if (href === `#${sec.id}`) {
						a.classList.add('active');
					} else {
						a.classList.remove('active');
					}
				});
			}
		});
	}
	window.addEventListener('scroll', onScroll);
	onScroll();
});
