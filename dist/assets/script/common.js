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

	if (url == 'back') {
		window.history.back();

		if (getIframe.src.indexOf('/')) {
			$('.lnb_box').css('display', 'none');
			$('.gnb_main').css('display', 'flex');
		}
	}

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

(function($){$.widget("thomaskahn.smoothDivScroll",{options:{scrollingHotSpotLeftClass:"scrollingHotSpotLeft",scrollingHotSpotRightClass:"scrollingHotSpotRight",scrollingHotSpotLeftVisibleClass:"scrollingHotSpotLeftVisible",scrollingHotSpotRightVisibleClass:"scrollingHotSpotRightVisible",scrollableAreaClass:"scrollableArea",scrollWrapperClass:"scrollWrapper",hiddenOnStart:false,getContentOnLoad:{},countOnlyClass:"",startAtElementId:"",hotSpotScrolling:true,hotSpotScrollingStep:15,hotSpotScrollingInterval:10,hotSpotMouseDownSpeedBooster:3,visibleHotSpotBackgrounds:"hover",hotSpotsVisibleTime:5000,easingAfterHotSpotScrolling:true,easingAfterHotSpotScrollingDistance:10,easingAfterHotSpotScrollingDuration:300,easingAfterHotSpotScrollingFunction:"easeOutQuart",mousewheelScrolling:"",mousewheelScrollingStep:70,easingAfterMouseWheelScrolling:true,easingAfterMouseWheelScrollingDuration:300,easingAfterMouseWheelScrollingFunction:"easeOutQuart",manualContinuousScrolling:false,autoScrollingMode:"",autoScrollingDirection:"endlessLoopRight",autoScrollingStep:1,autoScrollingInterval:10,touchScrolling:false,scrollToAnimationDuration:1000,scrollToEasingFunction:"easeOutQuart"},_create:function(){var self=this,o=this.options,el=this.element;el.data("scrollWrapper",el.find("."+o.scrollWrapperClass));el.data("scrollingHotSpotRight",el.find("."+o.scrollingHotSpotRightClass));el.data("scrollingHotSpotLeft",el.find("."+o.scrollingHotSpotLeftClass));el.data("scrollableArea",el.find("."+o.scrollableAreaClass));if(el.data("scrollingHotSpotRight").length>0){el.data("scrollingHotSpotRight").detach()}if(el.data("scrollingHotSpotLeft").length>0){el.data("scrollingHotSpotLeft").detach()}if(el.data("scrollableArea").length===0&&el.data("scrollWrapper").length===0){el.wrapInner("<div class='"+o.scrollableAreaClass+"'>").wrapInner("<div class='"+o.scrollWrapperClass+"'>");el.data("scrollWrapper",el.find("."+o.scrollWrapperClass));el.data("scrollableArea",el.find("."+o.scrollableAreaClass))}else if(el.data("scrollWrapper").length===0){el.wrapInner("<div class='"+o.scrollWrapperClass+"'>");el.data("scrollWrapper",el.find("."+o.scrollWrapperClass))}else if(el.data("scrollableArea").length===0){el.data("scrollWrapper").wrapInner("<div class='"+o.scrollableAreaClass+"'>");el.data("scrollableArea",el.find("."+o.scrollableAreaClass))}if(el.data("scrollingHotSpotRight").length===0){el.prepend("<div class='"+o.scrollingHotSpotRightClass+"'></div>");el.data("scrollingHotSpotRight",el.find("."+o.scrollingHotSpotRightClass))}else{el.prepend(el.data("scrollingHotSpotRight"))}if(el.data("scrollingHotSpotLeft").length===0){el.prepend("<div class='"+o.scrollingHotSpotLeftClass+"'></div>");el.data("scrollingHotSpotLeft",el.find("."+o.scrollingHotSpotLeftClass))}else{el.prepend(el.data("scrollingHotSpotLeft"))}el.data("speedBooster",1);el.data("scrollXPos",0);el.data("hotSpotWidth",el.data("scrollingHotSpotLeft").innerWidth());el.data("scrollableAreaWidth",0);el.data("startingPosition",0);el.data("rightScrollingInterval",null);el.data("leftScrollingInterval",null);el.data("autoScrollingInterval",null);el.data("hideHotSpotBackgroundsInterval",null);el.data("previousScrollLeft",0);el.data("pingPongDirection","right");el.data("getNextElementWidth",true);el.data("swapAt",null);el.data("startAtElementHasNotPassed",true);el.data("swappedElement",null);el.data("originalElements",el.data("scrollableArea").children(o.countOnlyClass));el.data("visible",true);el.data("enabled",true);el.data("scrollableAreaHeight",el.data("scrollableArea").height());el.data("scrollerOffset",el.offset());if(o.touchScrolling&&el.data("enabled")){el.data("scrollWrapper").kinetic({y:false,moved:function(settings){if(o.manualContinuousScrolling){if(el.data("scrollWrapper").scrollLeft()<=0){self._checkContinuousSwapLeft()}else{self._checkContinuousSwapRight()}}self._trigger("touchMoved")},stopped:function(settings){el.data("scrollWrapper").stop(true,false);self.stopAutoScrolling();self._trigger("touchStopped")}})}el.data("scrollingHotSpotRight").bind("mousemove",function(e){if(o.hotSpotScrolling){var x=e.pageX-$(this).offset().left;el.data("scrollXPos",Math.round((x/el.data("hotSpotWidth"))*o.hotSpotScrollingStep));if(el.data("scrollXPos")===Infinity||el.data("scrollXPos")<1){el.data("scrollXPos",1)}}});el.data("scrollingHotSpotRight").bind("mouseover",function(){if(o.hotSpotScrolling){el.data("scrollWrapper").stop(true,false);self.stopAutoScrolling();el.data("rightScrollingInterval",setInterval(function(){if(el.data("scrollXPos")>0&&el.data("enabled")){el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+(el.data("scrollXPos")*el.data("speedBooster")));if(o.manualContinuousScrolling){self._checkContinuousSwapRight()}self._showHideHotSpots()}},o.hotSpotScrollingInterval));self._trigger("mouseOverRightHotSpot")}});el.data("scrollingHotSpotRight").bind("mouseout",function(){if(o.hotSpotScrolling){clearInterval(el.data("rightScrollingInterval"));el.data("scrollXPos",0);if(o.easingAfterHotSpotScrolling&&el.data("enabled")){el.data("scrollWrapper").animate({scrollLeft:el.data("scrollWrapper").scrollLeft()+o.easingAfterHotSpotScrollingDistance},{duration:o.easingAfterHotSpotScrollingDuration,easing:o.easingAfterHotSpotScrollingFunction})}}});el.data("scrollingHotSpotRight").bind("mousedown",function(){el.data("speedBooster",o.hotSpotMouseDownSpeedBooster)});$("body").bind("mouseup",function(){el.data("speedBooster",1)});el.data("scrollingHotSpotLeft").bind("mousemove",function(e){if(o.hotSpotScrolling){var x=el.data("hotSpotWidth")-(e.pageX-$(this).offset().left);el.data("scrollXPos",Math.round((x/el.data("hotSpotWidth"))*o.hotSpotScrollingStep));if(el.data("scrollXPos")===Infinity||el.data("scrollXPos")<1){el.data("scrollXPos",1)}}});el.data("scrollingHotSpotLeft").bind("mouseover",function(){if(o.hotSpotScrolling){el.data("scrollWrapper").stop(true,false);self.stopAutoScrolling();el.data("leftScrollingInterval",setInterval(function(){if(el.data("scrollXPos")>0&&el.data("enabled")){el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()-(el.data("scrollXPos")*el.data("speedBooster")));if(o.manualContinuousScrolling){self._checkContinuousSwapLeft()}self._showHideHotSpots()}},o.hotSpotScrollingInterval));self._trigger("mouseOverLeftHotSpot")}});el.data("scrollingHotSpotLeft").bind("mouseout",function(){if(o.hotSpotScrolling){clearInterval(el.data("leftScrollingInterval"));el.data("scrollXPos",0);if(o.easingAfterHotSpotScrolling&&el.data("enabled")){el.data("scrollWrapper").animate({scrollLeft:el.data("scrollWrapper").scrollLeft()-o.easingAfterHotSpotScrollingDistance},{duration:o.easingAfterHotSpotScrollingDuration,easing:o.easingAfterHotSpotScrollingFunction})}}});el.data("scrollingHotSpotLeft").bind("mousedown",function(){el.data("speedBooster",o.hotSpotMouseDownSpeedBooster)});el.data("scrollableArea").mousewheel(function(event,delta,deltaX,deltaY){if(el.data("enabled")&&o.mousewheelScrolling.length>0){var pixels;if(o.mousewheelScrolling==="vertical"&&deltaY!==0){self.stopAutoScrolling();event.preventDefault();pixels=Math.round((o.mousewheelScrollingStep*deltaY)*-1);self.move(pixels)}else if(o.mousewheelScrolling==="horizontal"&&deltaX!==0){self.stopAutoScrolling();event.preventDefault();pixels=Math.round((o.mousewheelScrollingStep*deltaX)*-1);self.move(pixels)}else if(o.mousewheelScrolling==="allDirections"){self.stopAutoScrolling();event.preventDefault();pixels=Math.round((o.mousewheelScrollingStep*delta)*-1);self.move(pixels)}}});if(o.mousewheelScrolling){el.data("scrollingHotSpotLeft").add(el.data("scrollingHotSpotRight")).mousewheel(function(event){event.preventDefault()})}$(window).bind("resize",function(){self._showHideHotSpots();self._trigger("windowResized")});if(!(jQuery.isEmptyObject(o.getContentOnLoad))){self[o.getContentOnLoad.method](o.getContentOnLoad.content,o.getContentOnLoad.manipulationMethod,o.getContentOnLoad.addWhere,o.getContentOnLoad.filterTag)}if(o.hiddenOnStart){self.hide()}$(window).load(function(){if(!(o.hiddenOnStart)){self.recalculateScrollableArea()}if((o.autoScrollingMode.length>0)&&!(o.hiddenOnStart)){self.startAutoScrolling()}if(o.autoScrollingMode!=="always"){switch(o.visibleHotSpotBackgrounds){case"always":self.showHotSpotBackgrounds();break;case"onStart":self.showHotSpotBackgrounds();el.data("hideHotSpotBackgroundsInterval",setTimeout(function(){self.hideHotSpotBackgrounds(250)},o.hotSpotsVisibleTime));break;case"hover":el.mouseenter(function(event){if(o.hotSpotScrolling){event.stopPropagation();self.showHotSpotBackgrounds(250)}}).mouseleave(function(event){if(o.hotSpotScrolling){event.stopPropagation();self.hideHotSpotBackgrounds(250)}});break;default:break}}self._showHideHotSpots();self._trigger("setupComplete")})},_init:function(){var self=this,el=this.element;self.recalculateScrollableArea();self._showHideHotSpots();self._trigger("initializationComplete")},_setOption:function(key,value){var self=this,o=this.options,el=this.element;o[key]=value;if(key==="hotSpotScrolling"){if(value===true){self._showHideHotSpots()}else{el.data("scrollingHotSpotLeft").hide();el.data("scrollingHotSpotRight").hide()}}else if(key==="autoScrollingStep"||key==="easingAfterHotSpotScrollingDistance"||key==="easingAfterHotSpotScrollingDuration"||key==="easingAfterMouseWheelScrollingDuration"){o[key]=parseInt(value,10)}else if(key==="autoScrollingInterval"){o[key]=parseInt(value,10);self.startAutoScrolling()}},showHotSpotBackgrounds:function(fadeSpeed){var self=this,el=this.element,o=this.options;if(fadeSpeed!==undefined){el.data("scrollingHotSpotLeft").addClass(o.scrollingHotSpotLeftVisibleClass);el.data("scrollingHotSpotRight").addClass(o.scrollingHotSpotRightVisibleClass);el.data("scrollingHotSpotLeft").add(el.data("scrollingHotSpotRight")).fadeTo(fadeSpeed,0.35)}else{el.data("scrollingHotSpotLeft").addClass(o.scrollingHotSpotLeftVisibleClass);el.data("scrollingHotSpotLeft").removeAttr("style");el.data("scrollingHotSpotRight").addClass(o.scrollingHotSpotRightVisibleClass);el.data("scrollingHotSpotRight").removeAttr("style")}self._showHideHotSpots()},hideHotSpotBackgrounds:function(fadeSpeed){var el=this.element,o=this.options;if(fadeSpeed!==undefined){el.data("scrollingHotSpotLeft").fadeTo(fadeSpeed,0.0,function(){el.data("scrollingHotSpotLeft").removeClass(o.scrollingHotSpotLeftVisibleClass)});el.data("scrollingHotSpotRight").fadeTo(fadeSpeed,0.0,function(){el.data("scrollingHotSpotRight").removeClass(o.scrollingHotSpotRightVisibleClass)})}else{el.data("scrollingHotSpotLeft").removeClass(o.scrollingHotSpotLeftVisibleClass).removeAttr("style");el.data("scrollingHotSpotRight").removeClass(o.scrollingHotSpotRightVisibleClass).removeAttr("style")}},_showHideHotSpots:function(){var self=this,el=this.element,o=this.options;if(!(o.hotSpotScrolling)){el.data("scrollingHotSpotLeft").hide();el.data("scrollingHotSpotRight").hide()}else{if(o.hotSpotScrolling&&o.autoScrollingMode!=="always"&&el.data("autoScrollingInterval")!==null){el.data("scrollingHotSpotLeft").show();el.data("scrollingHotSpotRight").show()}else if(o.autoScrollingMode!=="always"&&o.hotSpotScrolling){if(el.data("scrollableAreaWidth")<=(el.data("scrollWrapper").innerWidth())){el.data("scrollingHotSpotLeft").hide();el.data("scrollingHotSpotRight").hide()}else if(el.data("scrollWrapper").scrollLeft()===0){el.data("scrollingHotSpotLeft").hide();el.data("scrollingHotSpotRight").show();self._trigger("scrollerLeftLimitReached");clearInterval(el.data("leftScrollingInterval"));el.data("leftScrollingInterval",null)}else if(el.data("scrollableAreaWidth")<=(el.data("scrollWrapper").innerWidth()+el.data("scrollWrapper").scrollLeft())){el.data("scrollingHotSpotLeft").show();el.data("scrollingHotSpotRight").hide();self._trigger("scrollerRightLimitReached");clearInterval(el.data("rightScrollingInterval"));el.data("rightScrollingInterval",null)}else{el.data("scrollingHotSpotLeft").show();el.data("scrollingHotSpotRight").show()}}else{el.data("scrollingHotSpotLeft").hide();el.data("scrollingHotSpotRight").hide()}}},_setElementScrollPosition:function(method,element){var el=this.element,o=this.options,tempScrollPosition=0;switch(method){case"first":el.data("scrollXPos",0);return true;case"start":if(o.startAtElementId!==""){if(el.data("scrollableArea").has("#"+o.startAtElementId)){tempScrollPosition=$("#"+o.startAtElementId).position().left;el.data("scrollXPos",tempScrollPosition);return true}}return false;case"last":el.data("scrollXPos",(el.data("scrollableAreaWidth")-el.data("scrollWrapper").innerWidth()));return true;case"number":if(!(isNaN(element))){tempScrollPosition=el.data("scrollableArea").children(o.countOnlyClass).eq(element-1).position().left;el.data("scrollXPos",tempScrollPosition);return true}return false;case"id":if(element.length>0){if(el.data("scrollableArea").has("#"+element)){tempScrollPosition=$("#"+element).position().left;el.data("scrollXPos",tempScrollPosition);return true}}return false;default:return false}},jumpToElement:function(jumpTo,element){var self=this,el=this.element;if(el.data("enabled")){if(self._setElementScrollPosition(jumpTo,element)){el.data("scrollWrapper").scrollLeft(el.data("scrollXPos"));self._showHideHotSpots();switch(jumpTo){case"first":self._trigger("jumpedToFirstElement");break;case"start":self._trigger("jumpedToStartElement");break;case"last":self._trigger("jumpedToLastElement");break;case"number":self._trigger("jumpedToElementNumber",null,{"elementNumber":element});break;case"id":self._trigger("jumpedToElementId",null,{"elementId":element});break;default:break}}}},scrollToElement:function(scrollTo,element){var self=this,el=this.element,o=this.options,autoscrollingWasRunning=false;if(el.data("enabled")){if(self._setElementScrollPosition(scrollTo,element)){if(el.data("autoScrollingInterval")!==null){self.stopAutoScrolling();autoscrollingWasRunning=true}el.data("scrollWrapper").stop(true,false);el.data("scrollWrapper").animate({scrollLeft:el.data("scrollXPos")},{duration:o.scrollToAnimationDuration,easing:o.scrollToEasingFunction,complete:function(){if(autoscrollingWasRunning){self.startAutoScrolling()}self._showHideHotSpots();switch(scrollTo){case"first":self._trigger("scrolledToFirstElement");break;case"start":self._trigger("scrolledToStartElement");break;case"last":self._trigger("scrolledToLastElement");break;case"number":self._trigger("scrolledToElementNumber",null,{"elementNumber":element});break;case"id":self._trigger("scrolledToElementId",null,{"elementId":element});break;default:break}}})}}},move:function(pixels){var self=this,el=this.element,o=this.options;el.data("scrollWrapper").stop(true,true);if((pixels<0&&el.data("scrollWrapper").scrollLeft()>0)||(pixels>0&&el.data("scrollableAreaWidth")>(el.data("scrollWrapper").innerWidth()+el.data("scrollWrapper").scrollLeft()))||o.manualContinuousScrolling){var scrollLength=el.data("scrollableArea").width()-el.data("scrollWrapper").width();var sOffset=el.data("scrollWrapper").scrollLeft()+pixels;if(sOffset<0){var forceSwapElementLeft=function(){el.data("swappedElement",el.data("scrollableArea").children(":last").detach());el.data("scrollableArea").prepend(el.data("swappedElement"));el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+el.data("swappedElement").outerWidth(true))};while(sOffset<0){forceSwapElementLeft();sOffset=el.data("scrollableArea").children(":first").outerWidth(true)+sOffset}}else if(sOffset-scrollLength>0){var forceSwapElementRight=function(){el.data("swappedElement",el.data("scrollableArea").children(":first").detach());el.data("scrollableArea").append(el.data("swappedElement"));var wrapperLeft=el.data("scrollWrapper").scrollLeft();el.data("scrollWrapper").scrollLeft(wrapperLeft-el.data("swappedElement").outerWidth(true))};while(sOffset-scrollLength>0){forceSwapElementRight();sOffset=sOffset-el.data("scrollableArea").children(":last").outerWidth(true)}}if(o.easingAfterMouseWheelScrolling){el.data("scrollWrapper").animate({scrollLeft:el.data("scrollWrapper").scrollLeft()+pixels},{duration:o.easingAfterMouseWheelScrollingDuration,easing:o.easingAfterMouseWheelFunction,complete:function(){self._showHideHotSpots();if(o.manualContinuousScrolling){if(pixels>0){self._checkContinuousSwapRight()}else{self._checkContinuousSwapLeft()}}}})}else{el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+pixels);self._showHideHotSpots();if(o.manualContinuousScrolling){if(pixels>0){self._checkContinuousSwapRight()}else{self._checkContinuousSwapLeft()}}}}},getFlickrContent:function(content,manipulationMethod){var self=this,el=this.element;$.getJSON(content,function(data){var flickrImageSizes=[{size:"small square",pixels:75,letter:"_s"},{size:"thumbnail",pixels:100,letter:"_t"},{size:"small",pixels:240,letter:"_m"},{size:"medium",pixels:500,letter:""},{size:"medium 640",pixels:640,letter:"_z"},{size:"large",pixels:1024,letter:"_b"}];var loadedFlickrImages=[];var imageIdStringBuffer=[];var startingIndex;var numberOfFlickrItems=data.items.length;var loadedFlickrImagesCounter=0;if(el.data("scrollableAreaHeight")<=75){startingIndex=0}else if(el.data("scrollableAreaHeight")<=100){startingIndex=1}else if(el.data("scrollableAreaHeight")<=240){startingIndex=2}else if(el.data("scrollableAreaHeight")<=500){startingIndex=3}else if(el.data("scrollableAreaHeight")<=640){startingIndex=4}else{startingIndex=5}$.each(data.items,function(index,item){loadFlickrImage(item,startingIndex)});function loadFlickrImage(item,sizeIndex){var path=item.media.m;var imgSrc=path.replace("_m",flickrImageSizes[sizeIndex].letter);var tempImg=$("<img />").attr("src",imgSrc);tempImg.load(function(){if(this.height<el.data("scrollableAreaHeight")){if((sizeIndex+1)<flickrImageSizes.length){loadFlickrImage(item,sizeIndex+1)}else{addImageToLoadedImages(this)}}else{addImageToLoadedImages(this)}if(loadedFlickrImagesCounter===numberOfFlickrItems){switch(manipulationMethod){case"addFirst":el.data("scrollableArea").children(":first").before(loadedFlickrImages);break;case"addLast":el.data("scrollableArea").children(":last").after(loadedFlickrImages);break;default:el.data("scrollableArea").html(loadedFlickrImages);break}self.recalculateScrollableArea();self._showHideHotSpots();self._trigger("addedFlickrContent",null,{"addedElementIds":imageIdStringBuffer})}})}function addImageToLoadedImages(imageObj){var widthScalingFactor=el.data("scrollableAreaHeight")/imageObj.height;var tempWidth=Math.round(imageObj.width*widthScalingFactor);var tempIdArr=$(imageObj).attr("src").split("/");var lastElemIndex=(tempIdArr.length-1);tempIdArr=tempIdArr[lastElemIndex].split(".");$(imageObj).attr("id",tempIdArr[0]);$(imageObj).css({"height":el.data("scrollableAreaHeight"),"width":tempWidth});imageIdStringBuffer.push(tempIdArr[0]);loadedFlickrImages.push(imageObj);loadedFlickrImagesCounter++}})},getAjaxContent:function(content,manipulationMethod,filterTag){var self=this,el=this.element;$.ajaxSetup({cache:false});$.get(content,function(data){var filteredContent;if(filterTag!==undefined){if(filterTag.length>0){filteredContent=$("<div>").html(data).find(filterTag)}else{filteredContent=content}}else{filteredContent=data}switch(manipulationMethod){case"addFirst":el.data("scrollableArea").children(":first").before(filteredContent);break;case"addLast":el.data("scrollableArea").children(":last").after(filteredContent);break;default:el.data("scrollableArea").html(filteredContent);break}self.recalculateScrollableArea();self._showHideHotSpots();self._trigger("addedAjaxContent")})},getHtmlContent:function(content,manipulationMethod,filterTag){var self=this,el=this.element;var filteredContent;if(filterTag!==undefined){if(filterTag.length>0){filteredContent=$("<div>").html(content).find(filterTag)}else{filteredContent=content}}else{filteredContent=content}switch(manipulationMethod){case"addFirst":el.data("scrollableArea").children(":first").before(filteredContent);break;case"addLast":el.data("scrollableArea").children(":last").after(filteredContent);break;default:el.data("scrollableArea").html(filteredContent);break}self.recalculateScrollableArea();self._showHideHotSpots();self._trigger("addedHtmlContent")},recalculateScrollableArea:function(){var tempScrollableAreaWidth=0,foundStartAtElement=false,o=this.options,el=this.element;el.data("scrollableArea").children(o.countOnlyClass).each(function(){if((o.startAtElementId.length>0)&&(($(this).attr("id"))===o.startAtElementId)){el.data("startingPosition",tempScrollableAreaWidth);foundStartAtElement=true}tempScrollableAreaWidth=tempScrollableAreaWidth+$(this).outerWidth(true)});if(!(foundStartAtElement)){el.data("startAtElementId","")}el.data("scrollableAreaWidth",tempScrollableAreaWidth);el.data("scrollableArea").width(el.data("scrollableAreaWidth"));el.data("scrollWrapper").scrollLeft(el.data("startingPosition"));el.data("scrollXPos",el.data("startingPosition"))},getScrollerOffset:function(){var el=this.element;return el.data("scrollWrapper").scrollLeft()},stopAutoScrolling:function(){var self=this,el=this.element;if(el.data("autoScrollingInterval")!==null){clearInterval(el.data("autoScrollingInterval"));el.data("autoScrollingInterval",null);self._showHideHotSpots();self._trigger("autoScrollingStopped")}},startAutoScrolling:function(){var self=this,el=this.element,o=this.options;if(el.data("enabled")){self._showHideHotSpots();clearInterval(el.data("autoScrollingInterval"));el.data("autoScrollingInterval",null);self._trigger("autoScrollingStarted");el.data("autoScrollingInterval",setInterval(function(){if(!(el.data("visible"))||(el.data("scrollableAreaWidth")<=(el.data("scrollWrapper").innerWidth()))){clearInterval(el.data("autoScrollingInterval"));el.data("autoScrollingInterval",null)}else{el.data("previousScrollLeft",el.data("scrollWrapper").scrollLeft());switch(o.autoScrollingDirection){case"right":el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+o.autoScrollingStep);if(el.data("previousScrollLeft")===el.data("scrollWrapper").scrollLeft()){self._trigger("autoScrollingRightLimitReached");self.stopAutoScrolling()}break;case"left":el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()-o.autoScrollingStep);if(el.data("previousScrollLeft")===el.data("scrollWrapper").scrollLeft()){self._trigger("autoScrollingLeftLimitReached");self.stopAutoScrolling()}break;case"backAndForth":if(el.data("pingPongDirection")==="right"){el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+(o.autoScrollingStep))}else{el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()-(o.autoScrollingStep))}if(el.data("previousScrollLeft")===el.data("scrollWrapper").scrollLeft()){if(el.data("pingPongDirection")==="right"){el.data("pingPongDirection","left");self._trigger("autoScrollingRightLimitReached")}else{el.data("pingPongDirection","right");self._trigger("autoScrollingLeftLimitReached")}}break;case"endlessLoopRight":el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+o.autoScrollingStep);self._checkContinuousSwapRight();break;case"endlessLoopLeft":el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()-o.autoScrollingStep);self._checkContinuousSwapLeft();break;default:break}}},o.autoScrollingInterval))}},_checkContinuousSwapRight:function(){var el=this.element,o=this.options;if(el.data("getNextElementWidth")){if((o.startAtElementId.length>0)&&(el.data("startAtElementHasNotPassed"))){el.data("swapAt",$("#"+o.startAtElementId).outerWidth(true));el.data("startAtElementHasNotPassed",false)}else{el.data("swapAt",el.data("scrollableArea").children(":first").outerWidth(true))}el.data("getNextElementWidth",false)}if(el.data("swapAt")<=el.data("scrollWrapper").scrollLeft()){el.data("swappedElement",el.data("scrollableArea").children(":first").detach());el.data("scrollableArea").append(el.data("swappedElement"));var wrapperLeft=el.data("scrollWrapper").scrollLeft();el.data("scrollWrapper").scrollLeft(wrapperLeft-el.data("swappedElement").outerWidth(true));el.data("getNextElementWidth",true)}},_checkContinuousSwapLeft:function(){var el=this.element,o=this.options;if(el.data("getNextElementWidth")){if((o.startAtElementId.length>0)&&(el.data("startAtElementHasNotPassed"))){el.data("swapAt",$("#"+o.startAtElementId).outerWidth(true));el.data("startAtElementHasNotPassed",false)}else{el.data("swapAt",el.data("scrollableArea").children(":first").outerWidth(true))}el.data("getNextElementWidth",false)}if(el.data("scrollWrapper").scrollLeft()===0){el.data("swappedElement",el.data("scrollableArea").children(":last").detach());el.data("scrollableArea").prepend(el.data("swappedElement"));el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+el.data("swappedElement").outerWidth(true));el.data("getNextElementWidth",true)}},restoreOriginalElements:function(){var self=this,el=this.element;el.data("scrollableArea").html(el.data("originalElements"));self.recalculateScrollableArea();self.jumpToElement("first")},show:function(){var el=this.element;el.data("visible",true);el.show()},hide:function(){var el=this.element;el.data("visible",false);el.hide()},enable:function(){var el=this.element;if(this.options.touchScrolling){el.data("scrollWrapper").kinetic('attach')}el.data("enabled",true)},disable:function(){var self=this,el=this.element;self.stopAutoScrolling();clearInterval(el.data("rightScrollingInterval"));clearInterval(el.data("leftScrollingInterval"));clearInterval(el.data("hideHotSpotBackgroundsInterval"));if(this.options.touchScrolling){el.data("scrollWrapper").kinetic('detach')}el.data("enabled",false)},destroy:function(){var self=this,el=this.element;self.stopAutoScrolling();clearInterval(el.data("rightScrollingInterval"));clearInterval(el.data("leftScrollingInterval"));clearInterval(el.data("hideHotSpotBackgroundsInterval"));el.data("scrollingHotSpotRight").unbind("mouseover");el.data("scrollingHotSpotRight").unbind("mouseout");el.data("scrollingHotSpotRight").unbind("mousedown");el.data("scrollingHotSpotLeft").unbind("mouseover");el.data("scrollingHotSpotLeft").unbind("mouseout");el.data("scrollingHotSpotLeft").unbind("mousedown");el.unbind("mousenter");el.unbind("mouseleave");el.data("scrollingHotSpotRight").remove();el.data("scrollingHotSpotLeft").remove();el.data("scrollableArea").remove();el.data("scrollWrapper").remove();el.html(el.data("originalElements"));$.Widget.prototype.destroy.apply(this,arguments)}})})(jQuery);
