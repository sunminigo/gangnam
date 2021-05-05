$(function() {
	/****************************************
	 * SLIDER
	 *****************************************/
	$('#visual_slider').slick({
		lazyLoad: 'ondemand',
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		dots: true,
		prevArrow: '<button type="button" class="prev"><img src="../assets/images/icon/arrow_angle_left.png" alt="이전"></button>',
		nextArrow: '<button type="button" class="next"><img src="../assets/images/icon/arrow_angle_right.png" alt="다음"></button>',
	});
	$('.card_slider').slick({
		lazyLoad: 'ondemand',
		autoplay: false,
		rows: 2,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplaySpeed: 5000,
		arrows: true,
		dots: true,
		prevArrow: '<button type="button" class="prev" alt="버튼 이전"><img src="../assets/images/icon/arrow_angle_left.png" alt="이전"></button>',
		nextArrow: '<button type="button" class="next" alt="버튼 다음"><img src="../assets/images/icon/arrow_angle_right.png" alt="다음"></button>',
	});
	$('.room_view').slick({
		lazyLoad: 'ondemand',
		autoplay: false,
		slidesToShow: 1,
		arrows: false,
		asNavFor: '.rooms'
	});
	$('.rooms').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 5,
		arrows: false,
		focusOnSelect: true,
		asNavFor: '.room_view'
	});

	/****************************************
	 * NAVIGATION
	var url = window.location.pathname;
	var urlName = url.replace('/', '').split('.')[0];
	var getIframe = document.getElementsByTagName('iframe');

	var iframeUrl = $('#iframe_content').attr('src');

	$('.lnb_box').hide();
	$('.gnb').each(function () {
		var ref = $(this).children('button').attr('ref');

		if (iframeUrl.indexOf(ref) != -1) {
			$(this).addClass('active');
			$(this).find('.lnb_wrap').addClass('active');
		}

		$(this).on('click', function() {
			var noMenu = $('.lnb_box li').not('li:nth-child(2)');

			if ($(this).children().hasClass('lnb_wrap')) {
				$(this).addClass('active');
				$(this).find('.lnb_wrap').addClass('active');
				$('.gnb').not($(this)).removeClass('active').find('.lnb_wrap').removeClass('active');
				return true;
			} else {
				$('.gnb_wrap').removeClass('active');
				return false;
			}
		});
	});
	$('.lnb').each(function () {
		var href = $(this).find('a').attr('href');

		if (href != undefined) {
			href = href.split('.')[0]
		}
		if (iframeUrl.indexOf(href) != -1) {
			$(this).addClass('active');
		}
	});
	
	$('.btn_back').on('click', function(){
		$('.gnb_wrap').removeClass('active');
		$('.lnb_wrap').removeClass('active');
		$('.lnb').removeClass('active');
		return false;
	});
	 *****************************************/

	/****************************************
	* POPUP OPEN CLOSE
	*****************************************/
	$('[data-popup-open]').on('click', function(e)  {
		var targeted_popup_class = $(this).attr('data-popup-open');

		$('[data-popup="' + targeted_popup_class + '"]').fadeIn(600).addClass('active');
		$('.card_slider').slick('refresh');
		$('.room_view').slick('refresh');
		$('.rooms').slick('refresh');
		$('.zoom_box').addClass('box');
		$('.btn_one').addClass('box');

		e.preventDefault();
	});
	$('[data-popup-close]').on('click', function(e)  {
		var targeted_popup_class = $(this).attr('data-popup-close');

		$('[data-popup="' + targeted_popup_class + '"]').fadeOut('fast').removeClass('active');
		$('.zoom_box').removeClass('box');
		$('.btn_one').removeClass('box');

		e.preventDefault();
	});

	/****************************************
	 * TEXT SIZE
	 *****************************************/
	$('#control_text').on('click', function () {
		$('html, body').toggleClass('controlFontSize');
		$('#iframe_content').contents().find('html, body').toggleClass('controlFontSize');
	});

	/****************************************
	 * RANDOM COLOR
	let color = ['#127BDC', '#AF1280', '#FFB500', '#7CD800'];

	for(var i =0;i < $('.randomColor').length;i++){
		getColor = function(){
			let result = color[Math.floor(Math.random()*color.length)];
			return result;
		}
		var localObj = getColor();
		$('.randomColor:eq('+i+')').css('border-left-color', localObj );
	}
	 *****************************************/

	/****************************************
	 * FLOOR BUTTON
	 *****************************************/
	$('.btn_box .close').hide();
	$('.btn_box .next').show();
	$('.btn_box .next').click(function(){
		$('.close').show();
		$(this).hide();
	});
	$('.btn_box .close').click(function(){
		$('.next').show();
		$(this).hide();
	});

	/****************************************
	 * SCROLL TEXT
	 *****************************************/
	$('.scrollingText').smoothDivScroll({
		autoScrollingMode: "always",
		autoScrollingDirection: "endlessLoopRight",
		autoScrollingStep: 1,
		autoScrollingInterval: 25
	});
});

/****************************************
 * ZOOM IN OUT
 *****************************************/
var nowZoom = 100;

function zoomOut() {
	nowZoom = nowZoom - 10;
	if(nowZoom <= 100) nowZoom = 100;
	zooms();
}
function zoomIn() {
	nowZoom = nowZoom + 10;
	if(nowZoom >= 200) nowZoom = 200;
	zooms();
}
function zooms() {
	$('.zoom').css({
		'width': nowZoom + "%",
		'height': nowZoom + "%",
		'zoom': nowZoom + "%",
	})
	$('#iframe_content').contents().find('body').css({
		'width': nowZoom + "%",
		'height': nowZoom + "%",
		'zoom': nowZoom + "%",
	})

	if(nowZoom === 200) {
		alert('더 이상 확대할 수 없습니다.');
	}
}

/****************************************
 * TEXT READ
 *****************************************/
var synth = window.speechSynthesis;

$(function() {
	$('[alt]').focus(function() {
		textToSpeech( $(this).attr('alt') );
	});
});

function textToSpeech( text ) {
	var utterThis = new SpeechSynthesisUtterance( text );

	window.speechSynthesis.cancel();

	utterThis.onend = function (event) {
		console.log('SpeechSynthesisUtterance.onend');
	}
	utterThis.onerror = function (event) {
		console.error('SpeechSynthesisUtterance.onerror');
	}

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
			getIframe.src = 'iframe/'+url+'.html';
	
	if (getIframe.src.indexOf(url) != -1) {
		let text = url.split('_')[0]
		
		switch(text) {
			case 'introduce':
				var lnbList = document.getElementById('lnb_introduce').querySelectorAll('.lnb')
				
				document.getElementById('lnb_introduce').style.display = 'flex';
				document.getElementById('gnb_main').style.display = 'none';
				
				for(let i=0; i<lnbList.length; i++) {
					lnbList[i].querySelector('a').getAttribute('ref') == url
						? lnbList[i].classList.add('active')
						: lnbList[i].classList.remove('active')
				}
				break;
				
			case 'floor':
				var lnbList = document.getElementById('lnb_floor').querySelectorAll('.lnb')
				var targeted_popup_class = $(this).attr('data-popup-close');

				document.getElementById('lnb_floor').style.display = 'flex';
				document.getElementById('gnb_main').style.display = 'none';
				
				for(let i=0; i<lnbList.length; i++) {
					lnbList[i].querySelector('a').getAttribute('ref') == url
						? lnbList[i].classList.add('active')
						: lnbList[i].classList.remove('active')
				}
				if ($('.rental_detail_popup').hasClass('active')) {
					var targeted_popup_class = $('.rental_detail_popup').attr('data-popup-close');
					
					$('.rental_detail_popup').fadeOut('fast').removeClass('active');
					$('.zoom_box').removeClass('box');
					$('.btn_one').removeClass('box');
				}
				break;
			
			case 'traffic':
				var lnbList = document.getElementById('lnb_traffic').querySelectorAll('.lnb')
				
				document.getElementById('lnb_traffic').style.display = 'flex';
				document.getElementById('gnb_main').style.display = 'none';

				for(let i=0; i<lnbList.length; i++) {
					lnbList[i].querySelector('a').getAttribute('ref') == url
						? lnbList[i].classList.add('active')
						: lnbList[i].classList.remove('active')
				}
				break;
				
			case 'rental':
				var lnbList = document.getElementById('gnb_main').querySelectorAll('.gnb')
				console.log(url)
				for(let i=0; i<lnbList.length; i++) {
					console.log(lnbList[i].querySelector('button').getAttribute('ref'))
					lnbList[i].querySelector('button').getAttribute('ref') == url.split('_')[0]
						? lnbList[i].classList.add('active')
						: lnbList[i].classList.remove('active')
				}
				break;
		}
	}
}
