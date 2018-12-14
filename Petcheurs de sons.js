$().ready(function(){

    let setup = $("#titre").click(function(){
        $("#diaporama").css("height","86vh");
        $("header").css("height","7vh");
        $("footer").css("height","7vh");
    });

    let sudoSlider = $("#contenu").sudoSlider({
        numeric: true
    });

    $(".nextBtn, .prevBtn, #titre").click(function(){
        sudoSlider.runWhenNotAnimating(function () {
            var currentSlide = sudoSlider.getValue('currentSlide')
            $(".player").remove();
            switch (currentSlide) {
                case 1:
                    $("#slide" + currentSlide + " .lecteur").append('<div class="player"><span class="info"></span><div class="waveform"></div><div class="position"></div></div><iframe id="list1" class="sc-widget" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/649735404%3Fsecret_token%3Ds-pdsJD&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>');
                    player = SC.Widget($('iframe#list' + currentSlide)[0]);
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
                    setupPlayer();
                    break;
                default:
                    $("#slide" + currentSlide + " .lecteur").append('<div class="player"><span class="info"></span><div class="waveform"></div><div class="position"></div></div><iframe id="list4" class="sc-widget" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/649735404%3Fsecret_token%3Ds-pdsJD&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>');
                    player = SC.Widget($('iframe#list' + currentSlide)[0]);
                    setupPlayer();
            }
        });
    });
    $(".nextBtn, .prevBtn").click(function(){
        player.pause();
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
});