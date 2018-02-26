(function () {
	var slider = $('#slider' );

	slider.on('init', function() {
		setTimeout(function() {
			$('.img-scale').imageScale({
				rescaleOnResize: true,
				align: 'center'
			});
		}, 1000);
	});

	slider.slick({
		autoplay: false,
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		swipeToSlide: true,
		adaptiveHeight: true,
		adaptiveWidth: true,
		fade: true,
		cssEase: 'linear',
		nextArrow: $('.banner .right'),
		prevArrow: $('.banner .left'),
		responsive: [
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
})();

//match height//
(function() {
	$('.match-height-elem').matchHeight();
}());

//scroll animation//
(function(){
	$('.scroll-to').on('touch click', function (event) {
		var jThis =  $(this);
		var id = jThis.attr('href');
		var top = $(id).offset().top;
		var headerHeight = $('.header').outerHeight();
		event.preventDefault();

		addActiveClass(jThis);
		$('body,html').animate({scrollTop: top - headerHeight}, 2000);
	});

	function addActiveClass(elem) {
		$('.scroll-to').removeClass('active');
		if(elem.closest('.navigation').length){
			elem.addClass('active');
		}
	}

}());

//add active class on scroll//
(function(){
	var windowElem = $(window);
	var sectionElem = $('section[data-section]');
	var sectionsArr = [];

	sectionElem.each(function (index, elem) {
		var jElem = $(elem);
		var objElem = {
			id: jElem.attr('id'),
			height: jElem.outerHeight(),
			top: jElem.offset().top
		}
		sectionsArr.push(objElem);
	})

	windowElem.on('scroll', function(){
		var activatePosition = windowElem.scrollTop() + windowElem.height() / 2.5;

		sectionsArr.forEach(function(currentObj){
			var elems = $('nav .navigation a');
			if(
				activatePosition >= currentObj.top && 
				activatePosition <= (currentObj.top + currentObj.height)
			) {
				elems.removeClass('active');
				$('[href="#'+ currentObj.id +'"]').addClass('active');
			}
		});
	});
}());
// show mobile menu//
(function(){
	var buttonElem = $('.menu');
	var navElem = $('nav .navigation');

	buttonElem.on('touch click', function(){
		if(navElem.hasClass('active')){
			navElem.removeClass('active');
			buttonElem.removeClass('active');
			return;
		}

		$(window).on('scroll', function() {
			navElem.removeClass('active');
			buttonElem.removeClass('active');
		});
		navElem.addClass('active');
		buttonElem.addClass('active');
	});
}());

//sticky header//
(function(){
	var headerElem = $('.header');
	var windowElem = $(window);
	var headerInitialHeight = headerElem.outerHeight();

	windowElem.on('scroll', function() {
		var scrollTop = windowElem.scrollTop();
		var bodyElem = $('body');
		var headerCurrentHeight;

		if(scrollTop > headerInitialHeight) {
			if (headerElem.hasClass('fixed')) return;

			headerElem.addClass('fixed');
			headerCurrentHeight = headerElem.css('height', 'auto').outerHeight();
			headerElem.css('height', 0);
			bodyElem.css('padding-top', headerInitialHeight + 'px');

			headerElem.animate({
				height: headerCurrentHeight
			}, 700);
		} else {
			if (!headerElem.hasClass('fixed')) return;

			headerElem.stop(true, true);

			headerElem.removeClass('fixed');
			bodyElem.css('padding-top', '0px');
			headerElem.css('height', headerInitialHeight);
		}
	});
}());

// map//
function initMap() {
	"user strice";
	var myOptions = {
		zoom: 12,
		minZoom: 4,
		maxZoom: 40,
		center: new google.maps.LatLng(38.708249, -77.022968),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		fullscreenControl: false,
		streetViewControl: false,
		zoomControl: false,
		scaleControl: false
	};

	var mapElem = document.getElementById('map');

	if(mapElem == null) { return; }
	map = new google.maps.Map(mapElem, myOptions);

	marker = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(38.708249, -77.022968),
		icon: 'images/marker.png'
	});

	infowindow = new google.maps.InfoWindow({content:'<strong>Queens Park</strong><br>Fort Washington, MD 20744<br>USA'});

	google.maps.event.addListener(marker, 'click', function(){
		infowindow.open(map,marker);
	});

	infowindow.open(map,marker);

	map.set('styles',
		[
			{
				"featureType": "all",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"saturation": 36
					},
					{
						"color": "#000000"
					},
					{
						"lightness": 40
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"color": "#000000"
					},
					{
						"lightness": 16
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 20
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 17
					},
					{
						"weight": 1.2
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 20
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 21
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 17
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 29
					},
					{
						"weight": 0.2
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 18
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 16
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 19
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 17
					}
				]
			}
		]
	);
};

//footer//
(function windowHeight(){
	var headerElem = $('.header').height();
	var footerElem = $('.footer').height();
	var windowElem = $(window).height();
	var heightContent = windowElem - headerElem -footerElem;

	$('#content').css('min-height' , heightContent);
}());
