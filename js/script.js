(function($) { 


/* functions run on window load */
$(window).load(function() {
	// Used for all the video modules for the login popup
	//jQuery(".inline").colorbox({inline:true, width:"50%"});
	
	focusBanner.init();
	/* Need to call this again for when Galleria plugin is finished loading */
	imageOverlay.init();
	videoModule.init();
	/* make sure you load gradientColHeight last or you may have issues 
	as other items will not have finished loading/ rendering into the page */
	initStyling.gradientColHeight();	
	initStyling.gradientColHeightGalleria();
	booted.init();	
});

/* functions run on document ready */
$(document).ready(function() {
	telnumber.init();	
	//wdx_form.init();	- had to be completed in wdx

	focusBanner.init();
	initStyling.init();
	tooltip.init();	
	videoSingle.init();
	changeWarning.init();
	//themeGenerator.init();
	videoBox.init();	
	browser_check.init();
	booted.init();	


	if($('.equal-heights').length) {
		$('.equal-heights').matchHeight({byRow: 0});
		setTimeout(function(){ $('.equal-heights').matchHeight({byRow: 0}); }, 500);	
		jQuery(document).ajaxComplete(function(e, xhr, settings) {
			$('.equal-heights').matchHeight({byRow: 0});
			setTimeout(function(){ $('.equal-heights').matchHeight({byRow: 0}); }, 500);
		}); 
	}
	if($('.equal-heights-2').length) {
		$('.equal-heights-2').matchHeight({byRow: 0});
		setTimeout(function(){ $('.equal-heights-2').matchHeight({byRow: 0}); }, 500);	
		jQuery(document).ajaxComplete(function(e, xhr, settings) {
			$('.equal-heights-2').matchHeight({byRow: 0});
			setTimeout(function(){ $('.equal-heights-2').matchHeight({byRow: 0}); }, 500);
		}); 
	}
	if($('.equal-heights-3').length) {
		$('.equal-heights-3').matchHeight({byRow: 0});
		setTimeout(function(){ $('.equal-heights-3').matchHeight({byRow: 0}); }, 500);	
		jQuery(document).ajaxComplete(function(e, xhr, settings) {
			$('.equal-heights-3').matchHeight({byRow: 0});
			setTimeout(function(){ $('.equal-heights-3').matchHeight({byRow: 0}); }, 500);
		}); 
	}
	if($('.equal-heights-header').length) {
		$('.equal-heights-header').matchHeight({byRow: 0});
		setTimeout(function(){ $('.equal-heights-header').matchHeight({byRow: 0}); }, 500);	
		jQuery(document).ajaxComplete(function(e, xhr, settings) {
			$('.equal-heights-header').matchHeight({byRow: 0});
			setTimeout(function(){ $('.equal-heights-header').matchHeight({byRow: 0}); }, 500);
		}); 
	}
	if($('.equal-heights-services').length) {
		$('.equal-heights-services').matchHeight({byRow: 0});
		setTimeout(function(){ $('.equal-heights-services').matchHeight({byRow: 0}); }, 500);	
		jQuery(document).ajaxComplete(function(e, xhr, settings) {
			$('.equal-heights-services').matchHeight({byRow: 0});
			setTimeout(function(){ $('.equal-heights-services').matchHeight({byRow: 0}); }, 500);
		}); 
	}
	if($('.equal-heights-document').length) {
		$('.equal-heights-document').matchHeight({byRow: 0});
		setTimeout(function(){ $('.equal-heights-document').matchHeight({byRow: 0}); }, 500);	
		jQuery(document).ajaxComplete(function(e, xhr, settings) {
			$('.equal-heights-document').matchHeight({byRow: 0});
			setTimeout(function(){ $('.equal-heights-document').matchHeight({byRow: 0}); }, 500);
		}); 
	}
	if($('.equal-heights-team').length) {
		$('.equal-heights-team').matchHeight({byRow: 0});
		setTimeout(function(){ $('.equal-heights-team').matchHeight({byRow: 0}); }, 500);	
		jQuery(document).ajaxComplete(function(e, xhr, settings) {
			$('.equal-heights-team').matchHeight({byRow: 0});
			setTimeout(function(){ $('.equal-heights-team').matchHeight({byRow: 0}); }, 500);
		}); 
	}


	//
    // intermediaries popup
    // - terms acceptance popup
    // - requires that the cookie detecton on the popup module is disabled   
    function checkPopOpen(){
        var popup_message_cookie = jQuery.cookie("popup_message_displayed_intermediaries");
        if (!popup_message_cookie)
        {
            $.cookie("popup_message_displayed", null, { path: '/' });
            //var timer = setInterval(function() {
                if($('#popup-message-window').length > 0 && $('#popup-message-background').length > 0 && $("#popup-message-close").length > 0 && $(".btn-accept").length > 0)
                {
                    $('#popup-message-background').unbind( "click" );
                    $("#popup-message-close").remove();
                    $(".btn-accept").click(function() {
                    	//console.log("cookie check close");
                        popup_message_disable_popup();
                        var timestamp = (+new Date());
                        $.cookie("popup_message_displayed", timestamp, {path: '/'});
                        $.cookie("popup_message_displayed_intermediaries", timestamp, {path: '/'});
                    });
                    //clearTimeout(timer);
                }
            //}, 500);                
        }else{
          $('#popup-message-background').hide();
          $('#popup-message-window').hide();
          popup_message_disable_popup();
          //console.log("cookie check autoclose");
        }
    }
    //if($("body").hasClass('intermediaries'))
    //if($('#popup-message-background').length > 0)
    var popcount = 0;
    var timer = setInterval(function() 
    {
    	//console.log("cookie check timer "+popcount);
    	popcount = popcount+1;
    	if(popcount > 10)
    	{
        	clearTimeout(timer);
    	}
    	if($('#popup-message-background').length > 0 && $('#popup-message-window').length > 0)
    	{
        	checkPopOpen();
        	clearTimeout(timer);
        }
    }, 1/2);




	/* functions run on document resize */
	$( window ).resize(function() {
		booted.init();
		if (!$("body").hasClass("branch-internal-comms")) {
			//fixHead();	
		}
		videoSingle.init();
	});
	/*
	if (!$("body").hasClass("branch-internal-comms")) {
		$(window).scroll(fixHead);
		fixHead();
	}*/
	

	//
	// jQuery SmoothScroll | Version 18-04-2013
	//
	$('a[href*=#]').click(function() {
		 // skip SmoothScroll on links inside sliders or scroll boxes also using anchors or if there is a javascript call
		 if($(this).hasClass('functional')) { 
		 	return; 
		 }
		 else
		 {
			 //console.log('scroll');

			 // duration in ms
			 var duration=1000;

			 // easing values: swing | linear
			 var easing='swing';

			 // get / set parameters
			 var newHash=this.hash;
			 var oldLocation=window.location.href.replace(window.location.hash, '');
			 var newLocation=this;

			 // make sure it's the same location      
			 if(oldLocation+newHash==newLocation)
			 {

			    // get target
			    var target=$(this.hash+', a[name='+this.hash.slice(1)+']').offset().top - 100;

			    // adjust target for anchors near the bottom of the page
			    if(target > $(document).height()-$(window).height()) target=$(document).height()-$(window).height();         

			    // animate to target and set the hash to the window.location after the animation
			    $('html, body').animate({ scrollTop: target }, duration, easing, function() {

			       // add new hash to the browser location
			       //window.location.href=newLocation;
			    });

			    // cancel default click action
			    return false;
			 }
		 }
	});

});



/* ---- responsive functions ---- */
var search_pos = 'closed';
var setup = 0; // check for code that should only run once
var header_height_orig = 0;
booted = {
	init:function() {

		var doc_width = $( document ).width();
		
		//
		/*
		FOLLOWING FUNCTIONS ARE TO MAINTAIN POSITIONING ON THE PAGE FOR ELEMENTS THAT WOUL NATURALLY FALL OUT OF PLACE DUE TO A RESPONSIVE SITE
		*/

		//
		// 2017 
		if($('.view-news-and-insights iframe').length > 0) {

			$('.view-news-and-insights iframe').each(function() {
				$el = $(this);
				// get size of image
				var w = $(this).parent().parent().width();
				var h = w*(375/675);
				if(w != undefined && h != undefined)
				{
					$(this).width(w);
					$(this).height(h);
				}
			});	
		}
		if($('.homepage_feature_img iframe').length > 0) {
			$('.homepage_feature_img iframe').each(function() {
				$el = $(this);
				// get size of image
				var w = $(this).parent().parent().width();
				var h = w*(375/675);
				if(w != undefined && h != undefined)
				{
					$(this).width(w);
					$(this).height(h);
				}
			});
		}




		if($('a.bio').length > 0) 
		{
			$('a.bio').unbind('click');
			$('a.bio').click(function(event) {
				event.preventDefault();
				var this_id = $(this).attr('data-id');
				var bh = $("#bio-"+this_id).height();

				if($("#bio-"+this_id).hasClass("open"))
				{
					$("#bio-"+this_id).css({"height":'0px'});	
					$("#bio-"+this_id).removeClass("open");
				}else{
					$("#bio-"+this_id).addClass("open");
					$("#bio-"+this_id).css({"height":'auto'});
				}
			});
		}

		// fexible node tpl header
		if($('.split-header-txt').length > 0) 
		{
			var header_height = $('.split-header-txt').height();
			var text_header = $('.split-header-txt .inner-wrapper');
			text_header.css({'padding-top':'0px', 'top':'0px'});
			var header_txt_height = text_header.height();
			var top = (header_height-header_txt_height)/2;
			text_header.css({'position':'relative', 'top':top+'px'});
		}

		// sedol table check
		if($('.view-article-sedol-table .views-row-1').length > 0) 
		{
			if ( $('.view-article-sedol-table .views-row-1').html().trim().length == 0 )
			{
				$('.view-article-sedol-table').remove();
			}
		}

		// 2017 end
		//


		// related news items even out heights
		if($('.ni-news-related').length > 0 && doc_width > 600) 
		{
			var big_h = 0;
			$('.ni-news-related .views-row').each(function() {
				$el = $(this);
				$el.removeAttr('style');
				$temp_h = $el.height();
				//console.log($temp_h);
				if($temp_h > big_h){ big_h = $temp_h; }
			});
			big_h = big_h+40;
			$('.ni-news-related .views-row').each(function() {
				$(this).attr('style','height:'+big_h+'px !important;');
			});
		}

		//
		// new homepage main header
		if($('.view-homepage-2015-header').length > 0 && doc_width < 720)
		{
			if($('.rC_sS img').length > 0 || $('.rC_sM img').length > 0  || $('.rC_sL img').length > 0 )
			{
				// position img central
				var neg_left = ($('.view-homepage-2015-header img').width() - doc_width)/2;
				$('.view-homepage-2015-header img').css({'left':'-'+neg_left+'px'});
			}

			// no display text at small size
			if($('.no-display').length > 0)
			{	
				//var new_h = $('.no-display img').height();
				//$('.view-homepage-2015-header').attr('style','height:'+new_h+'px !important;');
				$('.view-homepage-2015-header').attr('style','height:auto !important;');
			}
		}else if($('.view-homepage-2015-header').length > 0)
		{
			$('.view-homepage-2015-header').removeAttr('style');
		}


		//
		// new homepage template text title
		if($('.view-homepage-2015-header .pull-up').length > 0)
		{
			var new_top = 0 - $('.view-homepage-2015-header .pull-up').height();
			$('.view-homepage-2015-header .pull-up').css({'top':new_top+"px"});
		}


		//
		// article page, video or slideshow
		if($('.node-type-04-news-blog-article .featured-media').length > 0)
		{
			// video aspect ratio is: 71 : 45 (710 x 450)
			var nh = (450/710)*$('.featured-media').width();
			var nw = $('.featured-media').width();

			if($('.featured-media object').length > 0)
			{
				if(setup == 0)
				{
					setTimeout(function(){
						$('.featured-media object').height(nh);
						$('.featured-media object').width(nw);
					},3000);
				}else
				{
					$('.featured-media object').height(nh);
					$('.featured-media object').width(nw);
				}
				//console.log('video resize:'+nw+' : '+nh);

			}else if($('.featured-media #bcVideo').length > 0) // html5 video
			{
				$('.featured-media #bcVideo').height(nh);
				$('.featured-media #bcVideo').width(nw);
			}

		}

		//
		// in page video
		if($('.node-type-11-new-site-page-mixed-content-p').length > 0)
		{
			// video aspect ratio is: 71 : 45 (710 x 450)
			var nh = (450/710)*$('.view-id-in_page_video').width();
			var nw = $('.view-id-in_page_video').width();

			if($('.view-id-in_page_video object').length > 0)
			{
				if(setup == 0)
				{
					setTimeout(function(){
						$('.view-id-in_page_video object').height(nh);
						$('.view-id-in_page_video object').width(nw);
					},3000);
				}else
				{
					$('.view-id-in_page_video object').height(nh);
					$('.view-id-in_page_video object').width(nw);
				}
			}else if($('.featured-media #bcVideo').length > 0) // html5 video
			{
				$('.view-id-in_page_video #bcVideo').height(nh);
				$('.view-id-in_page_video #bcVideo').width(nw);
			}
		}



		//
		// homepage 2015 contact banners :: balence heights
		if($('.node-type-13-homepage-2015-').length > 0)
		{
			if($('.contact-wrapper').length > 0)
			{
				var maxH = 0;
				$(".contact-wrapper").each(function()
				{ 
					$(this).removeAttr('style'); 
					if(maxH < $(this).height()){ maxH = $(this).height(); }	// clear
				});

				if(setup == 0)
				{
					maxH = maxH + 50;
				}
				$(".contact-wrapper").each(function()
				{ $(this).height(maxH); });	
			}
		}

		//
		// homepage 2015 service info
		if($('.node-type-13-homepage-2015-').length > 0 && setup == 0)
		{
			
			// setup interactive menu links and associated functions
			if($('.homepage-feature-services').length > 0)
			{
				$('.homepage-feature-services .view-content').append( "<div class='service-details-menu'></div>" );
				var count = 0;

				$(".homepage-service-wrapper").each(function()
				{
					var title_tx = $(this).find('h2').text();
					if(title_tx != "")
					{
						count = count + 1;
						var this_id = $(this).attr('id');
						var newLink = $('<a class="'+this_id+'" href="#service-browser"><span class="link-num">'+count+'. </span><span class="link-text">'+title_tx+'</span><span class="link-arrow"><img src="/sites/all/themes/sitedesign/images/2015_home/white-arrow.png"></span></a>').click(function(e) {
						    //alert($(this).attr('class'));
						    if(!$(this).hasClass('on'))
						    {
								var my_id = $(this).attr('class');
							    // get current 'on' service and turn off
							    var current = $(".service-details-menu a.on");
								$(current).removeClass('on');
								// set the height for our fades
								$('.homepage-feature-services .view-content').height($('.homepage-feature-services .view-content').height());
								var current_id = $(current).attr('class');
								
								if($('body').hasClass('IE-8'))
								{	
									$("#"+current_id).hide();
									$("#"+current_id).css({'position': 'relative'});
								}else
								{
									$("#"+current_id).fadeTo( "slow" , 0, function() {
									    $("#"+current_id).css({'position': 'relative'});
									});	
								}
								

								var doc_width = $( document ).width();
								var left_pos = 0;
								if(doc_width > 1300)
								{ left_pos = (doc_width-1300)/2; }

								$("#"+my_id).css({'position': 'absolute', 'top': 0, 'left': left_pos, 'opacity': 0, 'display':'block'});
    							if($('body').hasClass('IE-8'))
								{	
									$("#"+current_id).hide();
								}else
								{
									$("#"+my_id).fadeTo( "slow" , 1.0, function() {});
								}

								// turn on new 
								$(this).addClass('on');
						    }
						});
						$(".service-details-menu").append(newLink); 
					}
				});	
			}

			// turn on first link
			$(".service-details-menu a").first().addClass('on');
		}
		//
		// homepage 2015 service info menu positioning for large screens
		if($('.service-details-menu').length > 0)
		{
			if(doc_width > 1350)
			{
				var pos_left = (doc_width-1350)/2 +50;
				$('.service-details-menu').css({'left':pos_left+"px"});
			}else
			{
				$('.service-details-menu').removeAttr('style');
			}
		}


		//
		// quicklinks on service overview
		if($('.node-type-08-site-page-services-overview-p .pane-service-overview-services .view-display-id-block_1').length > 0){
			var links_height = $('.node-type-08-site-page-services-overview-p .pane-service-overview-services .view-display-id-block_1').height();
			if($('.node-type-08-site-page-services-overview-p .pane-service-overview .view-display-id-block_1').length > 0){
				
				$('.node-type-08-site-page-services-overview-p .pane-service-overview .view-display-id-block_1').removeAttr('style');
				var text_height = $('.node-type-08-site-page-services-overview-p .pane-service-overview .view-display-id-block_1').height();
				//alert(links_height+" > "+text_height);
				if(links_height > text_height)
				{
					$('.node-type-08-site-page-services-overview-p .pane-service-overview .view-display-id-block_1').height(links_height+20);
				}else
				{
					//$('.node-type-08-site-page-services-overview-p .pane-service-overview .view-display-id-block_1').removeAttr('style');
				}
			}	
		}

		// quicklinks on service detail
		if($('.node-type-09-site-page-services-detail-pag .pane-service-overview-services .view-display-id-block_5').length > 0){
			var links_height = $('.node-type-09-site-page-services-detail-pag .pane-service-overview-services .view-display-id-block_5').height();
			if($('.node-type-09-site-page-services-detail-pag .pane-service-overview .view-display-id-block_1').length > 0){
				
				$('.node-type-09-site-page-services-detail-pag .pane-service-overview .view-display-id-block_1').removeAttr('style');
				var text_height = $('.node-type-09-site-page-services-detail-pag .pane-service-overview .view-display-id-block_1').height();
				if(links_height > text_height)
				{
					$('.node-type-09-site-page-services-detail-pag .pane-service-overview .view-display-id-block_1').height(links_height);
				}else
				{
					//$('.node-type-09-site-page-services-detail-pag .pane-service-overview .view-display-id-block_1').removeAttr('style');
				}
			}	
		}

		// banner blocks on service detail
		if($('.node-type-08-site-page-services-overview-p .pane-service-overview-services .view-display-id-block').length > 0 && doc_width > 560)// && doc_width < 1024 
		{
			var big_h = 0;
			$('.pane-service-overview-services .view-display-id-block .service_overview_service').each(function() {
				$el = $(this);
				$el.removeAttr('style');
				$temp_h = $el.height();
				//console.log($temp_h);
				if($temp_h > big_h){ big_h = $temp_h; }
			});
			big_h = big_h+40;
			$('.pane-service-overview-services .view-display-id-block .service_overview_service').each(function() {
				$(this).attr('style','height:'+big_h+'px !important;');
			});
		}

		// product detail pages - carousel // alter widths of carousel items
		if($('.pane-service-overview-services .jcarousel-item').length > 0){
			var jc_pl = 180;
			if(doc_width < 1024 && doc_width > 460) // set padding left on .field-content
			{
				jc_pl = Math.round((doc_width - 460)/2);
			}
			if(doc_width < 460) { jc_pl = 0; }

			$('.pane-service-overview-services .jcarousel-item').each(function() {

				$(this).find(".field-content").css({'margin-left':'0px','padding-left':jc_pl+'px'}); 
				if(doc_width < 460)
				{
					$(this).find(".field-content .counter-text").css({'width':doc_width+'px'}); 
				}
			});
		}

		// product detail contact && local office selector heights should match
		if(doc_width < 1024 && doc_width > 560)
		{
			var match_h_Array = []; // all the different divs that should match height
			var to_h = 0;
			match_h_Array[ 0 ] = ".pane-service-overview .view-display-id-block_10";
			match_h_Array[ 1 ] = ".pane-service-overview .view-display-id-block_7";
			match_h_Array[ 2 ] = ".pane-service-overview-services .view-display-id-block_6";
			
			$.each( match_h_Array, function( i, val ) {
				//console.log(val);
				if($(val).length > 0)
				{
					if($(val).height() > to_h) { to_h = $(val).height(); }
				}	  
			});
			$.each( match_h_Array, function( ii, ival ) {
				if($(ival).length > 0)
				{
					$(ival).css({'height':to_h+'px'});
				}
			});
		}

		//
		/*
		SETUP HEADER IMAGE (SPECIFICALLY HEIGHT DEPENDING ON THE WIDTH)
		*/
		//		
		if(setup == 0 && $('.pane-service-overview .view-display-id-block').length > 0 ) 
		{ header_height_orig = $('.pane-service-overview .view-display-id-block').height(); }
		
		if($('.pane-service-overview .view-display-id-block').length > 0)
		{
			if($('.pane-service-overview .view-display-id-block .views-row .header-text').length && doc_width < 1024)
			{
				var h_add = 100;
				if(doc_width > 760) { h_add = 150; }
				$('.pane-service-overview .view-display-id-block').height($('.pane-service-overview .view-display-id-block .views-row .header-text').height()+h_add);
			}else
			{
				$('.pane-service-overview .view-display-id-block').height(header_height_orig);
			}
		}



		//
		/*
		SETUP HEADER IMAGE :: MIXED CONTENT PAGES
		*/
		//		
		if(setup == 0 && $('.view-in-page-header').length > 0 ) 
		{ in_page_header_height_orig = $('.view-in-page-header').height(); }
		
		if($('.view-in-page-header').length > 0 )
		{
			$this = $('.view-in-page-header .in-page-header');
			if($this.hasClass('white') || $this.hasClass('no-image'))
			{
				// no resizing required 
			}else
			{
				if($('.view-in-page-header .in-page-text-wrapper').length && doc_width < 1024)
				{
					if(doc_width < 650){
						$('.view-in-page-header .in-page-text-wrapper').width(doc_width-80);
					}else{
						$('.view-in-page-header .in-page-text-wrapper').width(570);
					}

					var h_add = 100;
					if(doc_width > 760) { h_add = 150; }
					$('.view-in-page-header').height($('.view-in-page-header .in-page-text-wrapper').height()+h_add);
				}
				else
				{
					$('.view-in-page-header').height(in_page_header_height_orig);
					$('.view-in-page-header .in-page-text-wrapper').width(650);
				}
			}
		}
		
		//
		/*
		MATTERLEY HOMEPAGE STYLE BANNERS
		*/
		//	
		// NATURAL SIZE width: 326px; height: 207px; NOW RESPONSIVE
		if($('.pane-matterley-home-blocks .banner-block').length)
		{
			// set params
			$set_up = $('.pane-matterley-home-blocks .views-row-1 .banner-block');
			var ban_w = $set_up.width();
           	var ban_h = Math.round((ban_w/326)*207);

			$(".banner-block").each(function()
			{
           		// set height
           		$(this).height(ban_h);
           		$new_pos = 0 - ban_h;
           		$(this).mouseenter(function() {
				    $( this ).find( "img" ).animate({ top: $new_pos }, 50, 'swing' );
			    });
				
				$(this).mouseleave(function() {
					$( this ).find( "img" ).animate({ top: 0 }, 200, 'swing' );
				});
        	});				
		}
		
		//
		/*
		MATTERLEY HOMEPAGE COOKIE CONTROL
		*/
		//	
		if($('.node-type-10-site-page-matterley-style-hom').length && setup == 0)
		{
			var pathArray = window.location.pathname.split( '/' );
			var cname = pathArray[1]+'_banner';
			//alert(document.cookie.indexOf(cname));
			if (document.cookie.indexOf(cname) <= 0) {
				// Do Nothing - use main banner and setup click event
				if($('.view-matterley-home-header a').length > 0)
				{
					if($('.view-matterley-home-header a').click){
						//$.cookie(cname, '1')
						var date = new Date();
						var days = 30;
        				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        				expires = "; expires=" + date.toGMTString();
					    document.cookie = cname + "=" + 1 + expires + "; path=/";        				
					}
				}
			} else {
				// see if there is a second banner
				if(typeof sec_title !== 'undefined' && sec_title != "")
				{
					if($('#service-header h1').length > 0){$('#service-header h1').text(sec_title);}
					if($('#service-header h3').length > 0){$('#service-header h3').text(sec_subtitle);}
					if($('.view-matterley-home-header a').length > 0){$('.view-matterley-home-header a').attr("href",sec_link);}
					if($('.view-matterley-home-header img').length > 0){$('.view-matterley-home-header img').attr("src",sec_img);}
				}
			}
		}

		
		//
		/*
		RESPONSIVE TABLES
		if(doc_width < 720 && $('.responsive-table').length == 0)
		{
			$("#content table").each(function()
			{
           		$(this).wrap( "<div class='responsive-table'></div>" );
        	});				
		}else if($('.responsive-table').length)
		{
			$("#content table").each(function()
			{
           		$(this).unwrap();
        	});	
		}
		*/
		//
		if(setup != 1)
		{
			$("#content table").each(function()
			{
				var tb_w = $(this).width();
				var tb_parent_w = $(this).parent().width();
				if(tb_w > tb_parent_w)
				{
					$(this).wrap( "<div class='responsive-table overflow-true'></div>" );
				}else
				{
					$(this).wrap( "<div class='responsive-table'></div>" );
				}
	    	});
		}
		
		

		//
		/*
		SEARCH OPEN AND CLOSE
		*/
		//
		if($('.toggle-search').length > 0 && setup == 0){
			$('.toggle-search').click(function(event) {
				event.preventDefault();

				if($('#header #block-search-form').length > 0){

					if(search_pos == 'closed')
					{
						$('#header  #block-search-form .container-inline').css("visibility", "hidden");
						//$('#header .region-site-mainmenu #block-search-form').slideToggle("slow", function() {
						$('#header  #block-search-form').fadeToggle("slow", function() {
						    $('#header  #block-search-form .container-inline').css('visibility','visible').hide().fadeIn();
							$('#edit-search-block-form--2').focus();
						});
						$(this).fadeOut();
						search_pos = "open";
					}else
					{
						//$('#header .region-site-mainmenu #block-search-form').slideToggle("slow", function() {
						$('#header  #block-search-form').fadeToggle("slow", function() {
						});
						search_pos = "closed";
					}
				}
			});
			// insert close btn
			$('#header  #block-search-form .content form').append('<span class="icon-cross"></span>');
			$('#header  #block-search-form .icon-cross').click(function() {
				if(search_pos == 'open')
				{
					//$('#header .region-site-mainmenu #block-search-form').slideToggle("slow", function() {
					$('#header  #block-search-form').fadeToggle("slow", function() {
				    // Animation complete.
					});
					$('.toggle-search').fadeIn();
					search_pos = "closed";
				}
			});
		}

		//
		/*
		FLOATING FOOTER
		*/
		//
		// footer warning - hide after period on small devices
		if($('#footer-warning').length > 0 && doc_width < 700 && setup != 1)
		{
    		setTimeout(function(){ 
				$("#footer-warning").slideToggle(); 
				if($('#footer-warning').length > 0 )
				{
					$('#back-to-top').css('bottom', '0px');
				}
			}, 3000);
		}



		//
		/*
		FIXES FOR OLD CONTENT WITH INLINE WIDTH STYLES
		*/
		//
		if(setup != 1)
		{
			$('p.risk-warning-primary-colour').each(function() {
				$(this).removeAttr('style');
			});
			/*$('p table').each(function() {
				$(this).removeAttr('style');
			});*/
		}


		setup = 1;//END SETUP		



	}
}



/* ---- who's looking? ----
:: 
:: Adds browser type and version info classes to the body tag, usefull for varnish sites
::
*/
browser_check =  {
	init:function() {
		$class_add = "", $iev = '', $ie = false;		
		$.each( $.browser, function( i, val ) {
		  if(i == 'version') {
		  	$class_add = $class_add + " ver_"+val.replace(/\./g, '_');
		  	$iev = val.charAt(0);
		  	if($iev == "1"){ $iev = $iev+val.charAt(1); } // 10 and above
		  }else{
		  	if(i == 'msie'){ i = 'IE'; $ie = true; }
		  	$class_add = $class_add + " " + i;
		  }	  
		});	
		if($ie == true) { $class_add = $class_add + " IE-" +$iev; }
		$('body').addClass($class_add);	
	}
}



//
// FOLLOWER FUNCTION - HEADER
var last_scroll = 0;
function fixHead() 
{
	/*
	var $cache = $('#header');
	var $doc_width = $(document).width();
	


	if($doc_width > 1023)
	{
		// adjust kicking point depending on direction of scroll
		if(last_scroll > $(window).scrollTop()) 
		{
			var $kickin_h = $cache.height() - 55;
		}else {
			var $kickin_h = $cache.height();
		}
		if ($(window).scrollTop() >= $kickin_h) 
		{
			if(!$cache.hasClass('scrolled'))
			{
				$('#logo').hide();
				$cache.addClass('scrolled'); 
				$('#main-wrapper').addClass('main-scrolled');
				$('#logo').fadeIn('slow');
			}

			// search box positioning
			//$('.region-site-mainmenu #block-search-form').css('top','65px');
			$mh = 65;
			if($('.block-superfish').length) {$mh = $('.block-superfish').height();}
			if($('.block-menu').length) {$mh = $('.block-menu').height();}
			
			$('.region-site-mainmenu #block-search-form').css('top',$mh+'px');
			if($('#footer-warning').length > 0 )
			{
				$('#back-to-top').css('bottom', $('#footer-warning').height()+'px');
			}
			$('#back-to-top').show();
		}
		else
		{
			if($cache.hasClass('scrolled'))
			{
				$cache.removeClass('scrolled');
				$('#main-wrapper').removeClass('main-scrolled');

				$('#logo').hide();
				$('#logo').fadeIn('slow');				
			}
			
			// search box positioning
			$mh = 65;
			if($('.block-superfish').length) {$mh = $('.block-superfish').height();}
			if($('.block-menu').length) {$mh = $('.block-menu').height();}
			$('.region-site-mainmenu #block-search-form').css('top',$mh+'px');		
			$('#back-to-top').hide();	
		}		
	}
	else
	{
		if($cache.hasClass('scrolled'))
		{
			$cache.removeClass('scrolled');
			$('#main-wrapper').removeClass('main-scrolled');

			$('#logo').hide();
			$('#logo').fadeIn('slow');				
		}		

		// search box positioning
		$('.region-site-mainmenu #block-search-form').css('top','0px');	
		if($('#footer-warning').length > 0 && $doc_width > 500)
		{
			$('#back-to-top').css('bottom', $('#footer-warning').height()+'px');
		}		
		$('#back-to-top').show();	
	}
	*/
}



/* ---- IDENTIFIES PAGE SUBMISSION SOURCE FOR WDX ---- */
wdx_form = {
	init:function() {
		var page_name_id = "#f_3900d211ea71e711940902bfac148e2f";
		var page_url_id = "#f_31d3232bea71e711940902bfac148e2f";
		//console.log('CHECKING FOR WDX');

		if($('.clickdform').length > 0)
		{
			//console.log('WDX FOUND');
			var page_name = $(html).filter('title').text();
			var page_url = window.location.href;
			//console.log(page_name);
			//console.log(page_url);
			if($(page_name_id).length > 0)
			{
				$(page_name_id).val(page_name);
			}
			if($(page_url_id).length > 0)
			{
				$(page_url_id).val(page_url);
			}
		}
	}
}




/* ---- SETS UP FOR RT ---- */
telnumber = {
	init:function() {
		if(rt_var != undefined){
			//
			// wysiwyg tel numbers
			if($('h3.tel-number').length > 0){	 
				$('h3.tel-number').each(function() {
					//console.log("wrap: "+$(this).html());
					var tel = $(this).html();
					//
					// only setup 0207 numbers
					var tel_start = tel.substring(0, 4);
					var tel_start_long = tel.substring(0, 5);
					//console.log(tel_start +" / "+ tel_start_long);
					if(tel_start == "0207" || tel_start_long == "020 7")
					{
						$(this).wrapInner("<span "+rt_var+"></span>");						
					}
				});
			}
			//
			// repeatable block tel
			if($('.cta-tel').length > 0){	 
				$('.cta-tel').each(function() {
					//console.log("cta wrap: "+$(this).html());
					$(this).wrapInner("<div "+rt_var+"></div>");						
					$(this).prepend("<span>Telephone:</span><br/>");
				});
			}
		}else {
			//console.log('no RT numbber');
		}
	}
}



/* ---- works out the amount of space to the right of the image available for text ---- */
focusBanner = {
	init:function() {
		if($('.focusbanner-module').length > 0){	
			$('.focusbanner-module').each(function() {
				var bannersWidth = $(this).width();
				var imageWidth = $(this).children('.cover_img').width();
				var textareWidth = (bannersWidth - imageWidth) - 20;

				$(this).children('.cover_text').width(textareWidth);
			});
		}
	}
}







/* ---- fadeIn fadedOut for tooltip hover on brochures page ---- */
tooltip = {
	init:function() {
		$('.brochure_image').hover(function() {
			$('.tooltip').hide();
			$(this).children('.tooltip').fadeIn(200);
		}, function () {
			$(this).children('.tooltip').stop(true, true).fadeOut(200);
		});
	}
}


/* ----Image overlay / resize content to the size of the image ---- */

imageOverlay = {
	init: function() {
		var $content = $('.text-overlay');
		var $container = $('.imageoverlay-module');
		var $img  = $('.imageoverlay-module img');

		$container.each(function() {
			var imgWidth = $(this).children('img').attr('width');
			var imgWidthSum = (imgWidth) - 34;
			
			$(this).children('.text-overlay').width(imgWidthSum);
		});	
	}
}


/* ---- Script for the video module carousel ---- */

videoModule = {
	init: function() {
		// variables
		var $videoModule = $('.video-module');
		var videoModuleWidth = $videoModule.width();
		$videoModule.show();
		
		// attach the carousels
	if($videoModule.length > 0){
		$('.video-module.horizontal .items').each(function() {
			var that = $(this);
			var numberOfItems = $(this).attr('data-items');
			var numberOfItemsPhased = parseInt(numberOfItems);
			var wrapper =  $(this).parent();
			var nextBtn =  $(this).parent().find('.next');
			var prevBtn =  $(this).parent().find('.prev');
			var carsouselHeight;
			

			$(this).carouFredSel({
				auto:false
				, circular: true
				, infinite: true
				, prev : { button : prevBtn}
				, next : { button : nextBtn}
				, scroll: {items:1}
				, items: { visible:numberOfItemsPhased, height:"auto" }
				, responsive:true
				, height: "auto"
				, width: "auto"
				, pagination: { container: $('<div />') }
				, onCreate: resizeNav
			});
			
			// this function is called on load for horizontal items it resizes the nav and the external wrapper
			function resizeNav(sizes, items) {
				prevBtn.height(sizes.height());
				nextBtn.height(sizes.height());
				wrapper.height(sizes.height());
			}
		});


		$('.video-module.vertical .items').each(function() {
			var numberOfItems = $(this).attr('data-items');
			var numberOfItemsPhased = parseInt(numberOfItems);
			var nextBtn =  $(this).parent().find('.next');
			var prevBtn =  $(this).parent().find('.prev');
			
			$(this).carouFredSel({
				direction: "up"
				, circular: true
				, infinite: true
				, auto:false
				, scroll: {items:1}
				, prev : { button : prevBtn, key : "left" }
				, next : { button : nextBtn, key : "right" }
				, pagination: { container: $('<div />') }
				, items: numberOfItemsPhased
				, width: "auto"
		});
	});
}
		
		
/*  Script within videoModule below this point taken from old charles stanley site  */
var GA_js = {
  load: function() {
   /* SCOTT :: I've rewritten some script here which was using prototype, installing prototype causes issue in 
	Drupal seems lighter to just rewrite this in js/jQuery. The script just attached the flash JS files, 
	if we are on a page that  includes the video slider. */
	 
	 // rewritten script attachment
	 if($('.video-module').length > 0){
	  var root = location.protocol + '//' + location.host;
	  var scriptsUrl = root + '/sites/all/themes/sitedesign/js/libs/'; 
	 
	  var videoScripts = 
	  '<script type="text/javascript" src="'+ scriptsUrl + 'AC_OETags.js"></script>' 
	 + '<script type="text/javascript" src="'+ scriptsUrl + 'AC_RunActiveContent.js"></script>'
	 +  '<script type="text/javascript" src="'+ scriptsUrl + 'AC_ActiveX.js"></script>'
	 + '<script type="text/javascript" src="'+ scriptsUrl + 'flash_detection_sett.js"></script>'
	 + '<script type="text/javascript" src="'+ scriptsUrl + 'swfobject.js"></script>'
	 + '<script type="text/javascript" src="'+ scriptsUrl + 'JavaScriptFlashGatew.js"></script>'
	 + '<script type="text/javascript" src="'+ scriptsUrl + 'flash_title.js"></script>'; 
	  
	  // append newly created html
	   $(videoScripts).appendTo('head');
	 }

   }
}
		
GA_js.load();
	function fn_toggle_vid(id, list, tab)
	{
	  tot = $(list).childNodes.length;
	  test_pos = 0;
	  for (var lis=0; lis<tot; lis++)
	  {
		l = $(list).childNodes[lis];
		if (l.nodeType==1) // pick up li's
		{
		  li_class = $(list).childNodes[lis].className;
		  li_id = $(list).childNodes[lis].id;
		  //alert(pos +" "+test_pos);
		  if(tab == li_id)
		  {
			$(list).childNodes[lis].className = 'on'
			test_pos = test_pos+1;
		  }
		  else
		  {
			if(li_class != 'tab_start' && li_class != 'tab_end')
			{
			  $(list).childNodes[lis].className = 'off'
			  test_pos = test_pos+1;
			}
		  }
		}
	  }
	
	  // change content
	  var data_ar = eval('vid_content_'+id);
	  $('video_title').innerHTML = data_ar[0];
	  $('video_comment').innerHTML = data_ar[1] + '</br>';
	  $('video_author').innerHTML = "<em>"+data_ar[2]+"</em>";
	  $('vid_frame').src = data_ar[4];	
	}
		
		
	// Video light box
		
		
	}
}


/* ---- setup video divbox ---- */
videoBox  = {
	init:function() {
		
		if ( $.isFunction($.fn.divbox) ) {

			$('a.lightbox').divbox({caption: false});
			$('a.lightbox2').divbox({caption: false,skin: 'divbox_facebook', width: 200, height: 200});
			$('a.iframe').divbox({ width: 200, height: 200 , caption: false});
			$('a.ajax').divbox({ type: 'ajax', width: 200, height: 200 , caption: false,api:{
				afterLoad: function(o){
				  $(o).find('a.close').click(function(){
					o.closed();
					return false;
				});
				
				$(o).find('a.resize').click(function(){
					o.resize(200,50);
					return false;
				});
			}
			}});
		}		


	}
}


/* ---- Script for the video module single ---- */

videoSingle  = {
	init:function() {
			if( $('.videos_content').length > 0 ){

			// resize all the videos to their containers 
				$('.videos_content').each(function(index, value) {
					//videoSingle.resize(index, value)
					videoSingle.resize_brightcove(index, value)
				});	
		}
	},
	
	resize: function(index, value) {
		// variables
		var $container
		, $iframe = $(value).children('iframe')
		, iframeWidth = $(value).width()
		, iframeHeight = videoSingle.widthCal(iframeWidth)
		, iframeSrc = $iframe.attr('src')
		; 
		
		// add with and height to the iFrame
		$iframe.width(iframeWidth);
		$iframe.height(iframeHeight);
		
		//construct the next src attr
		iframeSrc += '&objectWidth='+iframeWidth;
		iframeSrc += '&objectHeight='+iframeHeight;
		
		// apply the resize
		$iframe.attr('src', iframeSrc)
		
		
	},

	resize_brightcove: function(index, value) {
		// variables
		var iframeWidth = $(value).width()
		, iframeHeight = videoSingle.widthCal(iframeWidth)
		; 
		
		// Resize bright cove videos
		$(value).children('object').css({
			'height':iframeHeight,
			'width':iframeWidth
		});

		// Resize bright cove videos html 5
		$(value).children('iframe').css({
			'height':iframeHeight,
			'width':iframeWidth
		});
	},
	
	widthCal: function(width) {
		//return (width/4)*3 + 40;
		return (width/4)*2.25;
	}
}

function printObject(o) {
  var out = '';
  for (var p in o) {
    out += p + ': ' + o[p] + '\n';
  }
  alert(out);
}

/* ---- add a message to the admin panel which shows when there are unsaved changes ---- */
changeWarning = {
	init:function() {
		Drupal.behaviors.changeWarning = {
			attach: function(context, settings) {  
				var $saveMessage = $('#save-message');
			
				if($('.logged-in .text .ajax-changed').text() === '*' && $saveMessage.length < 1){
					$('body').append('<div id="save-message" style="display:none;"><p>Your changes are currently not saved, leaving this page will cause them to be lost. Click save at the bottom of the page before leaving.</p><span class="close">close</span></div>');
					 $('#save-message').fadeIn(400);
					$('#save-message').delegate(" .close","click", function() {
						$('#save-message').fadeOut(400);
					});
				}			
			}
	 	}	
	}
}

/* ---- styling tweaks and fixes that can only be created within javascript ---- */
initStyling =  {
	init:function() {		
		
	},
	gradientColHeight:function() {
		if($('.gradient-background-right').length > 0){
			mainWrapperHeight = $('#main-wrapper').height();
			$('.gradient-background-right').height(mainWrapperHeight);
		}
	},
	gradientColHeightGalleria: function() {
		var calls = 0;
		if($('.views-slideshow-galleria').length > 0){
			Galleria.on('loadfinish', function(e) {
			
				if(calls < 1 ){
				    initStyling.gradientColHeight();
				    calls++;
			    }
			});
		}
	}
}


themeGenerator = {
	styles:'',
	init:function() {
		//only show the themer if we are logged in
		if($('body.logged-in').length > 0){
			// create the interface and add it to the page
			this.createInterface();
			
			// attach the color picker
			this.createColorPicker();
			
			// add the button to hide and show
			this.hideShowPicker();
			
			// attached listener
			//$('.submit-css').click(themeGenerator.generateCSS);
			$('.colorpicker-interface input').bind('keypress', themeGenerator.onKeyPress);
			$('.colorpicker-interface input').bind('blur', themeGenerator.generateCSS);
			$('.colorpicker-interface input').bind('focus', themeGenerator.onFocus);
			$('.farbtastic').bind('mouseleave', themeGenerator.generateCSS);
			
			
			// create tabs
			$('.field-wrapper').easytabs({animate: false});
		}
	}, 
	
	hideShowPicker:function() {
		$('.hideShowPicker').click(function() {
			$('.colorpicker-interface').toggle();
		});
	},
	
	onFocus: function() {
		 $(this).addClass('changed');
	},
	
	createInterface: function() {
		// the interface now sits within html.tpl.php
	},
	
	onKeyPress: function(e) {
		/* This is called everytime a key in pressed within the an input box */
		var code = (e.keyCode ? e.keyCode : e.which);
		
		// listen for the return key being press runs generate css if pressed
		if(code == 13) { //Enter keycode
		  themeGenerator.generateCSS();
		}
	},
	
	generateCSS: function(e) {
		/* 
		here we look at the value of every input if an input has a value 
		the html5 data attributes are used to construct the corresponding css 
		data type = 'data-styletype' what type of css attribute should be applied?
		data type = 'data-classes' shows the classes that it should be applied to 
		*/
		
		themeGenerator.styles +="<style>";
		// add addition default styles for everytheme
		themeGenerator.styles +=".region-site-mainmenu .content{background-image:none; background-color:#DDDBD1;}";
		
		// create new styles
		$('.colorpicker-interface input.changed').each(function() {		
			inputVal = $(this).val();
			dataVal = $(this).attr('data-classes');
			dataStyleVal = $(this).attr('data-styletype');
			
			if(!(inputVal == "" || inputVal == " ")){
				switch (dataStyleVal){
					case 'background-color':
					themeGenerator.styles += dataVal +'{background-color:'+ inputVal + '!important;}';
					break;
					
					case 'color':
					themeGenerator.styles += dataVal +'{color:'+ inputVal + '!important;}';
					break;
					
					case 'color-not-important':
					themeGenerator.styles += dataVal +'{color:'+ inputVal + ';}';
					break;
					
					case 'background-color-not-important':
					themeGenerator.styles += dataVal +'{background-color:'+ inputVal + ';}';
					break;
				}		
			}
		});
		
		// generate styles and append to the head
		themeGenerator.styles +="</style>";
		$('head').append(themeGenerator.styles);
		
		// create a version for the textarea without style tags
		textareaStyles = themeGenerator.styles;
		textareaStyles = textareaStyles.replace("<style>","");
		textareaStyles = textareaStyles.replace("</style>","");
		
		
		// add that version to the textarea within the interface
		$('.output').text('');
		$('.output').text(textareaStyles);

		
		// clear out both the styles collection
		themeGenerator.styles = '';
		textareaStyles = "";
		
		return false;
	},
	
	createColorPicker: function() {
		var f = $.farbtastic('#picker');
		var p = $('#picker').css('opacity', 0.25);
		var selected;
		$('.colorwell')
		  .each(function () { f.linkTo(this); })
		  .focus(function() {
		    if (selected) {
		      $(selected).removeClass('colorwell-selected');
		    }
		    f.linkTo(this);
		    p.css('opacity', 1);
		    $(selected = this).addClass('colorwell-selected');
		  });
	}
}

/* ---- who's looking? ----
:: 
:: Adds browser type and version info classes to the body tag, usefull for varnish sites
::
*/
browser_check =  {
	init:function() {
		$class_add = "", $iev = '', $ie = false;		
		$.each( $.browser, function( i, val ) {
		//console.log(i);
		if(i == 'version') {
		  	$class_add = $class_add + " ver_"+val.replace(/\./g, '_');
		  	$iev = val.charAt(0);
		  	if($iev == "1"){ $iev = $iev+val.charAt(1); } // 10 and above
		  }else{
		  	if(i == 'msie'){ i = 'IE'; $ie = true; }
		  	$class_add = $class_add + " " + i;
		  }	  
		});	
		if($ie == true) { $class_add = $class_add + " IE-" +$iev; }

		// check machine
		var OSName="UnknownOS";
		if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
		else if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
		else if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
		else if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
		$class_add = $class_add + " " +OSName;

		$('body').addClass($class_add);	
	}
}




})(jQuery);

(function($){
	function bannerStylerMobile() {
		var main = $('.landing-banner');
		var isDefault = $('.landing-banner').hasClass('default');
		var viewport = $(window).width() + 15;

		// is Compact ?
		var isCompact = main.hasClass('compact');
		if (isCompact == true) {
			$('.landing-content-body').addClass('compact-banner');
		}
		if (viewport > 767) {
			main.removeAttr('style');
			if (isDefault == true || isCompact == true) {
				var title_height = main.find('h2').height();
				var max_height = main.find('.shape-one').height();
				var center_top = (max_height - title_height) / 2; 
				main.find('h2').css('top',center_top);
			}
			//console.log('greater than 767');
		}
		if (viewport <= 767) {
			if (isDefault == true || isCompact == true) {
				var banner_height = main.find('img.banner-image').height() + main.find('h2').outerHeight();
				main.css('max-height',banner_height);
			}
			var temp1 = main.find('h2').outerHeight();
			main.find('.shape-one').css('min-height', temp1);
			//console.log('less or equal 767');
		} else {
			main.removeAttr('style');
			main.find('.shape-one').css('min-height','');
			//console.log('[clear] greater than 767');
		}
		
		var isHidden = main.hasClass('no-banner');
		if (isHidden == true) {
			$('.landing-content-body').addClass('hidden-banner');
		}

	}
	$(document).ready(function() {
		bannerStylerMobile();
	});
	$(window).resize(function() {
		bannerStylerMobile();
	});
})(jQuery);


