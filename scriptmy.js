document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const randomColorBtn = document.getElementById('randomColorBtn');
    const verifyAgeBtn = document.getElementById('verifyAgeBtn');
    const ageResult = document.getElementById('ageResult');
    const addTagBtn = document.getElementById('addTagBtn');
    const newTagInput = document.getElementById('newTagInput');
    const tagsContainer = document.querySelector('.tags');
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
                                                                //Здесь ерунда для фана
    const nameInput = document.getElementById('nameInput');
    const changeNameBtn = document.getElementById('changeNameBtn');
    const fullNameElement = document.getElementById('fullName');
    // Функция изменения имени
function changeName() {
  const newName = nameInput.value.trim();
  if (newName) {
    fullNameElement.textContent = newName;
    // Сохраняем в localStorage с учетом темы
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    localStorage.setItem(`userName_${theme}`, newName);
    nameInput.value = '';
  } else {
    alert('Пожалуйста, введите имя и фамилию');
  }
}

// Обработчики событий
changeNameBtn.addEventListener('click', changeName);
nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') changeName();
});

// Восстановление имени при загрузке
document.addEventListener('DOMContentLoaded', function() {
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  const savedName = localStorage.getItem(`userName_${theme}`);
  if (savedName) {
    fullNameElement.textContent = savedName;
  }
});

// Обновите обработчик смены темы, чтобы сохранялось имя для каждой темы
themeToggle.addEventListener('change', function() {
  // ... ваш существующий код смены темы ...
  
  // Сохраняем текущее имя перед сменой темы
  const currentTheme = this.checked ? 'dark' : 'light';
  const nextTheme = this.checked ? 'light' : 'dark';
  localStorage.setItem(`userName_${currentTheme}`, fullNameElement.textContent);
  
  // Восстанавливаем имя для новой темы
  const savedName = localStorage.getItem(`userName_${nextTheme}`) || 'Косьмин Павел';
  fullNameElement.textContent = savedName;
});
                                                                //Конец ерунды
    // 1. Функция случайного цвета фона
    randomColorBtn.addEventListener('click', function() {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        document.body.style.backgroundColor = randomColor;
    });

    // 2. Функция проверки возраста
    verifyAgeBtn.addEventListener('click', verifyAge);

    function verifyAge() {
        while (true) {
            const ageInput = prompt("Пожалуйста, введите ваш возраст:");
            
            if (ageInput === null) {
                ageResult.textContent = "Вы отменили ввод возраста.";
                ageResult.style.display = 'block';
                break;
            }
            
            const age = parseInt(ageInput);
            if (isNaN(age)) {
                alert("Пожалуйста, введите числовое значение.");
                continue;
            }
            
            const isConfirmed = confirm(`Вы уверены, что вам ${age}?`);
            
            if (isConfirmed) {
                ageResult.textContent = `Ваш возраст (${age} лет) успешно подтвержден!`;
                ageResult.style.display = 'block';
                break;
            }
        }
    }

    // 3. Функция добавления хэштегов
    addTagBtn.addEventListener('click', addNewTag);
    
    // Обработка нажатия Enter
    newTagInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewTag();
        }
    });

    function addNewTag() {
        const tagText = newTagInput.value.trim();
        
        if (!tagText) {
            alert('Пожалуйста, введите хэштег');
            return;
        }
        
        if (/\s/.test(tagText)) {
            alert('Хэштег не должен содержать пробелов!');
            return;
        }
        
        const formattedTag = tagText.startsWith('#') ? tagText : `#${tagText}`;
        
        // Создаем элементы
        const tagWrapper = document.createElement('div');
        tagWrapper.className = 'tag-wrapper';
        
        const newTag = document.createElement('span');
        newTag.className = 'tag';
        newTag.textContent = formattedTag;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'tag-delete';
        deleteBtn.innerHTML = '×';
        deleteBtn.title = 'Удалить';
        
        // Добавляем элементы
        tagWrapper.appendChild(newTag);
        tagWrapper.appendChild(deleteBtn);
        tagsContainer.appendChild(tagWrapper);
        
        // Очищаем поле ввода
        newTagInput.value = '';
        
        // Обработчики событий для кнопки удаления
        setupDeleteHandlers(tagWrapper, deleteBtn, newTag);
    }
    
        function setupDeleteHandlers(wrapper, deleteBtn, tag) {
        // Показ/скрытие крестика
        wrapper.addEventListener('mouseenter', () => {
            deleteBtn.style.opacity = '1';
        });
        
        wrapper.addEventListener('mouseleave', () => {
            deleteBtn.style.opacity = '0';
        });

        // Удаление по клику
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.remove();
        });

        // Удаление по ПКМ
        tag.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            wrapper.remove();
        });
    }
    
    // Инициализация существующих хэштегов (если есть)
    document.querySelectorAll('.tag-wrapper').forEach(wrapper => {
        const deleteBtn = wrapper.querySelector('.tag-delete');
        const tag = wrapper.querySelector('.tag');
        setupDeleteHandlers(wrapper, deleteBtn, tag);
    });
    
    // 4. Функция переключения темы
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}

// Обработчик переключения
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});
});