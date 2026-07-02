const db = {
    hotel: { title: "Заселение в отель", img: "hotel.jpg", fallback: "🏨", desc: "Прибытие в Конаклы, заселение.", dist: "120 км от аэропорта Антальи", route: "Автобус от туроператора (трансфер)", cost: "Включено в стоимость тура", time: "Около 1 часа на ресепшене", cloth: "Удобная дорожная одежда", pack: "Паспорта, ваучеры, мелкие деньги", hack: "Попросите номер потише, чтобы маме и брату было комфортно отдыхать.", geo: "36.5864,31.8617" },
    beach: { title: "Пляж Конаклы", img: "beach.jpg", fallback: "🏖️", desc: "Первый выход к море всей семьей.", dist: "Пару минут от номера", route: "Пешком по территории отеля", cost: "Бесплатно", time: "До ужина (1.5 - 2 часа)", cloth: "Купальники, плавки, головные уборы", pack: "Крем SPF 50, полотенца, воду", hack: "Вход в воду местами с плитами, будьте аккуратны с младшим братом.", geo: "36.5831,31.8622" },
    damlatas: { title: "Пещера Дамлаташ", img: "damlatas.jpg", fallback: "🦇", desc: "Пещера с целебным воздухом у пляжа Клеопатры.", dist: "12 км от Конаклы", route: "Долмуш Конаклы-Аланья (№50)", cost: "~125 лир (~400 руб) за троих", time: "30 минут достаточно", cloth: "Обычная легкая", pack: "Лиры на билеты", hack: "Внутри очень влажно, отличная передышка от жары для мамы.", geo: "36.5419,31.9892" },
    teleferik: { title: "Канатная дорога (Teleferik)", img: "teleferik.jpg", fallback: "🚡", desc: "Фуникулер, поднимающий на гору к крепости.", dist: "200 метров от пещеры Дамлаташ", route: "Пешком 2 минуты по стрелкам", cost: "~750 лир (~2 400 руб) туда-обратно за троих", time: "10 минут в одну сторону", cloth: "Кепки/панамы обязательно", pack: "Телефон для панорамных видео", hack: "Брату (9 лет) точно понравится высота, садитесь слева при подъеме!", geo: "36.5431,31.9897" },
    castle: { title: "Крепость Аланьи", img: "castle.jpg", fallback: "🏰", desc: "Древний замок со смотровыми площадками на закат.", dist: "На вершине горы", route: "Канатная дорога привезет прямо к стенам", cost: "Прогулка бесплатно, вход в замок ~500 лир (~1 600 руб) за троих", time: "Минимум 1.5 - 2 часа", cloth: "Удобные кроссовки (дорожки каменные)", pack: "Пауэрбанк и бутылку воды каждому", hack: "Мы приедем сюда к 18:00 — жара спадет, маме не будет тяжело идти в гору.", geo: "36.5332,31.9904" },
    ship: { title: "Пиратский корабль", img: "ship.jpg", fallback: "🏴‍☠️", desc: "Морская прогулка на яхте с анимацией для детей.", dist: "Из отеля до порта Аланьи", route: "Экскурсионный трансфер заберет из Конаклы", cost: "~$80 (~7 600 руб) за троих (обед включен)", time: "С 10:00 до 15:30 (полдня)", cloth: "Купальники, сверху шорты и майки", pack: "Полотенца, сухую сменную одежду, коралки", hack: "Для брата будет пенная дискотека, а вы с мамой сможете отдохнуть на верхней палубе.", geo: "36.5415,32.0022" }
};

let currentActiveKey = '';

window.onload = function() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
   
    if (month === 6 && day === 28) { switchDay(2); if(document.getElementById('liveDate')) document.getElementById('liveDate').innerText = "Сегодня: 28 июля 2026 г."; }
    else if (month === 6 && day === 29) { switchDay(3); if(document.getElementById('liveDate')) document.getElementById('liveDate').innerText = "Сегодня: 29 июля 2026 г."; }
    else { switchDay(1); if(document.getElementById('liveDate')) document.getElementById('liveDate').innerText = "Сегодня: 27 июля 2026 г. (День 1)"; }
};

function switchDay(dayNum) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.route-container').forEach(c => c.classList.remove('active'));
    
    const btn = document.getElementById(`btn-day-${dayNum}`);
    const container = document.getElementById(`day-${dayNum}`);
    if (btn) btn.classList.add('active');
    if (container) container.classList.add('active');
    window.scrollTo(0, 0)
    updateProgress()
}

function openReport(key) {
    currentActiveKey = key;
    const data = db[key];
   
    if(document.getElementById('m-title')) document.getElementById('m-title').innerText = data.title;
    
    const mainImg = document.getElementById('m-img');
    if (mainImg) {
        mainImg.src = data.img;
        mainImg.onerror = function() {
            this.style.display = 'none';
            const box = document.getElementById('m-img-box');
            if(box) box.innerText = data.fallback;
        };
        mainImg.style.display = 'block';
    }
   
    if(document.getElementById('m-desc')) document.getElementById('m-desc').innerText = data.desc;
    if(document.getElementById('m-dist')) document.getElementById('m-dist').innerText = data.dist;
    if(document.getElementById('m-route')) document.getElementById('m-route').innerText = data.route;
    if(document.getElementById('m-cost')) document.getElementById('m-cost').innerText = data.cost;
    if(document.getElementById('m-time')) document.getElementById('m-time').innerText = data.time;
    if(document.getElementById('m-cloth')) document.getElementById('m-cloth').innerText = data.cloth;
    if(document.getElementById('m-pack')) document.getElementById('m-pack').innerText = data.pack;
    if(document.getElementById('m-hack')) document.getElementById('m-hack').innerText = data.hack;
   
    if(document.getElementById('m-map-link')) document.getElementById('m-map-link').href = `https://yandex.ru/maps/?text=${data.geo}`;
   
    const node = document.getElementById(`node-${key}`);
    const isVisited = node ? node.classList.contains('visited') : false;
    updateSheetButtonState(isVisited);
   
    if(document.getElementById('overlay')) document.getElementById('overlay').style.display = 'block';
    const sheet = document.getElementById('sheet');
    if (sheet) {
        sheet.style.display = 'flex';
        sheet.classList.add('open');
    }
}
       
function closeReport() {
    if(document.getElementById('overlay')) document.getElementById('overlay').style.display = 'none';
    const sheet = document.getElementById('sheet');
    if (sheet) {
        sheet.classList.remove('open');
        sheet.style.display = 'none';
    }
}

function updateProgress() {
    const activeContainer = document.querySelector('.route-container.active');
    if (!activeContainer) return;

    const allNodes = activeContainer.querySelectorAll('.location-node');
    const visitedNodes = activeContainer.querySelectorAll('.location-node.visited');
    
    const total = allNodes.length;
    const done = visitedNodes.length;
    
    const progressText = document.getElementById('progress-text');
    if (progressText) {
        progressText.innerText = `${done} из ${total} локаций пройдено`;
    }

    const bar = document.getElementById('progress-bar-fill');
    if (bar && total > 0) {
        bar.style.width = (done / total) * 100 + '%';
    }
}

function toggleVisited(event, id) {
    event.stopPropagation();
    
    const node = document.getElementById('node-' + id);
    if (!node) return;
    
    node.classList.toggle('visited');
    
    // Сохраняем состояние в localStorage
    localStorage.setItem('visited-' + id, node.classList.contains('visited'));
    
    // Обновляем прогресс
    updateProgress();
    
    // Вибрация
    if (navigator.vibrate) navigator.vibrate(100);
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Восстанавливаем галочки
    document.querySelectorAll('.location-node').forEach(node => {
        const id = node.id.replace('node-', '');
        if (localStorage.getItem('visited-' + id) === 'true') {
            node.classList.add('visited');
        }
    });

    // 2. Обновляем прогресс
    updateProgress();

    // 3. Восстанавливаем скролл с небольшой задержкой
    setTimeout(() => {
        const savedPos = localStorage.getItem('scrollPos');
        if (savedPos) {
            window.scrollTo(0, parseInt(savedPos));
        }
    }, 100); // 100 миллисекунд подождем, пока картинки прогрузятся
});

function checkDayCompletion(dayId) {
    const dayContainer = document.getElementById(dayId);
    const nodes = dayContainer.querySelectorAll('.location-node');
    
    // Проверяем: ВСЕ ли локации имеют класс .visited
    const allCompleted = Array.from(nodes).every(n => n.classList.contains('visited'));
    
    const tabBtn = document.getElementById(`btn-${dayId}`);
    
    if (allCompleted) {
        tabBtn.classList.add('day-completed');
    } else {
        tabBtn.classList.remove('day-completed');
    }
}



function clickSheetAction() {
    toggleVisited(null, currentActiveKey);
    closeReport();
}

function updateSheetButtonState(isVisited) {
    const btn = document.getElementById('m-action-btn');
    if (btn) {
        if (isVisited) {
            btn.innerText = "Убрать из посещенных";
            btn.classList.add('btn-visited');
            btn.classList.remove('btn-primary');
        } else {
            btn.innerText = "Отметить как пройденное";
            btn.classList.remove('btn-visited');
            btn.classList.add('btn-primary');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Находим все элементы, у которых есть ID, начинающийся с 'node-'
    const allLocations = document.querySelectorAll('.location-node');
    
    allLocations.forEach(node => {
        const id = node.id.replace('node-', ''); // Получаем имя локации (например, 'hotel')
        const savedStatus = localStorage.getItem('status-' + id);
        
        if (savedStatus === 'true') {
            node.classList.add('visited');
        }
    });
});

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    const themeBtn = document.getElementById('theme-toggle');
    
    // Меняем текст кнопки
    if (isDark) {
        themeBtn.textContent = 'Light';
        localStorage.setItem('theme', 'dark');
    } else {
        themeBtn.textContent = 'Dark';
        localStorage.setItem('theme', 'light');
    }
}

// При загрузке страницы проверяем тему и ставим правильный текст
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.getElementById('theme-toggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.textContent = 'Light';
    } else {
        themeBtn.textContent = 'Dark';
    }
});

// Этот код выполнится сразу при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    ['day-1', 'day-2', 'day-3'].forEach(dayId => {
        // Проверяем, есть ли запись в памяти
        if (localStorage.getItem('day-completed-' + dayId) === 'true') {
            const btn = document.getElementById('btn-' + dayId);
            if (btn) btn.classList.add('day-completed');
        }
    });
});

if (allVisited) {
        tabBtn.classList.add('day-completed');
        localStorage.setItem('day-completed-' + dayId, 'true');
        
        // Вибрация телефона (если браузер поддерживает)
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]); // Короткий двойной "тычок"
        }
    }

function refreshProgress() {
    // Находим контейнер, у которого есть класс .active (тот, что сейчас на экране)
    const activeContainer = document.querySelector('.route-container.active');
    
    if (!activeContainer) {
        document.getElementById('progress-text').innerText = "Данные не найдены";
        return;
    }

    // Ищем локации ВНУТРИ этого активного контейнера
    const nodes = activeContainer.querySelectorAll('.location-node');
    const visited = activeContainer.querySelectorAll('.location-node.visited');
    
    const total = nodes.length;
    const done = visited.length;
    
    // Обновляем текст
    const progressText = document.getElementById('progress-text');
    if (progressText) {
        progressText.innerText = `${done} из ${total} локаций пройдено`;
    }

    // Обновляем полоску (если она есть)
    const bar = document.getElementById('progress-bar-fill');
    if (bar && total > 0) {
        const percent = (done / total) * 100;
        bar.style.width = percent + '%';
    }
}

function updateProgress() {
    // Берем ВСЕ локации, которые есть на активной странице
    const allNodes = document.querySelectorAll('.route-container.active .location-node');
    // Берем ВСЕ локации, которые имеют статус .visited
    const visitedNodes = document.querySelectorAll('.route-container.active .location-node.visited');
    
    const total = allNodes.length;
    const done = visitedNodes.length;
    
    // Обновляем текст
    const progressText = document.getElementById('progress-text');
    if (progressText) {
        progressText.innerText = `${done} из ${total} локаций пройдено`;
    }
    
    // Обновляем полоску
    const bar = document.getElementById('progress-bar-fill');
    if (bar && total > 0) {
        bar.style.width = (done / total) * 100 + '%';
    }
}

// 1. Сохраняем позицию скролла перед уходом со страницы
window.addEventListener('beforeunload', () => {
    localStorage.setItem('scrollPos', window.scrollY);
});

// 2. Восстанавливаем скролл при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const savedPos = localStorage.getItem('scrollPos');
    if (savedPos) {
        window.scrollTo(0, parseInt(savedPos));
    }
});

window.addEventListener('scroll', function() {
    localStorage.setItem('scrollPos', window.scrollY);
}, { passive: true }); // passive: true помогает браузеру работать быстрее

// 2. ВОССТАНОВЛЕНИЕ при загрузке
window.addEventListener('load', function() {
    const savedPos = localStorage.getItem('scrollPos');
    if (savedPos !== null) {
        // Пробуем восстановить с задержкой
        setTimeout(function() {
            window.scrollTo(0, parseInt(savedPos));
            console.log("Скролл восстановлен на:", savedPos);
        }, 300);
    }
});
