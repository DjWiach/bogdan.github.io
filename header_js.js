document.addEventListener('DOMContentLoaded', function() {

    // Объявляем переменную интервала в глобальной области видимости функции
    let waitForHeaderInterval = null; 

    // Функция настройки (чистая, она только вешает события)
    function setupHeader() {
        const hamburger = document.getElementById('hamburger-btn');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            console.log("Header: Elements found. Activating...");

            // --- Клик по бургеру ---
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-xmark');
                }
            });

            // --- Клик по ссылкам (закрытие меню) ---
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    
                    const icon = hamburger.querySelector('i');
                    if (icon && icon.classList.contains('fa-xmark')) {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                });
            });

            // ВАЖНО: Если интервал был запущен, останавливаем его
            if (waitForHeaderInterval) {
                clearInterval(waitForHeaderInterval);
            }
            
            console.log("Header: Ready.");
            return true;
        }
        return false;
    }

    // --- ЗАПУСК ---
    
    // 1. Пытаемся запустить сразу
    if (!setupHeader()) {
        
        // 2. Если не нашли элементы (они NULL), начинаем опрашивать страницу
        console.log("Header: Elements not found. Starting polling...");
        
        waitForHeaderInterval = setInterval(function() {
            
            if (setupHeader()) {
                // Если setupHeader вернул true, он сам очистит интервал (см. код выше)
            } else {
                // Защита от вечного цикла (остановка через 10 секунд)
                const now = Date.now();
                if (!window.__headerTimerStart) {
                    window.__headerTimerStart = now;
                }
                if (now - window.__headerTimerStart > 10000) { 
                    console.error("Header: Timeout. Elements did not appear.");
                    clearInterval(waitForHeaderInterval);
                }
            }
        }, 100);
    }

});