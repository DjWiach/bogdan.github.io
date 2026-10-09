document.addEventListener('DOMContentLoaded', function() {
    /* --- ЭЛЕМЕНТЫ --- */
    const ageOverlay = document.getElementById('age-verify-overlay');
    const ageYes = document.getElementById('age-yes');
    const ageNo = document.getElementById('age-no');

    /* --- ФУНКЦИИ РАБОТЫ С КУКИ (оставлены только нужные) --- */
   function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    // Добавлен атрибут Secure
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax; Secure";
}

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i=0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /* --- ЛОГИКА ПРОВЕРКИ ВОЗРАСТА --- */

    // Проверяем, подтверждал ли пользователь возраст ранее
    if (getCookie('ageVerified') !== 'true') {
        // Если куки нет или она false/undefined - показываем окно
        ageOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; /* Блокируем прокрутку сайта */
    }

    // Если нажал "Да, мне есть 18"
    ageYes.addEventListener('click', function() {
        // Запоминаем выбор на 1 год
        setCookie('ageVerified', 'true', 365); 
        
        // Скрываем окно и возвращаем прокрутку
        ageOverlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Если нажал "Нет"
    ageNo.addEventListener('click', function() {
        // Перенаправляем на другую страницу (например, Яндекс или заглушку)
        window.location.href = 'https://ya.ru'; 
    });

    // Дополнительное закрытие по клавише Escape (опционально, но рекомендуется)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && ageOverlay.style.display === 'flex') {
            ageOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});