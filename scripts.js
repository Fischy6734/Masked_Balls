window.addEventListener("DOMContentLoaded", function () {
    // lazyLoad();
   // slider_js();
    //slider_menu_js();
    //tooltipHover();
   // load_wishlist_cookies();
    $('input#search').on('keyup', function () {
        let empty = false;
        $('input#search').each(function () {
            empty = $(this).val().length == 0;
        });

        if (empty) {
            $('#btn-search').attr('disabled', 'disabled');
        } else {
            $('#btn-search').attr('disabled', false);
            $("#search").on('keyup', function (e) {
                if (e.keyCode === 13) {
                    window.location.replace("/search?q=" + $("#search").val());
                }
                $("#btn-search").on('click', function () {
                    console.log('aaa')
                    window.location.replace("/search?q=" + $("#search").val());
                });
            });
        }

    });
    var btn = $('#back-to-top');
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });
    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, '300');
    });


    $('#btn_prev').on('click', function () {
        $('.profile-gamelist ul').animate({
            scrollLeft: '-=150'
        }, 300, 'swing');
    });
    $('#btn_next').on('click', function () {
        $('.profile-gamelist ul').animate({
            scrollLeft: '+=150'
        }, 300, 'swing');
    });

    $(".scrollTo").on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('data-target');
        let id_target = $('#' + target);
        $('html, body').animate({
            scrollTop: (id_target.offset().top)
        }, 500, 'swing');
    });

    let last_offset = $("#new-games-section").children().length;
    let load_amount = 12;
    $('#load-more1').click((e) => {
        e.preventDefault();
        $(this).addClass('disabled');
        fetch_games(load_amount, 'new');
    });
    $('#mobile-play-btn').on('click', function(e) {
        open_fullscreen();
    });
    $('#btn_prev').on('click', function() {
        $('.profile-gamelist ul').animate({
            scrollLeft: '-=150'
        }, 300, 'swing');
    });
    $('#btn_next').on('click', function() {
        $('.profile-gamelist ul').animate({
            scrollLeft: '+=150'
        }, 300, 'swing');
    });
    $('#f_prev').on('click', function() {
        $('.favorite-gamelist ul').animate({
            scrollLeft: '-=150'
        }, 300, 'swing');
    });
    $('#f_next').on('click', function() {
        $('.favorite-gamelist ul').animate({
            scrollLeft: '+=150'
        }, 300, 'swing');
    });
    $('#t-prev').on('click', function() {
        $('.hot-list').animate({
            scrollLeft: '-=150'
        }, 300, 'swing');
    });

    $('#t-next').on('click', function() {
        $('.hot-list').animate({
            scrollLeft: '+=150'
        }, 300, 'swing');
    });

    $('#p-prev').on('click', function() {
        $('.popular-list').animate({
            scrollLeft: '-=150'
        }, 300, 'swing');
    });

    $('#p-next').on('click', function() {
        $('.popular-list').animate({
            scrollLeft: '+=150'
        }, 300, 'swing');
    });



    menu_header();
    hide_show_content();
	game_share();
	add_module() ;
    $(document).mouseup(function (e) {
        var container = $(".commons-layout__sidebar");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('body').removeClass('overlayed');
            $('.overlay_blur').removeClass('show');
            $('.commons-layout__sidebar').removeClass('navbar-mobile--opened');
        }
    });
});
function add_module() {
    if (!id_game && !url_game) {
        return
    }
    let url = "/add-module.ajax";
    $.ajax({
        url: url,
        type: "POST",
        data: {
            id_game: id_game,
            url_game: url_game
        },
        success: function (response) {
            if (response) {
                let data = JSON.parse(response);

                $("#rate-area").html(data.rate);
                $("#comment-area").html(data.comment);
            }
        }
    })
}

function game_share() {
    close_popup();
    $("._share_btn").click(function () {
        open_popup();
    })
    $(".popup-close").click(function () {
        close_popup();
    })
    $(".popup-bg").click(function () {
        close_popup();
    })
}

function open_popup() {
    $(".popup-bg").show();
    $(".popup-share").show();
    $('.share_social_list').find('.st-btn').addBack().show();
    $("html").css("overflow", "hidden")
}

function close_popup() {
    $(".popup-bg").hide();
    $(".popup-share").hide();
    $("html").css("overflow", "");
}

function is_mobile_device() {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    } else {
        return false;
    }
}
function tooltipHover() {
    $(".describe").hover(function (event) {
            let height_tooltip;
            var titleText = $(this).attr("title");
            $(this).data("tipText", titleText).removeAttr("title");

            $('<div id="tooltip" class="tooltips"></div>').text(titleText)
                .appendTo(this)
            //.fadeIn("slow");
        },
        function () {
            $(this).attr("title", $(this).data("tipText"));
            // $(".tooltips").remove();
        }
    )
        .mousemove(function (event) {
            $(".tooltips")
                .css("top", "-45px")
                .css("left", "50%");
        });
}

function hide_show_content() {
    let height_content = $('.content-inner .game-description').outerHeight();

    if (height_content <= 748) {
        $('.show_content').css({'display': 'none'})
        $('.game-content-page').css({'padding-bottom': '20px'})
        $('.content-inner').attr('style', 'height:' + height_content + 'px');
    } else {
        $('.content-inner').attr('style', 'height:750px;overflow:hidden');
        $('.show_content').css({'display': 'flex'});
        $('.game-content-page').css({'padding-bottom': '60px'})
        $('.game-description').css({'padding-bottom': '20px'})
    }

    $('.ShowMore_button').click(function () {
        if ($('.ShowMore_button').hasClass('more')) {
            $('.ShowMore_button').removeClass('more')
            $('.content-inner').animate({
                'height': height_content + 'px',
                'overflow': 'hidden',
                'animation': 'height 1000ms ease 0ms'
            }, {
                easing: 'swing',
                complete: function () {
                    $('.content-inner').attr('style', 'height:auto');
                    $('.ShowMore_button').html('Show less <span class="svg-icon" aria-hidden="true">\n' +
                        '                                        <svg class="svg-icon__link"><use xlink:href="#icon-keyboard_arrow_up"></use></svg>\n' +
                        '                                    </span>');
                    $('.ShowMore_button').addClass('less')

                }
            })
        } else {
            $('.ShowMore_button').removeClass('less')
            $('.content-inner').animate({
                'height': '750px',
                'overflow': 'hidden',
                'animation': 'height 1000ms ease 0ms'
            }, {
                easing: 'swing',
                complete: function () {
                    $('.content-inner').attr('style', 'height:750px;overflow:hidden');
                    $('.ShowMore_button').html('Show more <span class="svg-icon" aria-hidden="true">\n' +
                        '                                        <svg class="svg-icon__link"><use xlink:href="#icon-keyboard_arrow_down"></use></svg>\n' +
                        '                                    </span>');
                    $('.ShowMore_button').addClass('more')
                }
            })

        }

    })


}

function menu_header() {
    $('.js-navbar-toggle').click(function () {
        $(this).toggleClass('active')
        if ($('.js-navbar-toggle').hasClass('active')) {
            $('.js-navbar').addClass('active');
            $('bodd').addClass('menu-opened');
        } else {
            $('.js-navbar').removeClass('active');
            $('bodd').removeClass('menu-opened');

        }
    })

}

/*function lazyLoad() {
    $('.lazy').Lazy({
        effect: "fadeIn",
        effectTime: 300,
    });
}*/

function expandScreen() {
    $('#game-area').addClass('iframe-full');
    $('html').css('overflow', 'hidden');
    $('#close_fullscreen').show();
}
function closeFullScreen(e){
    $('#game-area').removeClass('iframe-full');
    $('html').css('overflow', '');
    $(e).hide();
}

function open_fullscreen() {
    let game = document.getElementById("game-area") || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {

        if (game.requestFullscreen) {
            game.requestFullscreen();
        } else if (game.msRequestFullscreen) {
            game.msRequestFullscreen();
        } else if (game.mozRequestFullScreen) {
            game.mozRequestFullScreen();
        } else if (game.webkitRequestFullscreen) {
            game.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function load_game(event, element) {
//     event.preventDefault();
//     let game_url = $(element).attr('href');
//     loadUrl(game_url);
//
}

function loadUrl(game_url) {
    $(".page_loading").removeClass('hidden');
    window.location.replace(game_url);
}


function slider_js() {
    var owl = $('.top__items.owl-carousel').owlCarousel({
        loop: true,
        center: false,
        dots: false,
        stagePadding: 50,
        margin: 10,
        nav: false,

        autoplay: false,
        autoplayTimeout: 3000,
        onDrag: onDragGame,
        onDragged: onDraggedGame,
        onTranslate: callback,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 7
            }
        }
    });
    $('.js-top-next').click(() => owl.trigger('next.owl.carousel'));
    $('.js-top-prev').click(() => owl.trigger('prev.owl.carousel'));


}

function onDragGame(event) {
    event.preventDefault();
    $(event.currentTarget).css('pointer-events', 'none');
}

function onDraggedGame(event) {
    event.preventDefault();
    $(event.currentTarget).css('pointer-events', 'auto');
}

function slider_menu_js() {
    let lenght_item = $('.navbar__items').children().length;
    var $window = $(window);
    var windowsize = $window.width();
    if (lenght_item > 10 && windowsize> 1024) {
        var owl = $('.navbar__items.owl-carousel').owlCarousel({
            loop: false,
            center: false,
            dots: false,
            margin: 0,
            nav: false,
            autoWidth: true,
            autoplay: false,
            autoplayTimeout: 3000,
            onDrag: onDragSlide,
            onDragged: onDraggedSlide,
            onTranslate: callback,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 7
                }
            }
        });
    }

}

function onDragSlide(event) {
    event.preventDefault();
    $(event.currentTarget).css('pointer-events', 'none');
}

function onDraggedSlide(event) {
    event.preventDefault();
    $(event.currentTarget).css('pointer-events', 'auto');
}

function callback(event) {
    // lazyLoad();
}

function copyToClipboard(element, e) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $(e).html('COPIED!!');
    setTimeout(function () {
        $(e).html('Copy');
    }, 3000);
    $temp.remove();
}


function favorite(e) {
    var image = $(e).data('image');
    var id = $(e).data('id');
    var slug = $(e).data("slug");
    var name = $(e).data("name");
    var favorited;
    if ($(e).hasClass('favorited')) {
        console.log("Co roi ! Xoa di  ");
        remove_wishlist_cookies(id);
        favorited = true;
        $(e).removeClass('favorited');
    } else {
        console.log("luu lai");
        save_wishlish_cookies(id, slug, image, name);
        $(e).addClass('favorited');
        favorited = false;
    }
    let html = '';
    html += '<div class="wrapper notification-success"> <div class="toastt"> <div class="content"> <div class="icon"><img width="50" height="50" src="' + image + '" class="img-fluid" /></div> <div class="details"> <span>' + (favorited == true ? "Remove" : "Add") + ' Success</span> <p>' + name + '</p> </div> </div> </div> </div>'
    $('body').one("click", e, function () {
        notification(html, 1000)
    })
}

function notification(s, time) {
    $(s).appendTo('body').fadeTo(time, 1, function () {

        $(this).fadeTo(1000, 0, function () {
            $(this).addClass('hide');
            $(this).remove()

        });
    });
}

function remove_wishlist_cookies(_id) {
    if (!!jQuery.cookie('favorite_game') && _id !== '') {
        var favorite_array = JSON.parse(jQuery.cookie("favorite_game"));
        jQuery.each(favorite_array, function (key, value) {
            favorite_array = favorite_array.filter(function (element) {
                return element !== undefined;
            });
            if (value.id === _id && key > -1) {

                favorite_array.splice(key, 1);
            }
        });
        console.log("xoa game favorite");
        jQuery.cookie('favorite_game', JSON.stringify(favorite_array), {expires: 30, path: '/'});
        $(".favorites-add-" + _id).removeClass('favorited');
        $(".favorites-add-" + _id).html('<span class="svg-icon" aria-hidden="true"> <svg class="svg-icon__link"><use xlink:href="#icon-heart"></use></svg> </span> <span class="ms-2">Add to Favorites</span>')
        load_wishlist_cookies();
    }
}

function save_wishlish_cookies(_id, _slug, _image, _name) {
    var favorites_count = 9;
    if (!!jQuery.cookie('favorite_game') && _slug !== '' && _image !== '' && _id !== '' && _name != '') {
        var favorite_array = JSON.parse(jQuery.cookie("favorite_game"));
        let circle_html = '';
        jQuery.each(favorite_array, function (key, value) {
            if (value !== undefined && value.slug === _slug && key > -1) {
                favorite_array.splice(key, 1);
            }
        });
        favorite_array.push(
            {
                "id": _id,
                "slug": _slug,
                "image": _image,
                "name": _name
            }
        );
        if (favorite_array.length > favorites_count) {
            favorite_array.shift();
        }
        jQuery.cookie('favorite_game', JSON.stringify(favorite_array), {expires: 30, path: '/'});
    } else {
        var data = [];
        data.push(
            {
                "id": _id,
                "slug": _slug,
                "image": _image,
                "name": _name
            }
        );
        jQuery.cookie('favorite_game', JSON.stringify(data), {expires: 30, path: '/'});
    }
    load_wishlist_cookies();
}

function load_wishlist_cookies() {
    if (!!jQuery.cookie('favorite_game')) {
        var favorites = JSON.parse(jQuery.cookie("favorite_game"));
        let circle_html = '';
        if (favorites.length > 0) {
//Load checked compare
            var str_wishlist = '';
            var $leng = favorites.length;
            var slug_array = [];
            for (var i = $leng - 1; i >= 0; i--) {
                var value = favorites[i];
                slug_array.push(value.slug + "_" + value.kind);

                str_wishlist += '<div class="col-md-2 col-sm-3 col-4 grid-1"><a href="/' + value.slug + '"><div class="game-item"><div class="list-game"><div class="list-thumbnail img-rounded "><img src="' + value.image + '" data-src="' + value.image + '" class="small-thumb img-rounded ls-is-cached" alt="' + value.name + '"></div><div class="list-info"><div class="list-title">' + value.name + '</div></div></div></div></a></div>'

                if (value.slug === current_slug && !$(".favorites-add-" + value.id).hasClass('favorited')) {
                    $(".favorites-add-" + value.id).addClass("favorited")
                }

            }
            if ($(".favorites_btn").hasClass('favorited')) {
                str = '<span class="svg-icon" aria-hidden="true"> <svg class="svg-icon__link"><use xlink:href="#icon-heart"></use></svg> </span> <span class="ms-2">Remove to Favorites</span>';
            } else {
                str = '<span class="svg-icon" aria-hidden="true"> <svg class="svg-icon__link"><use xlink:href="#icon-heart"></use></svg> </span> <span class="ms-2">Add to Favorites</span>';
            }
            $(".favorites_btn").html(str);
            if (str_wishlist != "") {
                jQuery("#favoriteGames").html(str_wishlist);

            }
            $(".empty_favorite").hide();
        } else {
            //circle_html += '<div id="navbarBadge" style="display:none" class="navbar-badge"></div>';
            $(".empty_favorite").show();
            $(".empty_favorite").html('<center>No favorite game</center>')
            jQuery("#favoriteGames").html('');
        }
        /*var $listItems = $('#number-favorite > div');

        $listItems.each(function (id) {
            $listItems.eq(id).remove();

        });
        $('#number-favorite').append(circle_html);*/

    } else {
        $(".empty_favorite").show();
        $(".empty_favorite").html('<center>No favorite game</center>')
        jQuery("#favoriteGames").html('');
    }
    // lazyLoad();
}