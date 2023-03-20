function simulateKeyup(code) {
    var e = jQuery.Event('keyup');
    e.keyCode = code;
    jQuery('body').trigger(e);
}
function simulateKeydown(code) {
    var e = jQuery.Event('keydown');
    e.keyCode = code;
    jQuery('body').trigger(e);
}

var isVisible = true;
$(document).ready(function() {
    $(document).on('visibilitychange', function(e) {
        if (document.visibilityState === 'visible' && !isVisible) {
            isVisible = true;
            if(!HOME) {
                setTimeout('resumeGame()', 1500);
            }
        } else if (document.visibilityState === 'hidden' && isVisible) {
            isVisible = false;
            if(!HOME) {
                pauseGame();
            }
        }
    })
    HELP_TIMER = setInterval('blinkHelp()', HELP_DELAY);
    initHome();
    $('#play').on('click touchstart', function(e) {
        e.preventDefault();
        initGame(true);
    });
    $('.sound').on('click touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var sound = $(this).attr('data-sound');
        if ( sound === 'on' ) {
            $('.sound').attr('data-sound', 'off');
            $('.sound').find('img').attr('src', 'img/sound-off.png');
            muteAllSound();
        } else {
            $('.sound').attr('data-sound', 'on');
            $('.sound').find('img').attr('src', 'img/sound-on.png');
            unmuteAllSound();
        }
    });
    $('.help-button, #help').on('click touchstart', function(e) {
        e.preventDefault();
        if (!PACMAN_DEAD && !LOCK && !GAMEOVER) {
            if ( $('#background-help').css('display') === 'none') {
                $('#background-help').fadeIn('slow');
                $('#help').fadeIn('slow');
                if ( $('#panel').css('display') !== 'none') {
                    pauseGame();
                }
            } else {
                $('#background-help').fadeOut('slow');
                $('#help').fadeOut('slow');
            }
        }
    });
    $('#control-up').on('mousedown touchstart', function(e) {
        e.preventDefault();
        simulateKeydown(38);
        simulateKeyup(13);
    });
    $('#control-down').on('mousedown touchstart', function(e) {
        e.preventDefault();
        simulateKeydown(40);
        simulateKeyup(13);
    });
    $('#control-left').on('mousedown touchstart', function(e) {
        e.preventDefault();
        simulateKeydown(37);
        simulateKeyup(13);
    });
    $('#control-right').on('mousedown touchstart', function(e) {
        e.preventDefault();
        simulateKeydown(39);
        simulateKeyup(13);
    });
    $('#control-pause').on('click touchstart', function(e) {
        e.preventDefault();
        if (PAUSE) {
            resumeGame();
        } else {
            pauseGame();
        }
    });
    $('body').keyup(function(e) {
        KEYDOWN = false;
    });
    $('body').keydown(function(e) {
        if (!HOME) {
            KEYDOWN = true;
            if (PACMAN_DEAD && !LOCK) {
                erasePacman();
                resetPacman();
                drawPacman();
                
                eraseGhosts();
                resetGhosts();
                drawGhosts();
                moveGhosts();
                
                blinkSuperBubbles();
                
            } else if (e.keyCode >= 37 && e.keyCode <= 40 && !PAUSE && !PACMAN_DEAD && !LOCK) {
                if ( e.keyCode === 39 ) {
                    movePacman(1);
                } else if ( e.keyCode === 40 ) {
                    movePacman(2);
                } else if ( e.keyCode === 37 ) {
                    movePacman(3);
                } else if ( e.keyCode === 38 ) {
                    movePacman(4);
                }
            } else if (e.keyCode === 80 && !PACMAN_DEAD && !LOCK) {
                if (PAUSE) {
                    resumeGame();
                } else {
                    pauseGame();
                }
            } else if (GAMEOVER) {
                initHome();
            }
        }
    });
    $(window).on('resize', function(){
        setOtherElementsPosition();
    });
});