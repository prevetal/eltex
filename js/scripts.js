$(() => {
	// Основной слайдер на главной
	$('.main_slider .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: true,
		dots: false,
		loop: true,
		smartSpeed: 750,
		autoplay: false,
		autoplayTimeout: 5000
	})


	// Товары
	$('.products_block .slider').owlCarousel({
		loop: false,
		smartSpeed: 500,
		fluidSpeed: 100,
		dots: false,
		nav: true,
		responsive: {
			0: {
				items: 2,
				margin: 10
			},
			0: {
				items: 2,
				margin: 20
			},
			768: {
				items: 3,
				margin: 20
			},
			1280: {
				items: 4,
				margin: 28
			}
		},
		onInitialized: event => {
			setTimeout(() => {
				productHeight($(event.target), $(event.target).find('.slide').length)
			}, 100)
		},
		onResized: event => {
			setTimeout(() => {
				productHeight($(event.target), $(event.target).find('.slide').length)
			}, 100)
		}
	})


	// Товары
	$('.case_equipment .slider').owlCarousel({
		loop: false,
		smartSpeed: 500,
		fluidSpeed: 100,
		dots: false,
		nav: true,
		responsive: {
			0: {
				items: 2,
				margin: 10
			},
			0: {
				items: 2,
				margin: 20
			},
			768: {
				items: 3,
				margin: 20
			},
			1024: {
				items: 4,
				margin: 20
			},
			1280: {
				items: 5,
				margin: 28
			}
		},
		onInitialized: event => {
			setTimeout(() => {
				productHeight($(event.target), $(event.target).find('.slide').length)
			}, 100)
		},
		onResized: event => {
			setTimeout(() => {
				productHeight($(event.target), $(event.target).find('.slide').length)
			}, 100)
		}
	})


	// Видео
	$('.videos .slider').owlCarousel({
		loop: false,
		smartSpeed: 500,
		fluidSpeed: 100,
		dots: false,
		nav: true,
		responsive: {
			0: {
				items: 1,
				margin: 20
			},
			768: {
				items: 2,
				margin: 20
			},
			1280: {
				items: 3,
				margin: 28
			}
		}
	})


	// Каталог товаров
	$('.catalog_info a.sub_link').click(function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next().slideUp(300)
		} else {
			$(this).addClass('active').next().slideDown(300)
		}
	})


	// Выравнивание элементов
	setHeight($('aside .cats').add('.main_slider .slide'))


	// Фильтр
	$('body').on('click', 'aside .mob_filter_link', function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next().slideUp(300)
		} else {
			$(this).addClass('active').next().slideDown(300)
		}
	})


	// Товар
	$('.product_info .images .big .slider').owlCarousel({
		items: 1,
		margin: 20,
		loop: false,
		smartSpeed: 500,
		fluidSpeed: 100,
		dots: false,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		freeDrag: false,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		responsive: {
			0: {
				nav: true
			},
			768: {
				nav: false
			}
		},
		onInitialized: function (event) {
			setTimeout(function () {
				setHeight($(event.target).find('.slide'))
			}, 100)
		},
		onResized: function (event) {
			$(event.target).find('.slide').height('auto')

			setTimeout(function () {
				setHeight($(event.target).find('.slide'))
			}, 100)
		},
		onTranslate: (event) => {
			const parent = $(event.target).closest('.images')

			parent.find('.thumbs button').removeClass('active')
			parent.find('.thumbs button:eq(' + event.item.index + ')').addClass('active')
		}
	})

	$('.product_info .images .thumbs button, .product_info .images .view360').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.images')

		parent.find('.big .slider').trigger('to.owl', $(this).data('slide-index'))
	})


	// Товар - выбор гарантии
	$('body').on('click', '#add_garanti_modal .list label', function (e) {
		const price = $(this).data('price')
		const duration = $(this).data('duration')
		const name = $(this).find('.name').text()

		const $price = $('.product_info .info .price_block .garanti_price')
		const $garanti = $('.product_info .info .buy_info .garanti .val span')

		$price.html('+ ' + price.toLocaleString() + ' <small>руб</small>')
		$garanti.html(' + ' + duration)

		$('#quike_buy_modal .product .garanti .name').text(name)
		$('#quike_buy_modal .product .garanti').addClass('show')
	})


	// Товар - Аналогичные устройства
	$('.product_info .info .similar_link').click(function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.product_info .similar_products').removeClass('show')
		} else {
			$(this).addClass('active')
			$('.product_info .similar_products').addClass('show')
		}
	})


	// Товар - добавление в корзину
	$('.product_info .info .buy_info .buy_link').click(function (e) {
		e.preventDefault()

		$(this).hide()
		$('.product_info .info .buy_info .amount').addClass('show')
	})


	// Копирование кода
	const clipboard = new ClipboardJS('.copy_link')

	clipboard.on('success', (e) => {
		$(e.trigger).addClass('copied')

		setTimeout(() => {
			$(e.trigger).removeClass('copied')
		}, 2000)

		e.clearSelection()
	})


	// Форма во всплывашке
	$('body').on('click', '.form .type label', function (e) {
		let typeInfo = $(this).data('content')
		let parent = $(this).closest('.form')

		parent.find('.for_type').hide()
		parent.find(typeInfo).fadeIn(300)
	})


	// Поле ввода с подсказкой
	$('.form .with_tip .input').keydown(function (e) {
		let parent = $(this).closest('.with_tip')
		let _self = $(this)

		setTimeout(function () {
			if (_self.val().length > 0) {
				// здесь запрос за данными
				parent.addClass('open').find('.datalist').addClass('show')
			} else {
				parent.removeClass('open').find('.datalist').removeClass('show')
			}
		})
	})

	$('.form .with_tip .datalist > *').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.with_tip')

		parent.find('.input').val($(this).find('.name').text())
		parent.find('.datalist').removeClass('show')
	})


	// Оформление заказа
	$('.checkout_form .block .methods label').click(function () {
		let methodInfo = $(this).data('content')
		let parent = $(this).closest('.block')

		parent.find('.method_info').hide()
		parent.find(methodInfo).fadeIn(300)
	})


	// Залипание блока
	$('.sticky').stick_in_parent()


	// Виджет корзины
	$('#cart_widget .bottom .cart .toggle_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('#cart_widget')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			parent.removeClass('show')
			parent.find('.cart_info').slideUp(300)
		} else {
			$(this).addClass('active')
			parent.addClass('show')
			parent.find('.cart_info').slideDown(300)
		}
	})

	$('#cart_widget .close').click(function (e) {
		e.preventDefault()

		$('#cart_widget .bottom .cart .toggle_btn').removeClass('active')
		$('#cart_widget').removeClass('show')
		$('#cart_widget .cart_info').slideUp(300)
	})


	// Полный прайс лист
	$('.get_price_list .mob_form_btn').click(function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next().slideUp(300)
		} else {
			$(this).addClass('active').next().slideDown(300)
		}
	})


	// Наши обучающие программы
	$('.service_training .programs .program .check label').click(function () {
		$(this).closest('.program').toggleClass('checked')
	})


	// Сдать оборудование в ремонт
	$('.service_repair .btns button.add_line').click(function (e) {
		e.preventDefault()

		let html = '<tr>' + $('.service_repair .template').html() + '</tr>',
			trLength = $('.service_repair table tbody tr:not(.template)').size(),
			newCheck = 'replacement_check' + (trLength + 1)

		$('.service_repair table tbody').append(html)
		$('.service_repair .btns button.remove_line').addClass('show')

		$('.service_repair table tbody tr:last').find('td.replacement input').attr('id', newCheck)
		$('.service_repair table tbody tr:last').find('td.replacement label').attr('for', newCheck)
	})

	$('.service_repair .btns button.remove_line').click(function (e) {
		e.preventDefault()

		$('.service_repair table tbody tr:last').remove()

		let trLength = $('.service_repair table tbody tr:not(.template)').size()

		if (trLength < 2) {
			$('.service_repair .btns button.remove_line').removeClass('show')
		}
	})


	// Сервис
	if ($(window).width() < 1024) {
		$('aside .page_links .title').click(function (e) {
			e.preventDefault()

			if ($(this).hasClass('active')) {
				$(this).removeClass('active').next().slideUp(300)
			} else {
				$(this).addClass('active').next().slideDown(300)
			}
		})
	}


	// Календарь
	$('.date_input').datepicker({
		autoClose: true,
		minDate: new Date(),
		onSelect(formattedDate, date, inst) {
			inst.$el.addClass('active')
		}
	})


	// Сравнение товаров
	if ($('.compare_info .swiper-container').length) {
		new Swiper('.compare_info .swiper-container', {
			loop: false,
			speed: 500,
			spaceBetween: 0,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			scrollbar: {
				el: '.swiper-scrollbar',
				hide: false,
			},
			breakpoints: {
				0: {
					slidesPerView: 1
				},
				480: {
					slidesPerView: 2
				},
				1024: {
					slidesPerView: 3
				},
				1280: {
					slidesPerView: 4
				}
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						productHeight($(swiper.$el), $(swiper.$el).find('.slide').length)

						compareHeight()
					})
				},
				resize: swiper => {
					setTimeout(() => {
						productHeight($(swiper.$el), $(swiper.$el).find('.slide').length)

						compareHeight()
					})
				}
			}
		})
	}

	$('.compare_info .more_features_btn').click(function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')

			$('.compare_info .compare_features .list > *.hide').hide()
			$('.compare_info .product_features .list > *.hide').hide()
		} else {
			$(this).addClass('active')

			$('.compare_info .compare_features .list > *.hide').fadeIn(300)
			$('.compare_info .product_features .list > *.hide').fadeIn(300)
		}
	})


	$('.compare_info .compare_features .list > *, .compare_info .product_features .list > *').mouseleave(function () {
		$('.compare_info .compare_features .list > *').removeClass('hover')
		$('.compare_info .product_features .list > *').removeClass('hover')
	})

	$('.compare_info .compare_features .list > *, .compare_info .product_features .list > *').mouseover(function () {
		let featureIndex = $(this).index()

		$('.compare_info .compare_features .list > *:eq(' + featureIndex + ')').addClass('hover')
		$('.compare_info .product_features .list').each(function () {
			$(this).find(' > *:eq(' + featureIndex + ')').addClass('hover')
		})
	})


	// Отправка форм
	$('body').on('submit', '#best_price_modal .form', (e) => {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src: '#success_best_price_modal',
			type: 'inline',
			touch: false,
			afterShow: (instance, current) => {
				setTimeout(() => {
					$.fancybox.close()
				}, 4000)
			}
		})
	})


	$('body').on('submit', '.feedback .form', (e) => {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src: '#success_feedback_modal',
			type: 'inline',
			touch: false,
			afterShow: (instance, current) => {
				setTimeout(() => {
					$.fancybox.close()
				}, 4000)
			}
		})
	})


	$('body').on('submit', '#invoice_modal .form', (e) => {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src: '#success_invoice_modal',
			type: 'inline',
			touch: false
		})
	})


	// Страница "О компании" новая
	$('.page_about_v2 .about_info_v2 .slider_wrap .slider').owlCarousel({
		items: 1,
		margin: 20,
		loop: false,
		smartSpeed: 500,
		fluidSpeed: 100,
		dots: true,
		nav: false,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		onTranslate: (event) => {
			const parent = $(event.target).closest('.slider_wrap')

			parent.find('.thumbs .btn').removeClass('active')
			parent.find('.thumbs .btn:eq(' + event.item.index + ')').addClass('active')
		}
	})

	$('.page_about_v2 .about_info_v2 .slider_wrap .thumbs .btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.slider_wrap')

		parent.find('.slider').trigger('to.owl', $(this).data('slide-index'))
	})


	// Наши клиенты
	$('.page_about_v2 .clients .slider').owlCarousel({
		margin: 15,
		loop: false,
		smartSpeed: 500,
		fluidSpeed: 100,
		dots: false,
		nav: false,
		autoplay: true,
		autoplayTimeout: 3000,
		responsive: {
			0: {
				items: 2
			},
			480: {
				items: 3
			},
			768: {
				items: 5
			},
			1024: {
				items: 6
			},
			1280: {
				items: 7
			},
			1410: {
				items: 8
			}
		}
	})


	// Отзывы V2
	if ($('.page_about_v2 .reviews_v2 .swiper-container').length) {
		new Swiper('.page_about_v2 .reviews_v2 .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 24,
					direction: 'horizontal',
					slidesPerView: 1,
					autoHeight: true
				},
				768: {
					spaceBetween: 28,
					direction: 'horizontal',
					slidesPerView: 2,
					autoHeight: true
				},
				1024: {
					spaceBetween: 28,
					direction: 'vertical',
					slidesPerView: 'auto',
					autoHeight: false
				},
				1280: {
					spaceBetween: 32,
					direction: 'vertical',
					slidesPerView: 'auto',
					autoHeight: false
				},
				1410: {
					spaceBetween: 46,
					direction: 'vertical',
					slidesPerView: 'auto',
					autoHeight: false
				}
			}
		})
	}


	// Наши проекты
	if ($('.page_about_v2 .projects .swiper-container').length) {
		new Swiper('.page_about_v2 .projects .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				480: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 20
				},
				1024: {
					slidesPerView: 4,
					spaceBetween: 24
				},
				1410: {
					slidesPerView: 4,
					spaceBetween: 57
				}
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						setHeight($(swiper.$el).find('.project .name'))
						setHeight($(swiper.$el).find('.project .desc'))
					})
				},
				resize: swiper => {
					$(swiper.$el).find('.project .name, .project .desc').height(' auto')

					setTimeout(() => {
						setHeight($(swiper.$el).find('.project .name'))
						setHeight($(swiper.$el).find('.project .desc'))
					})
				}
			}
		})
	}


	// Выставки, конференции
	if ($('.page_about_v2 .conferences .gallery.swiper-container').length) {
		new Swiper('.page_about_v2 .conferences .gallery.swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 'auto',
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Дипломы
	if ($('.page_about_v2 .diploms .swiper-container').length) {
		new Swiper('.page_about_v2 .diploms .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 'auto',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 24
				},
				1024: {
					spaceBetween: 32
				},
				1280: {
					spaceBetween: 52
				},
				1410: {
					spaceBetween: 78
				}
			}
		})
	}


	// Лицензии
	if ($('.page_about_v2 .licenses .swiper-container').length) {
		new Swiper('.page_about_v2 .licenses .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 'auto',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 24
				},
				1024: {
					spaceBetween: 32
				},
				1280: {
					spaceBetween: 52
				},
				1410: {
					spaceBetween: 78
				}
			}
		})
	}


	// Конфигуратор
	$('.configurator_ec .block .title').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	const performance = $('.configurator_ec #performance_range').ionRangeSlider({
		min: 0,
		max: 20,
		from: 16,
		step: 1,
		onChange: data => {
			$('.configurator_ec .performance_input').val(data.from)
		}
	}).data('ionRangeSlider')

	$('.configurator_ec .performance_input').keyup(function () {
		performance.update({
			from: parseFloat($(this).val()),
		})
	})

	const performance2 = $('.configurator_ec #performance2_range').ionRangeSlider({
		min: 0,
		max: 10,
		from: 7,
		step: 1,
		onChange: data => {
			$('.configurator_ec .performance2_input').val(data.from)
		}
	}).data('ionRangeSlider')

	$('.configurator_ec .performance2_input').keyup(function () {
		performance2.update({
			from: parseFloat($(this).val()),
		})
	})


	$('.configurator_ec .spec_prices .spoler_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('.configurator_ec .spec_prices .data').slideToggle(300)
	})


	$('.configurator_ec .col_right .mob_btn, .configurator_ec .col_right .mob_close_btn').click(function (e) {
		e.preventDefault()

		$('.configurator_ec .col_right').toggleClass('show')
	})


	$('.configurator_ec label.with_children').click(function () {
		if ($(this).prev().prop('checked')) {
			$(this).closest('.field').find('.checkbox_sub input').prop('checked', false)
		}
	})

	$('.configurator_ec .checkbox_sub label').click(function () {
		$(this).closest('.field').find('> input').prop('checked', true)
	})


	$('.configurator_ec .configurator_reset_btn').click(function () {
		performance.reset()
		performance2.reset()
	})


	// Официальные курсы
	$('.courses .wheelSlider-container').wheelSlider({
		controls: true,
		dots: false
	})


	// Спецификатор
	$('.specifier .top .add_new > .btn').click(function (e) {
		e.preventDefault()

		$(this).hide()
		$('.specifier .top .add_new .form').fadeIn(300)
		$('.specifier .top .add_new .form .input').focus()
	})

	$('.specifier .top .add_new .form .clear_btn').click(function (e) {
		e.preventDefault()

		$('.specifier .top .add_new .form').hide()
		$('.specifier .top .add_new .form .input').val('')
		$('.specifier .top .add_new > .btn').fadeIn(300)
	})


	$('.specifier .item .head').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})

	$('.specifier .category > .name').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	// Спецификация
	$('.specification_info .top .add_new > .btn').click(function (e) {
		e.preventDefault()

		$(this).hide()
		$('.specification_info .top .add_new .form').fadeIn(300)
		$('.specification_info .top .add_new .form .input').focus()
	})

	$('.specification_info .top .add_new .form .clear_btn').click(function (e) {
		e.preventDefault()

		$('.specification_info .top .add_new .form').hide()
		$('.specification_info .top .add_new .form .input').val('')
		$('.specification_info .top .add_new > .btn').fadeIn(300)
	})


	// Спецификация
	$('.specification_info .get_prices .more_data .spoler_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('.specification_info .get_prices .form .additional_fields').slideToggle(300)
	})

	$('.specification_info .item .options .spoler_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})

	$('.specification_info .item .option .head').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})
})



window.addEventListener('load', function () {
	// Выравнивание элементов в сетке
	$('.products .flex').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})

	$('.courses .available .flex').each(function () {
		coursesHeight($(this), parseInt($(this).css('--courses_count')))
	})


	// Меню
	let window_hash = window.location.hash

	if ($(window_hash).length) {
		let addOffset = $(window_hash).data('offset')

		setTimeout(function(){
			window.scrollTo({top: $(window_hash).offset().top - addOffset, behavior: 'smooth'})
		}, 0)
	}
})



window.addEventListener('resize', function () {
	// Выравнивание элементов в сетке
	$('.products .flex').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})

	$('.courses .available .flex').each(function () {
		coursesHeight($(this), parseInt($(this).css('--courses_count')))
	})
})



var scrollTimer

window.addEventListener('scroll', function () {
	if (scrollTimer) clearTimeout(scrollTimer)
	$('.table_wrap').addClass('disable_hover')

	scrollTimer = setTimeout(() => {
		$('.table_wrap').removeClass('disable_hover')
	}, 100)
})



// Выравнивание решений
function productHeight(context, step) {
	let start = 0
	let finish = step
	let products = context.find('.product_wrap')

	products.height('auto').find('.name, .desc').height('auto')

	for (let i = 0; i < products.length; i++) {
		setHeight(products.slice(start, finish).find('.name'))
		setHeight(products.slice(start, finish).find('.desc'))
		setHeight(products.slice(start, finish))

		start = start + step
		finish = finish + step
	}
}


// Выравнивание курсов
function coursesHeight(context, step) {
	let start = 0
	let finish = step
	let courses = context.find('.course')

	courses.height('auto').find('.name, .desc').height('auto')

	for (let i = 0; i < courses.length; i++) {
		setHeight(courses.slice(start, finish).find('.name'))
		setHeight(courses.slice(start, finish).find('.desc'))

		start = start + step
		finish = finish + step
	}
}


// Выравнивание в сравнении
function compareHeight() {
	$('.compare_info .compare_features .list > *').height('auto')
	$('.compare_info .product_features .list > *').height('auto')

	let productFeatures = $('.compare_info .product_features .list'),
		compareFeatures = $('.compare_info .compare_features .list'),
		sizes = new Object()

	productFeatures.each(function () {
		$(this).find('> *').each(function () {
			if (sizes[$(this).index()]) {
				if ($(this).outerHeight() > sizes[$(this).index()]) {
					sizes[$(this).index()] = $(this).outerHeight()
				}
			} else {
				sizes[$(this).index()] = $(this).outerHeight()
			}
		})
	})

	compareFeatures.each(function () {
		$(this).find('> *').each(function () {
			if (sizes[$(this).index()]) {
				if ($(this).outerHeight() > sizes[$(this).index()]) {
					sizes[$(this).index()] = $(this).outerHeight()
				}
			} else {
				sizes[$(this).index()] = $(this).outerHeight()
			}
		})
	})

	$.each(sizes, (key, data) => {
		productFeatures.each(function () {
			$(this).find('> *:eq(' + key + ')').innerHeight(data)
		})

		$('.compare_info .compare_features .list > *:eq(' + key + ')').innerHeight(data)
	})

	$('.compare_info .swiper-scrollbar').css('top', $('.compare_info .products .product').outerHeight())
}