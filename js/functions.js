$(function () {
	// Проверка браузера
	if (!supportsCssVars()) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Есть ли поддержка тач событий или это apple устройство
	if (!is_touch_device() || !/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) $('html').addClass('custom_scroll')


	// Ленивая загрузка
	setTimeout(function () {
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: function (el) {
				el.classList.add('loaded')
			}
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Кастомный select
	$('select').niceSelect()

	// Фиксация label при вводе в поле
	$('body').on('keydown change', '.form .input, .form textarea,.form select', function () {
		let _self = $(this)

		setTimeout(() => {
			_self.val().length
				? _self.addClass('active')
				: _self.removeClass('active')
		})
	})


	// Мини всплывающие окна
	firstClick = false

	$('.mini_modal_link').click(function (e) {
		e.preventDefault()

		let modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if ($(window).width() > 1023) {
				$('.overlay').fadeOut(200)
			}

			firstClick = false

			if (is_touch_device()) {
				$('body').css('cursor', 'default')
			}
		} else {
			$('.mini_modal_link').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if ($(window).width() > 1023) {
				$('.overlay').fadeIn(300)
			}

			firstClick = true

			if (is_touch_device()) {
				$('body').css('cursor', 'pointer')
			}
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(function (e) {
		if (!firstClick && $(e.target).closest('.mini_modal').length == 0) {
			$('.mini_modal, .mini_modal_link').removeClass('active')

			if ($(window).width() > 1023) {
				$('.overlay').fadeOut(200)
			}

			if (is_touch_device()) {
				$('body').css('cursor', 'default')
			}
		}

		firstClick = false
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container')
			let activeTab = $(this).data('content')
			let level = $(this).data('level')

			parent.find('.tabs:first button').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$(activeTab).addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $('.tabs button[data-content=' + locationHash + ']')
		let parent = activeTab.closest('.tabs_container')
		let level = activeTab.data('level')

		parent.find('.tabs:first button').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		$(locationHash).addClass('active')

		$('html, body').stop().animate({
			scrollTop: $(locationHash).offset().top
		}, 1000)
	}


	// Fancybox
	$.fancybox.defaults.hash = false
	$.fancybox.defaults.backFocus = false
	$.fancybox.defaults.autoFocus = false
	$.fancybox.defaults.animationEffect = 'zoom'
	$.fancybox.defaults.transitionEffect = 'slide'
	$.fancybox.defaults.speed = 500
	$.fancybox.defaults.gutter = 40
	$.fancybox.defaults.i18n = {
		'en': {
			CLOSE: "Закрыть",
			NEXT: "Следующий",
			PREV: "Предыдущий",
			ERROR: "Запрошенный контент не может быть загружен.<br /> Пожалуйста, повторите попытку позже.",
			PLAY_START: "Запустить слайдшоу",
			PLAY_STOP: "Остановить слайдшоу",
			FULL_SCREEN: "На весь экран",
			THUMBS: "Миниатюры",
			DOWNLOAD: "Скачать",
			SHARE: "Поделиться",
			ZOOM: "Увеличить"
		}
	}

	// Всплывающие окна
	$('body').on('click', '.modal_link', function (e) {
		e.preventDefault()

		$.fancybox.close(true)

		$.fancybox.open({
			src: $(this).data('content'),
			type: 'inline',
			touch: false
		})
	})

	// Закрытие всплывающего окна по произвольной кнопке
	$('body').on('click', '.modal .close', function (e) {
		e.preventDefault()

		$.fancybox.close(true)
	})

	// Увеличение картинки
	$('.fancy_img').fancybox({
		mobile: {
			clickSlide: "close"
		}
	})


	// Аккордион
	$('body').on('click', '.accordion .item .title, .accordion .item .arr', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.item')
		let accordion = $(this).closest('.accordion')

		if (parent.hasClass('active')) {
			parent.removeClass('active')
			parent.find('.data').slideUp(300)
		} else {
			accordion.find('.item').removeClass('active')
			accordion.find('.data').slideUp(300)

			parent.addClass('active')
			parent.find('.data').slideDown(300)
		}
	})


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function (e) {
		e.preventDefault()

		const parent = $(this).closest('.amount')
		const input = parent.find('.input')
		const inputVal = parseFloat(input.val())
		const minimum = parseFloat(input.data('minimum'))
		const step = parseFloat(input.data('step'))
		const unit = input.data('unit')

		if (inputVal > minimum) {
			input.val(inputVal - step + unit)
		}

		if ($(this).hasClass('update_price')) {
			updateProductPrice($(this).closest('.amount'))
		}

		if ($(this).closest('.block')) {
			$(this).closest('.block').find('.power_type').addClass('dark')
		}
	})

	$('body').on('click', '.amount .plus', function (e) {
		e.preventDefault()

		const parent = $(this).closest('.amount')
		const input = parent.find('.input')
		const inputVal = parseFloat(input.val())
		const maximum = parseFloat(input.data('maximum'))
		const step = parseFloat(input.data('step'))
		const unit = input.data('unit')

		if (inputVal < maximum) {
			input.val(inputVal + step + unit)
		}

		if ($(this).hasClass('update_price')) {
			updateProductPrice($(this).closest('.amount'))
		}

		if ($(this).closest('.block')) {
			$(this).closest('.block').find('.power_type').addClass('dark')
		}
	})

	$('body').on('keydown', '.amount .input', function () {
		let _self = $(this)

		setTimeout(function () {
			if (_self.val() == '' || _self.val() == 0) {
				_self.val(parseInt(_self.data('minimum')))
			}

			if (_self.hasClass('update_price')) {
				updateProductPrice(_self.closest('.amount'))
			}

			if (_self.closest('.block')) {
				_self.closest('.block').find('.power_type').addClass('dark')
			}
		}, 10)
	})


	// Плавная прокрутка к якорю
	// Работает и при прокрутке к табу
	$('body').on('click', '.scroll_link', function (e) {
		e.preventDefault()

		let href = $(this).data('anchor')
		let addOffset = 0

		if ($(this).data('offset')) {
			addOffset = $(this).data('offset')
		}

		if ($('.tabs button[data-content=' + href + ']').length) {
			let activeTab = $('.tabs button[data-content=' + href + ']')
			let parent = activeTab.closest('.tabs_container')
			let level = activeTab.data('level')

			parent.find('.tabs:first button').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			activeTab.addClass('active')
			$(href).addClass('active')
		}

		$('html, body').stop().animate({
			scrollTop: $(href).offset().top - addOffset
		}, 1000)
	})


	// Моб. версия
	firstResize = false

	if (document.body.clientWidth < 360) {
		document.getElementsByTagName('meta')['viewport'].content = 'width=360, user-scalable=no'

		firstResize = true
	}


	// Моб. меню
	$('.mob_header .mob_menu_link').click(function (e) {
		e.preventDefault()

		$(this).addClass('active')
		$('body').addClass('menu_open')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('header .close, .overlay').click(function (e) {
		e.preventDefault()

		$('.mob_header .mob_menu_link').removeClass('active')
		$('body').removeClass('menu_open')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
	})


	if (is_touch_device()) {
		$('header .menu .item > a.sub_link').addClass('touch_link')

		$('header .menu .item > a.sub_link').click(function (e) {
			if ($(this).next().css('visibility') == 'hidden') {
				e.preventDefault()

				$('header .menu .sub_menu').removeClass('show')

				$(this).next().addClass('show')
			}
		})


		// Закрытие моб. меню свайпом справо на лево
		let ts

		$('body').on('touchstart', function (e) {
			ts = e.originalEvent.touches[0].clientX
		})

		$('body').on('touchend', function (e) {
			let te = e.originalEvent.changedTouches[0].clientX

			if ($('body').hasClass('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				$('.mob_header .mob_menu_link').removeClass('active')
				$('body').removeClass('menu_open')
				$('header').removeClass('show')
				$('.overlay').fadeOut(300)
			} else if (ts < te - 50) {
				// Свайп слева на право
			}
		})
	}
})




$(window).on('resize', () => {
	// Моб. версия
	if (!firstResize) {
		$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
		if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')

		firstResize = true
	} else {
		firstResize = false
	}
})



// Вспомогательные функции
function updateProductPrice(context) {
	let price = parseFloat(context.find('.price').data('price'))
	let amount = parseInt(context.find('.input').val())
	let totalPrice = price * amount

	context.find('.amount_val').text(amount)
	context.find('.total_price span').text(totalPrice.toLocaleString())
}


function setHeight(className) {
	let maxheight = 0

	className.each(function () {
		let elHeight = $(this).outerHeight()

		if (elHeight > maxheight) {
			maxheight = elHeight
		}
	})

	className.outerHeight(maxheight)
}


function is_touch_device() {
	return !!('ontouchstart' in window)
}


function widthScroll() {
	let div = document.createElement('div')
	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}


const supportsCssVars = function () {
	let s = document.createElement('style'),
		support

	s.innerHTML = ":root { --tmp-var: bold; }"

	document.head.appendChild(s)

	support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
	s.parentNode.removeChild(s)

	return support
}