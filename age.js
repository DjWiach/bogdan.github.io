document.addEventListener('DOMContentLoaded', function() {
    /* --- ЭЛЕМЕНТЫ --- */
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const cookieBtn = document.getElementById('cookie-consent-btn');
    const ageOverlay = document.getElementById('age-verify-overlay');
    const ageYes = document.getElementById('age-yes');
    const ageNo = document.getElementById('age-no');

    /* --- ФУНКЦИИ РАБОТЫ С КУКИ --- */
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
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

    /* --- ЛОГИКА ПОСЛЕДОВАТЕЛЬНОСТИ --- */

    // Шаг 1: Проверяем согласие на куки
    if (getCookie('cookieConsent') !== 'true') {
        // Если согласия нет - показываем баннер куки
        cookieBanner.style.display = 'flex';
        
        // И ВЫХОДИМ из функции (ничего больше не проверяем, пока куки не приняты)
        cookieBtn.addEventListener('click', function onCookieAccept() {
            setCookie('cookieConsent', 'true', 365);
            cookieBanner.style.display = 'none';
            
            // Убиваем этот обработчик, чтобы он не сработал дважды
            cookieBtn.removeEventListener('click', onCookieAccept);
            
            // Шаг 2: Только ПОСЛЕ принятия куки проверяем возраст
            checkAgeVerification();
        });
    } else {
        // Если куки уже приняты ранее - сразу проверяем возраст
        checkAgeVerification();
    }

    // Функция проверки возраста (вынесена отдельно для чистоты кода)
    function checkAgeVerification() {
        if (getCookie('ageVerified') !== 'true') {
            ageOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        ageYes.addEventListener('click', function onAgeAccept() {
            setCookie('ageVerified', 'true', 365);
            ageOverlay.style.display = 'none';
            document.body.style.overflow = '';
            ageYes.removeEventListener('click', onAgeAccept);
        });

        ageNo.addEventListener('click', function() {
            window.location.href = 'https://ya.ru';
        });
    }

});