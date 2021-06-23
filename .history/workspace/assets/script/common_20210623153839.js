$(function () {
	/****************************************
	 * SLIDER
	 *****************************************/
	$('#visual_slider').slick({
		lazyLoad: 'ondemand',
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		dots: true,
		prevArrow:
			'<button type="button" class="prev"><img src="../assets/images/icon/arrow_angle_left.png" alt="이전"></button>',
		nextArrow:
			'<button type="button" class="next"><img src="../assets/images/icon/arrow_angle_right.png" alt="다음"></button>',
	});
	$('.notice_slider').slick({
		lazyLoad: 'ondemand',
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		arrows: true,
		dots: false,
		prevArrow:
			'<button type="button" class="prev" alt="버튼 이전"><img src="../assets/images/icon/arrow_angle_left.png" alt="이전"></button>',
		nextArrow:
			'<button type="button" class="next" alt="버튼 다음"><img src="../assets/images/icon/arrow_angle_right.png" alt="다음"></button>',
	});
	$('.notice_info_slider').slick({
		lazyLoad: 'ondemand',
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		arrows: true,
		dots: false,
		prevArrow:
			'<button type="button" class="prev" alt="버튼 이전"><img src="../assets/images/icon/arrow_angle_left.png" alt="이전"></button>',
		nextArrow:
			'<button type="button" class="next" alt="버튼 다음"><img src="../assets/images/icon/arrow_angle_right.png" alt="다음"></button>',
	});

	/****************************************
	 * POPUP OPEN CLOSE
	 *****************************************/
	$('[data-popup-open]').on('click', function (e) {
		console.log('1111111111');
		var targeted_popup_class = $(this).attr('data-popup-open');
		console.log('1111111111', targeted_popup_class);

		$('[data-popup="' + targeted_popup_class + '"]')
			.fadeIn(600)
			.addClass('active');
		$('.zoom_box').addClass('box');
		$('.btn_one').addClass('box');

		e.preventDefault();
	});
	$('[data-popup-close]').on('click', function (e) {
		var targeted_popup_class = $(this).attr('data-popup-close');

		$('[data-popup="' + targeted_popup_class + '"]')
			.fadeOut('fast')
			.removeClass('active');
		$('.zoom_box').removeClass('box');
		$('.btn_one').removeClass('box');

		e.preventDefault();
	});

	/****************************************
	 * TEXT SIZE
	 *****************************************/
	$('#control_text').on('click', function () {
		$('html, body').toggleClass('controlFontSize');
		$('#iframe_content')
			.contents()
			.find('html, body')
			.toggleClass('controlFontSize');
	});

	/****************************************
	 * FLOOR BUTTON
	 *****************************************/
	$('.btn_box .close').hide();
	$('.btn_box .next').show();
	$('.btn_box .next').click(function () {
		$('.close').show();
		$(this).hide();
	});
	$('.btn_box .close').click(function () {
		$('.next').show();
		$(this).hide();
	});

	/****************************************
	 * SCROLL TEXT
	 *****************************************/
	$('.scrollingText').smoothDivScroll({
		autoScrollingMode: 'always',
		autoScrollingDirection: 'endlessLoopRight',
		autoScrollingStep: 1,
		autoScrollingInterval: 25,
	});

	/****************************************
	 * SIGN LANGUAGE
	 *****************************************/
	$('.sign_language_box').click(function () {
		$('.sign_view').fadeToggle('linear');
		console.log($(this).find('img').attr('src'));
		var src =
			$(this).find('img').attr('src') == '../assets/images/icon/x.svg'
				? '../assets/images/icon/hand.svg'
				: '../assets/images/icon/x.svg';
		var text =
			$(this).find('span').text() == '수어 안내 닫기'
				? '수어 안내'
				: '수어 안내 닫기';
		$(this).find('img').attr('src', src);
		$(this).find('span').text(text);
	});
});

/****************************************
 * ZOOM IN OUT
 *****************************************/
var nowZoom = 100;
var nowZoomW = window.innerWidth;
var nowZoomH = window.innerHeight;
var multiple = 1.1;

function zoomIn() {
	if (nowZoomW == 1920) multiple = 1.1;
	if (nowZoomW == 2112) multiple = 1.2;
	if (nowZoomW == 2304) multiple = 1.3;

	nowZoomW = 1920 * multiple;
	nowZoomH = 1080 * multiple;

	if (nowZoomW >= 2496) {
		nowZoomW = 2496;
		alert('더 이상 확대할 수 없습니다.');
	}
	if (nowZoomH >= 1404) nowZoomH = 1404;
	zooms();
}
function zoomOut() {
	nowZoom = 100;
	nowZoomW = 1920;
	nowZoomH = 1080;
	multiple = 1;

	if (nowZoomW <= 1920) nowZoomW = 1920;
	if (nowZoomH <= 1080) nowZoomH = 1080;
	zooms();
}

function zooms() {
	$('.zoom').css({
		width: nowZoomW + 'px',
		height: nowZoomH + 'px',
		zoom: multiple,
	});
	$('#iframe_content').contents().find('body').css({
		zoom: multiple,
	});
}

/****************************************
 * TEXT READ
 *****************************************/
var synth = window.speechSynthesis;

$(function () {
	$('[alt]').focus(function () {
		textToSpeech($(this).attr('alt'));
	});
});

function textToSpeech(text) {
	var utterThis = new SpeechSynthesisUtterance(text);

	window.speechSynthesis.cancel();

	utterThis.onend = function (event) {
		console.log('SpeechSynthesisUtterance.onend');
	};
	utterThis.onerror = function (event) {
		console.error('SpeechSynthesisUtterance.onerror');
	};

	utterThis.lang = 'ko-KR';
	utterThis.pitch = 1;
	utterThis.rate = 1;
	synth.speak(utterThis);
}

/****************************************
 * CHANGE IFRAME URL
 *****************************************/
function changeIframeUrl(url) {
	var getIframe = document.getElementById('iframe_content');

	if (url == 'back') {
		window.history.back();

		if (getIframe.src.indexOf('/')) {
			$('.lnb_box').css('display', 'none');
			$('#gnb_main').css('display', 'flex');
		}
	}

	getIframe.src = 'iframe/' + url + '.html';

	if (getIframe.src.indexOf(url) != -1) {
		let text = url.split('_')[0];

		switch (text) {
			case 'introduce':
				var lnbList = document
					.getElementById('lnb_introduce')
					.querySelectorAll('.lnb');

				document.getElementById('lnb_introduce').style.display = 'flex';
				document.getElementById('gnb_main').style.display = 'none';

				for (let i = 0; i < lnbList.length; i++) {
					lnbList[i].querySelector('a').getAttribute('ref') == url
						? lnbList[i].classList.add('active')
						: lnbList[i].classList.remove('active');
				}
				break;

			case 'floor':
				var lnbList = document
					.getElementById('lnb_floor')
					.querySelectorAll('.lnb');
				var targeted_popup_class = $(this).attr('data-popup-close');

				document.getElementById('lnb_floor').style.display = 'flex';
				document.getElementById('gnb_main').style.display = 'none';

				for (let i = 0; i < lnbList.length; i++) {
					lnbList[i].querySelector('a').getAttribute('ref') == url
						? lnbList[i].classList.add('active')
						: lnbList[i].classList.remove('active');
				}
				if ($('.rental_detail_popup').hasClass('active')) {
					var targeted_popup_class = $('.rental_detail_popup').attr(
						'data-popup-close'
					);

					$('.rental_detail_popup').fadeOut('fast').removeClass('active');
					$('.zoom_box').removeClass('box');
					$('.btn_one').removeClass('box');
				}
				break;

			case 'traffic':
				var lnbList = document
					.getElementById('lnb_traffic')
					.querySelectorAll('.lnb');

				document.getElementById('lnb_traffic').style.display = 'flex';
				document.getElementById('gnb_main').style.display = 'none';

				for (let i = 0; i < lnbList.length; i++) {
					lnbList[i].querySelector('a').getAttribute('ref') == url
						? lnbList[i].classList.add('active')
						: lnbList[i].classList.remove('active');
				}
				break;

			case 'notice':
				var lnbList = document
					.getElementById('lnb_notice')
					.querySelectorAll('.lnb');

				document.getElementById('lnb_notice').style.display = 'flex';
				document.getElementById('gnb_main').style.display = 'none';

				for (let i = 0; i < lnbList.length; i++) {
					lnbList[i].querySelector('a').getAttribute('ref') == url
						? lnbList[i].classList.add('active')
						: lnbList[i].classList.remove('active');
				}
				break;
		}
	}
}
