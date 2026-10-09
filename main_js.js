document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalTime = document.getElementById('modal-time');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.modal__close');
    const openButtons = document.querySelectorAll('.gallery__btn');

    // Функция открытия модалки
    openButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Получаем данные из атрибутов кнопки
            const imgSrc = this.closest('.gallery__card').querySelector('.gallery__bg-image img').src;
            
            modalImg.src = imgSrc;
            modalTitle.textContent = this.dataset.title;
            modalTime.textContent = this.dataset.time;
            modalPrice.textContent = this.dataset.price;
            modalDesc.textContent = this.dataset.desc;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; /* Блокируем прокрутку страницы */
        });
    });

    // Закрытие по крестику
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; /* Возвращаем прокрутку */
    }

    // Закрытие по клику мимо окна
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Закрытие по кнопке Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
