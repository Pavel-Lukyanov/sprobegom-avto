document.addEventListener('DOMContentLoaded', function () {

    lazyload();

    //Выбор и подтверждение города
    let selectCityBtn = document.querySelector('.header__city');
    let selectCityPopup = document.querySelector('.js-popup-city');
    let closeCityPopup = selectCityPopup.querySelector('.popup__close');

    let acceptCityContainer = document.querySelector('.js-accept-city');
    let acceptCity = acceptCityContainer.querySelector('.header__city__accept');
    let denyCity = acceptCityContainer.querySelector('.header__city__deny');


    acceptCity.addEventListener('click', function () {
        acceptCityContainer.classList.remove('active');
    })

    denyCity.addEventListener('click', function () {
        selectCityPopup.classList.add('active');
    })

    selectCityBtn.addEventListener('click', function (e) {
        if (e.target.classList.contains('header__city__select') || e.target.classList.contains('header__city__rectangle')) {
            selectCityPopup.classList.add('active');
        }
    })

    selectCityPopup.addEventListener('click', function (e) {
        if (e.target.classList.contains('js-popup-city')) {
            selectCityPopup.classList.remove('active');
        }
    })

    closeCityPopup.addEventListener('click', function (e) {
        selectCityPopup.classList.remove('active');
    })


    //Подстановка номера телефона в ссылку
    let telLinks = document.querySelectorAll('.js-autocomplite__link');
    if (telLinks.length > 0) {
        telLinks.forEach(el => {
            let phone = el.textContent;
            phone = phone.replace(/[^\d]/g, '');
            phone = phone.replace(/^8/g, '7');
            phone = "+" + phone;
            el.href = 'tel:' + phone;
        })
    }



    //Скрытие лишних марок машин на главной
    let marksList = document.querySelector('.js-brand__list-hidden');
    if (marksList) {
        let marksItems = marksList.querySelectorAll('.brand__item');

        let countShowMarks = 23; //Кол-во машин
        let showMoreMarks = marksList.querySelector('.js-brand__more');

        function invisibleMarks(count) {
            for (let i = count; i < marksItems.length; i++) {
                marksItems[i].classList.add('brand__item--invisible');
            }
        }

        function invisibleMarksCount() {
            if (window.innerWidth > 600) {
                if (marksItems.length > countShowMarks) {
                    showMoreMarks.style.display = 'flex';
                    invisibleMarks(countShowMarks);
                }
            } else {
                if (marksItems.length > 5) {
                    showMoreMarks.style.display = 'flex';
                    invisibleMarks(5);
                }
            }
        }

        invisibleMarksCount();

        showMoreMarks.addEventListener('click', () => {
            if (showMoreMarks.textContent.trim() === 'Показать все') {
                showMoreMarks.textContent = 'Скрыть';
                showMoreMarks.classList.add('active');
                marksItems.forEach(el => {
                    el.classList.remove('brand__item--invisible');
                })
            } else {
                showMoreMarks.textContent = 'Показать все';
                showMoreMarks.classList.remove('active');
                invisibleMarksCount();
            }
        })
    }



    //Бургер меню
    let buttonBurger = document.querySelector('.header__btn--menu');
    let header = document.querySelector('.header');

    buttonBurger.addEventListener('click', () => {
        acceptCityContainer.classList.toggle('zindex');
        header.classList.toggle('active');
    })



    //Перенос лишних пунктов меню в скрытое меню
    let mainMenu = document.querySelector('.js-transfer-menu-from');
    let elemMainMenu = mainMenu.querySelectorAll('li');

    if (window.innerWidth > 1100) {
        if (elemMainMenu.length > 6) {
            let dropDownMenu = document.querySelector('.js-transfer-menu-to');

            for (let i = 6; i < elemMainMenu.length; i++) {
                dropDownMenu.innerHTML += `<li>${elemMainMenu[i].innerHTML}</li>`;
                elemMainMenu[i].remove();
            }
        }
    } else {
        let dropDownMenu = document.querySelector('.js-transfer-menu-to');

        elemMainMenu.forEach(el => {
            dropDownMenu.innerHTML += `<li>${el.innerHTML}</li>`;
        })
    }


    //Селекты

    let selects = document.querySelectorAll('.select');

    if (selects.length > 0) {
        selects.forEach(el => {
            el.addEventListener('click', function (e) {
                if (e.target.classList.contains('select__title') || e.target.classList.contains('select__header') || e.target.classList.contains('select__active')) {
                    el.classList.toggle('active');
                }
            })

            //Закрытие селекта при клике вне него
            document.addEventListener('click', (e) => {
                const withinBoundaries = e.composedPath().includes(el);
                if (!withinBoundaries) {
                    el.classList.remove('active');
                }
            })
        })

        //Подстановка выбранного имени
        let labels = document.querySelectorAll('.select__label');
        labels.forEach(el => {
            el.addEventListener('click', function () {
                el.parentNode.parentNode.previousSibling.previousSibling.childNodes[3].textContent = el.textContent.trim();
                el.parentNode.parentNode.previousSibling.previousSibling.childNodes[1].classList.add('active');
                el.parentNode.parentNode.parentNode.classList.add('color');
                el.parentNode.parentNode.parentNode.classList.remove('active');
            })
        })
    }

    // Цена от и до 

    let priceInputs = document.querySelectorAll('.price__input');

    if (priceInputs.length > 0) {
        priceInputs.forEach(el => {
            el.addEventListener('focus', function (e) {
                e.target.previousSibling.previousSibling.classList.add('active');
            })
            el.addEventListener('blur', function (e) {
                if (el.value === '') {
                    e.target.previousSibling.previousSibling.classList.remove('active');
                }
            })
        })
    }


    //Селект в каталоге
    let selectCatalog = document.querySelector('.select__catalog');
    if (selectCatalog) {
        selectCatalog.addEventListener('click', (e) => {
            if (e.target.classList.contains('select__catalog') || e.target.classList.contains('select__catalog__title')) {
                selectCatalog.classList.toggle('active');
            }
        })

        //Закрытие селекта при клике вне него
        document.addEventListener('click', (e) => {
            const withinCatalogSelect = e.composedPath().includes(selectCatalog);
            if (!withinCatalogSelect) {
                selectCatalog.classList.remove('active');
            }
        })

        let selectCatalogLinks = document.querySelectorAll('.select__catalog__link');
        let selectCatalogHead = document.querySelector('.select__catalog__title');

        selectCatalogLinks.forEach(el => {
            el.addEventListener('click', () => {
                selectCatalogHead.textContent = el.textContent;
                selectCatalog.classList.remove('active');
            })
        })
    }


    //Селект КПП

    let selectKpp = document.querySelectorAll('.select__kpp');
    if (selectKpp.length > 0) {
        selectKpp.forEach(select => {
            select.addEventListener('click', (e) => {
                if (e.target.classList.contains('select__kpp') || e.target.classList.contains('kpp__title') || e.target.classList.contains('kpp__header')) {
                    select.classList.toggle('active');
                }
            })

            //Закрытие селекта при клике вне него
            document.addEventListener('click', (e) => {
                const withinCatalogSelect = e.composedPath().includes(select);
                if (!withinCatalogSelect) {
                    select.classList.remove('active');
                }
            })

            //Меняем цвет селекта и лейбла при чекнутом инпуте
            let inputs = Array.from(select.querySelectorAll('.kpp__input'));
            inputs.forEach(el => {
                el.addEventListener('click', () => {
                    const label = el.parentNode.querySelector(`.kpp__label`);
                    if (el.checked) {
                        label.classList.add('color');
                    } else {
                        label.classList.remove('color');
                    }

                    //Красим селект в желтый, если 1 инпут чекнут
                    inputs.some(input => input.checked) ? select.classList.add('color') : select.classList.remove('color');


                    //Подстановка названия в заголовок инпута
                    let headKppSelect = select.querySelector('.kpp__header');
                    let countChecked = select.querySelectorAll('input[type=Checkbox]:checked');

                    if (countChecked.length == 1) {
                        headKppSelect.textContent = countChecked[0].nextElementSibling.nextElementSibling.textContent;
                    } else if (countChecked.length > 1) {
                        headKppSelect.textContent = `КПП: ${countChecked.length}`;
                    } else {
                        headKppSelect.textContent = 'КПП';
                    }
                })
            })
        })
    }


    // Селект в футере
    let selectCity = document.querySelector('.select__discount');

    if (selectCity) {
        selectCity.addEventListener('click', function (e) {
            if (e.target.classList.contains('select__discount') || e.target.classList.contains('select__discount__title')) {
                selectCity.classList.toggle('active');
            }
        })

        let selectLabelCity = document.querySelectorAll('.select__discount__label');
        let selectTitleCity = document.querySelector('.select__discount__title');

        selectLabelCity.forEach(el => {
            el.addEventListener('click', function () {
                selectTitleCity.textContent = el.textContent;
                selectCity.classList.remove('active');
            })
        })

        //Закрытие селекта при клике вне него
        document.addEventListener('click', (e) => {
            const withinCatalogSelect = e.composedPath().includes(selectCity);
            if (!withinCatalogSelect) {
                selectCity.classList.remove('active');
            }
        })
    }


    //Маска телефона
    var selector = document.querySelectorAll("input[type='tel']");
    var im = new Inputmask("+7 (999)-999-99-99");

    im.mask(selector);


    // Инициализация свайперов в каталоге

    function swiperInit() {
        let swipers = document.querySelectorAll(`[data-start = "catalog-swiper"]`);

        if (!swipers.length) return;
        swipers.forEach((el, ind) => {
            const newClass = `cars__swiper_${ind + 1}`
            el.classList.add(newClass);

            let swip = new Swiper(`.${newClass}`, {
                direction: 'horizontal',
                preloadImages: false,
                lazy: true,
                pagination: {
                    el: '.' + newClass + ' .swiper-pagination-custom',
                    clickable: true,
                },
                on: {
                    afterInit: function () {
                        el.removeAttribute("data-start");
                    },
                },
            });


            const bullets = el.querySelectorAll('.swiper-pagination-bullet')
            if (bullets.length > 0) bullets.forEach(bullet => {
                const aria = bullet.getAttribute('aria-label')
                const nextSlide = aria[aria.length - 1]
                bullet.addEventListener('mouseover', () => { swip.slideTo(nextSlide - 1) })
            })
        })


    }

    swiperInit();


    // Свайпер на детальной

    try {
        let detailSwiper = new Swiper(".detail-swiper", {
            spaceBetween: 10,
            slidesPerView: 7,
            watchSlidesProgress: true,
            preloadImages: true,
            lazy: true,
        });
        let detailSwiper2 = new Swiper(".detail-swiper2", {
            slidesPerView: 1,
            centeredSlides: true,
            preloadImages: true,
            lazy: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: detailSwiper,
            },
        });
    } catch { }


    //Открытие фильтра
    let extendFilterBtn = document.querySelector('.extended__btn');

    if (extendFilterBtn) {
        let filterContainer = document.querySelector('.selects__container');
        extendFilterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            filterContainer.classList.toggle('active');
            if (extendFilterBtn.textContent.trim() === 'Расширенный фильтр') {
                extendFilterBtn.textContent = 'Скрыть фильтр';
            } else {
                extendFilterBtn.textContent = 'Расширенный фильтр';
            }
        })
    }
})
