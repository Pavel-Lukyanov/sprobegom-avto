document.addEventListener('DOMContentLoaded', function () {

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
        console.log(e.target)
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
})
