function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
//=================
//testWebP
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
//=================
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();
if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}
let unlock = true;
//=================
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================
let tabs = document.querySelectorAll("._tabs");
for (let i = 0; i < tabs.length; i++) {
	let tab = tabs[i];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let k = 0; k < tabs_items.length; k++) {
		let tabs_item = tabs_items[k];
		tabs_item.addEventListener("click", function (e) {
			for (let q = 0; q < tabs_items.length; q++) {
				let tabs_item = tabs_items[q];
				tabs_item.classList.remove('_active');
				tabs_blocks[q].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[k].classList.add('_active');
			e.preventDefault();
		});
	}
}
//=================
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			counter: true,
			selector: 'a',
			download: true
		});
	}
}
//=================
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let i = 0; i < popup_link.length; i++) {
	const el = popup_link[i];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');

			let video = el.getAttribute('data-video');
			for (let i = 0; i < popups.length; i++) {
				let searchPopup = popups[i];
				if (searchPopup.classList.contains('.popup-login')) {
					popup_open_login(item);
				} else {
					popup_open(item, video);
				}
			}
		}
		e.preventDefault();
	})
}
for (let i = 0; i < popups.length; i++) {
	const popup = popups[i];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}

function popup_open(item, video = '') {

	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup');

	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_open_login(item) {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('#popup-login');
	let textForm = document.querySelector('.popup__form-login').innerHTML = item;

	if (curent_popup && unlock) {

		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let i = 0; i < popups.length; i++) {
				const popup = popups[i];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.which == 27) {
		popup_close();
	}
});
(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
document.addEventListener('DOMContentLoaded', function () {
	let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
	inputs_init(inputs);

	function inputs_init(inputs) {
		if (inputs.length > 0) {
			for (let i = 0; i < inputs.length; i++) {
				const input = inputs[i];
				const input_g_value = input.getAttribute('data-value');
				input_placeholder_add(input);
				if (input.value != '' && input.value != input_g_value) {
					input_focus_add(input);
				}
				input.addEventListener('focus', function (e) {
					if (input.value == input_g_value) {
						input_focus_add(input);
						input.value = '';
					}
					if (input.classList.contains('_phone')) {
						input.classList.add('_mask');
						Inputmask("+33 999 999 999", {
							"placeholder": '',
							clearIncomplete: true,
							clearMaskOnLostFocus: true,
							onincomplete: function () {
								input_clear_mask(input, input_g_value);
							}
						}).mask(input);
					}
					if (input.classList.contains('_digital')) {
						input.classList.add('_mask');
						Inputmask("9{1,}", {
							"placeholder": '',
							clearIncomplete: true,
							clearMaskOnLostFocus: true,
							onincomplete: function () {
								input_clear_mask(input, input_g_value);
							}
						}).mask(input);

					}
				});
				input.addEventListener('blur', function (e) {
					if (input.value == '') {
						input.value = input_g_value;
						input_focus_remove(input);
						if (input.classList.contains('_mask')) {
							input_clear_mask(input, input_g_value);
						}
					}
				});
			}
		}
	}
	function input_placeholder_add(input) {
		const input_g_value = input.getAttribute('data-value');
		if (input.value == '' && input_g_value != '') {
			input.value = input_g_value;
		}
	}
	function input_focus_add(input) {
		input.classList.add('_focus');
		input.parentElement.classList.add('_focus');
	}
	function input_focus_remove(input) {
		input.classList.remove('_focus');
		input.parentElement.classList.remove('_focus');
	}
	function input_clear_mask(input, input_g_value) {
		input.inputmask.remove();
		input.value = input_g_value;
		input_focus_remove(input);
	}
});

if (document.querySelector('.services')) {
	let slider_cards = new Swiper('.services__cards', {
		slidesPerView: 1.6,
		spaceBetween: 60,
		autoHeight: true,
		speed: 800,
		pagination: {
			type: 'fraction',
			el: '.card__pagination',
			clickable: true,
			formatFractionCurrent: function (number) {
				if (number < 10) {
					number = '0' + number;
				}
				return number;
			},
			formatFractionTotal: function (number) {
				if (number < 10) {
					number = '0' + number;
				}
				return number;
			},
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		simulateTouch: false,
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			1241: {
				slidesPerView: 1.3,
			},
			1300: {
				slidesPerView: 1.4,
			},
			1470: {
				slidesPerView: 1.6,
			},
		},
	});
}
if (document.querySelector('.card-slider-2')) {
	let slider_card_slider_1 = new Swiper('.card-sliders-02', {
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 0,
			stretch: 3,
		},
		loop: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		simulateTouch: false,
		navigation: {
			nextEl: '.card-slider-2__arrow-next',
			prevEl: '.card-slider-2__arrow-prev',
		},
	});
}
// if (document.querySelector('.card-slider')) {
// 	let slider_card_slider_1 = new Swiper('.card-sliders-1', {
// 		effect: 'coverflow',
// 		coverflowEffect: {
// 			rotate: 0,
// 			stretch: 3,
// 		},
// 		loop: true,
// 		slidesPerView: 1,
// 		spaceBetween: 0,
// 		autoHeight: true,
// 		speed: 800,
// 		simulateTouch: false,
// 		navigation: {
// 			nextEl: '.card-slider__arrow-next',
// 			prevEl: '.card-slider__arrow-prev',
// 		},
// 	});
// 	let slider_card_slider_2 = new Swiper('.card-sliders-2', {
// 		loop: true,
// 		slidesPerView: 1.57,
// 		spaceBetween: 80,
// 		autoHeight: true,
// 		speed: 800,
// 		simulateTouch: false,
// 		centeredSlides: true,
// 		navigation: {
// 			nextEl: '.card-slider__arrow-next',
// 			prevEl: '.card-slider__arrow-prev',
// 		},
// 		breakpoints: {
// 			320: {
// 				slidesPerView: 1,
// 			},
// 			1300: {
// 				slidesPerView: 1.1,
// 			},
// 			1400: {
// 				slidesPerView: 1.25,
// 			},
// 			1500: {
// 				slidesPerView: 1.3,
// 			},
// 			1715: {
// 				slidesPerView: 1.4,
// 			},
// 			1840: {
// 				slidesPerView: 1.5,
// 			},
// 			1920: {
// 				slidesPerView: 1.57,
// 			},
// 		},
// 	});
// }
let searchFilters = document.querySelectorAll(".filter__item");
for (let i = 0; i < searchFilters.length; i++) {
	let searchFilter = searchFilters[i];
	searchFilter.addEventListener("click", function (e) {
		if (searchFilter.classList.contains('_active')) {
			searchFilter.classList.remove('_active');
		} else {
			for (let i = 0; i < searchFilters.length; i++) {
				let filterClick = searchFilters[i];
				filterClick.classList.remove('_active');
			}
			searchFilter.classList.add('_active');
		}
		e.preventDefault();
	});
}
let searchPortfs = document.querySelectorAll(".portfolio__link");
for (let i = 0; i < searchPortfs.length; i++) {
	let searchPortf = searchPortfs[i];
	searchPortf.addEventListener("click", function (e) {
		if (searchPortf.classList.contains('_active')) {
			searchPortf.classList.remove('_active');
		} else {
			for (let i = 0; i < searchPortfs.length; i++) {
				let portfClick = searchPortfs[i];
				portfClick.classList.remove('_active');
			}
			searchPortf.classList.add('_active');
		}
		e.preventDefault();
	});
}

var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
if (isMobile.any()) {
	document.body.classList.add('_touch');
	//=======================================================
	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0) {
		for (let i = 0; i < menuArrows.length; i++) {
			const menuArrow = menuArrows[i];
			menuArrow.addEventListener('click', function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}
} else {
	document.body.classList.add('_pc');
}
//=======================================================
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());