// ================================
// Contact Form JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        return; // Exit if not on contact page
    }

    const formMessage = document.getElementById('form-message');

    // ================================
    // Form Validation
    // ================================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\d\s\-\(\)]+$/;
        return phone === '' || re.test(phone);
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // ================================
    // Form Submission
    // ================================
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const budget = document.getElementById('budget').value;
        const message = document.getElementById('message').value.trim();
        const newsletter = document.getElementById('newsletter').checked;

        // Validation
        if (name === '') {
            showMessage('Por favor, preencha seu nome.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Por favor, insira um email válido.', 'error');
            return;
        }

        if (!validatePhone(phone)) {
            showMessage('Por favor, insira um telefone válido.', 'error');
            return;
        }

        if (subject === '') {
            showMessage('Por favor, selecione um assunto.', 'error');
            return;
        }

        if (message === '' || message.length < 10) {
            showMessage('Por favor, escreva uma mensagem com pelo menos 10 caracteres.', 'error');
            return;
        }

        // Prepare form data
        const formData = {
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            budget: budget,
            message: message,
            newsletter: newsletter,
            timestamp: new Date().toISOString()
        };

        // Disable submit button
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form Data:', formData);
            
            // Here you would typically send the data to a server
            // Example using Fetch API:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                showMessage('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
            */

            // For demo purposes, show success message
            showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve. 🎉', 'success');
            contactForm.reset();
            
            // Re-enable submit button
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Store in localStorage for demo
            const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('contact_submissions', JSON.stringify(submissions));
            
        }, 1500);
    });

    // ================================
    // Real-time Validation
    // ================================
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#ef4444';
            this.style.backgroundColor = '#fef2f2';
        } else {
            this.style.borderColor = '#10b981';
            this.style.backgroundColor = '#f0fdf4';
        }
    });

    emailInput.addEventListener('focus', function() {
        this.style.borderColor = '';
        this.style.backgroundColor = '';
    });

    phoneInput.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#ef4444';
            this.style.backgroundColor = '#fef2f2';
        } else if (this.value) {
            this.style.borderColor = '#10b981';
            this.style.backgroundColor = '#f0fdf4';
        }
    });

    phoneInput.addEventListener('focus', function() {
        this.style.borderColor = '';
        this.style.backgroundColor = '';
    });

    // ================================
    // Character Counter for Message
    // ================================
    const messageTextarea = document.getElementById('message');
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.style.cssText = 'text-align: right; color: #6b7280; font-size: 0.875rem; margin-top: 0.5rem;';
    messageTextarea.parentElement.appendChild(charCounter);

    messageTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        const maxLength = 500;
        charCounter.textContent = `${currentLength}/${maxLength} caracteres`;
        
        if (currentLength > maxLength) {
            this.value = this.value.substring(0, maxLength);
            charCounter.style.color = '#ef4444';
        } else if (currentLength > maxLength * 0.9) {
            charCounter.style.color = '#f59e0b';
        } else {
            charCounter.style.color = '#6b7280';
        }
    });

    // Trigger counter on page load
    messageTextarea.dispatchEvent(new Event('input'));

    // ================================
    // Phone Number Formatting
    // ================================
    phoneInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                this.value = value;
            } else if (value.length <= 6) {
                this.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length <= 10) {
                this.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
            } else {
                this.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
            }
        }
    });

    // ================================
    // Auto-save Form Data
    // ================================
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        // Load saved data
        const savedValue = localStorage.getItem(`form_${input.id}`);
        if (savedValue && input.type !== 'checkbox') {
            input.value = savedValue;
        } else if (savedValue && input.type === 'checkbox') {
            input.checked = savedValue === 'true';
        }

        // Save on input
        input.addEventListener('input', function() {
            if (this.type === 'checkbox') {
                localStorage.setItem(`form_${this.id}`, this.checked);
            } else {
                localStorage.setItem(`form_${this.id}`, this.value);
            }
        });
    });

    // Clear saved data on successful submission
    contactForm.addEventListener('submit', function() {
        formInputs.forEach(input => {
            localStorage.removeItem(`form_${input.id}`);
        });
    });

    // ================================
    // Newsletter Signup Animation
    // ================================
    const newsletterCheckbox = document.getElementById('newsletter');
    
    newsletterCheckbox.addEventListener('change', function() {
        if (this.checked) {
            const label = this.parentElement.querySelector('span');
            label.style.color = '#10b981';
            label.style.fontWeight = '600';
            setTimeout(() => {
                label.style.color = '';
                label.style.fontWeight = '';
            }, 1000);
        }
    });

    console.log('📧 Contact form loaded successfully!');
});

