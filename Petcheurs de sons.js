$().ready(function(){

    let setup = $("#titre").click(function(){
        $("#diaporama").css("height","86vh");
        $("header").css({"height":"7vh","background-image":"none","animation-fill-mode":"none","background" : "#040307"});
        $("footer").css({"height":"7vh","background-image":"none","animation-fill-mode":"none","background" : "#040307"});
        $("#logo").css("visibility","visible");
    });

    let sudoSlider = $("#contenu").sudoSlider({
        numeric: true
    });

    $(".nextBtn, .prevBtn, #titre").click(function(){
        sudoSlider.runWhenNotAnimating(function () {
            let currentSlide = sudoSlider.getValue('currentSlide')
			$(".player, iframe").remove();
            switch (currentSlide) {
                case 1:
                    $("#slide" + currentSlide + " .lecteur").append('<div class="player"><span class="info"></span><div class="waveform"></div><div class="position"></div></div><iframe id="list1" class="sc-widget" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/649735404%3Fsecret_token%3Ds-pdsJD&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>');
                    player = SC.Widget($('iframe#list' + currentSlide)[0]);
                    jQuery.each(jQuery.browser, function(i, val) {
                        if($.browser.msedge){
                            $('.waveform').css('filter', "sepia(100%) saturate(1000%) hue-rotate(290deg) contrast(5%) brightness(163%)");
                        } else if($.browser.mozilla){
                            $('.waveform').css('filter', "sepia(100%) saturate(1000%) hue-rotate(290deg) contrast(5%) brightness(163%)");
                        } else {
                            $('.waveform').css('filter', "sepia(1) hue-rotate(290deg) saturate(1000%) brightness(94%)");
                        }
                    });
                    setupPlayer();
                    break;
                case 2:
                    $("#slide" + currentSlide + " .lecteur").append('<div class="player"><span class="info"></span><div class="waveform"></div><div class="position"></div></div><iframe id="list2" class="sc-widget" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/224846558&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>');
                    player = SC.Widget($('iframe#list' + currentSlide)[0]);
                    setupPlayer();
                    break;
                case 3:
                    $("#slide" + currentSlide + " .lecteur").append('<div class="player"><span class="info"></span><div class="waveform"></div><div class="position"></div></div><iframe id="list3" class="sc-widget" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/649735404%3Fsecret_token%3Ds-pdsJD&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>');
                    player = SC.Widget($('iframe#list' + currentSlide)[0]);
                    jQuery.each(jQuery.browser, function(i, val) {
                        if($.browser.msedge){
                            $('.waveform').css('filter', "sepia(100%) saturate(1000%) hue-rotate(290deg) contrast(5%) brightness(163%)");
                        } else if($.browser.mozilla){
                            $('.waveform').css('filter', "sepia(100%) saturate(1000%) hue-rotate(10deg) contrast(10%) brightness(130%)");
                        } else {
                            $('.waveform').css('filter', "sepia(1) hue-rotate(10deg) saturate(150%) brightness(71%)");
                        }
                    });
                    setupPlayer();
                    break;
                default:
                    $("#slide" + currentSlide + " .lecteur").append('<div class="player"><span class="info"></span><div class="waveform"></div><div class="position"></div></div><iframe id="list4" class="sc-widget" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/649735404%3Fsecret_token%3Ds-pdsJD&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>');
                    player = SC.Widget($('iframe#list' + currentSlide)[0]);
                    setupPlayer();
            }
            player.pause();
        });
    });

    function setupPlayer(){
        var pOffset = $('.player').offset();
        var pWidth = $('.player').width();
        var scrub;

        player.bind(SC.Widget.Events.READY, function() {
            setInfo();
        }); //Set info on load

        player.bind(SC.Widget.Events.PLAY_PROGRESS, function(e) {
            if( e.relativePosition < 0.003 ) { setInfo(); }
            //Event listener when track is playing
            $('.position').css('width', ( e.relativePosition*100)+"%");
        });

        $('.player').mousemove(function(e){ //Get position of mouse for scrubbing
            scrub = (e.pageX-pOffset.left);
        });

        $(".playbutton").click(function(){
            player.isPaused(function(pause){
                if (pause) {
                    player.play();
                } else {
                    player.pause();
                }
            });
        });
        $(".nextbutton").click(function(){
            player.next();
            player.isPaused(function(pause) {
                if (pause) {
                    player.pause();
                } else {
                    player.play();
                }
            });
            setInfo();
            player.seekTo(0);
        });
        $(".prevbutton").click(function(){
            player.prev();
            player.isPaused(function(pause) {
                if (pause) {
                    player.pause();
                } else {
                    player.play();
                }
            });
            setInfo();
            player.seekTo(0);
        });

        $('.player').click(function(){ //Use the position to seek when clicked
            $('.position').css('width',scrub+"px");
            var seek = player.duration*(scrub/pWidth);

            //Seeking to the start would be a previous?
            if ( seek < player.duration * .05 ) {
                player.prev();
            } else if ( seek > player.duration * .99 ) {
                player.next();
            } else {
                player.seekTo(seek);
            }

        });
    }

    function setInfo() {
        player.getCurrentSound(function(song) {

            // Soundcloud just borked this api endpoint, hence this hack :/
            var waveformPng =
                song.waveform_url
                    .replace('json', 'png')
                    .replace('wis', 'w1');

            var artworkUrl = song.artwork_url || '';

            $('.waveform').css('background-image', "url('" + waveformPng + "')");
            $('.player').css('background-image', "url('" + artworkUrl.replace('-large', '-t500x500') + "')");

            var info = song.title;
            $('.info').html(info);

            player.current = song;
        });

        player.getDuration(function(value){
            player.duration = value;
        });

        player.isPaused(function(bool){
            player.getPaused = bool;
        });
    }
    /* ---- particles.js config ---- */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 180,
      "density": {
        "enable": true,
        "value_area": 650
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 3
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 50,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": true,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});


/* ---- stats.js config ---- */

var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function() {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
});