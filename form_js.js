document.addEventListener('DOMContentLoaded', function() {

    /* ===================== */
    /* === МОДАЛЬНОЕ ОКНО === */
    /* ===================== */
    const modal = document.getElementById('booking-modal');
    
    if (modal) {
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalTime = document.getElementById('modal-time');
        const modalPrice = document.getElementById('modal-price');
        const modalDesc = document.getElementById('modal-desc');
        const closeBtn = modal.querySelector('.modal__close');
        const openButtons = document.querySelectorAll('.send_btn');

        openButtons.forEach(button => {
            button.addEventListener('click', function() {
                modalTitle.textContent = this.dataset.title;
                modalTime.textContent = this.dataset.time;
                modalPrice.textContent = this.dataset.price;
                modalDesc.textContent = this.dataset.desc;

                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        }

        modal.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    /* ===================== */
    /* ==== ФОРМА ЗАПИСИ ==== */
    /* ===================== */
    const form = document.getElementById('booking-form');
    
    if (form) {
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const statusDiv = document.getElementById('form-status');
        const submitBtn = form.querySelector('.form-btn');

        // 1. Настройка маски
        const mask = new Inputmask({
            mask: "+7-999-999-99-99",
            showMaskOnHover: false,
            placeholder: "+7-___-___-__-__"
        });
        mask.mask(phoneInput);

        /* --- ФУНКЦИЯ ОТОБРАЖЕНИЯ СТАТУСА (перенесена наверх) --- */
        function showStatus(message, type = '') {
            statusDiv.textContent = message;
            statusDiv.className = 'form-status';
            if (type) {
                statusDiv.classList.add(type);
            }
        }

        // 2. Валидация и отправка
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // === ПРОВЕРКА ЧЕКБОКСА ===
            const acceptTermsCheckbox = document.getElementById('accept_terms');
            
            if (!acceptTermsCheckbox.checked) {
                showStatus('Вы не дали согласие на обработку персональных данных', 'error');
                acceptTermsCheckbox.focus();
                return;
            }

            if (nameInput.value.trim().length < 2) {
                showStatus('Введите корректное имя', 'error');
                nameInput.focus();
                return;
            }

            if (!Inputmask.isValid(phoneInput.value, { mask: "+7-999-999-99-99" })) {
                showStatus('Введите полный номер телефона', 'error');
                phoneInput.focus();
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            showStatus('');

            const formData = new FormData();
            formData.append('name', nameInput.value.trim());
            formData.append('phone', " "+phoneInput.value);

            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycby6OEfxc743hAFs8coHHaQDK6XlQtsFKK9W8ZtL_ke7KiqAT7GRwefkUDuNCH0HUjQ/exec', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    showStatus('Заявка успешно отправлена!', 'success');
                    form.reset();
                    mask.remove();
                    mask.mask(phoneInput);
                    //if (modal) modal.style.display = 'none'; 
                } else {
                    throw new Error('Серверная ошибка');
                }
            } catch (error) {
                showStatus('Ошибка сети. Попробуйте позже.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить';
            }
        });
    }

});