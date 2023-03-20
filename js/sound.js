var EATING_SOUND = 'sound/eating.mp3';
var GHOST_EATEN_SOUND = 'sound/ghost-eaten.mp3';
var EXTRA_LIFE_SOUND = 'sound/extra-life.mp3';
var EAT_PILL_SOUND = 'sound/eat-pill.mp3';
var EAT_FRUIT_SOUND = 'sound/eat-fruit.mp3';
var EAT_GHOST_SOUND = 'sound/eat-ghost.mp3';
var SIREN_SOUND = 'sound/siren.mp3';
var WAZA_SOUND = 'sound/waza.mp3';
var READY_SOUND = 'sound/ready.mp3';
var DIE_SOUND = 'sound/die.mp3';

var EATING_SOUND_LOOPING = false;
var MUTED_SOUND = false;

var eatingSound;
var ghostEatenSound;
var extraLifeSound;
var eatPillSound;
var eatFruitSound;
var eatGhostSound;
var sirenSound;
var wazaSound;
var readySound;
var dieSound;


function isAvailableSound() {
    return !HOME && !MUTED_SOUND;
}

function loadAllSound() {
    if (!HOME) {
        eatingSound = new Howl({
            src: [EATING_SOUND],
            loop: true,
            rate: 1.25
        });
        ghostEatenSound = new Howl({
            src: [GHOST_EATEN_SOUND],
            loop: true
        });
        extraLifeSound = new Howl({
            src: [EXTRA_LIFE_SOUND]
        });
        eatPillSound = new Howl({
            src: [EAT_PILL_SOUND]
        });
        eatFruitSound = new Howl({
            src: [EAT_FRUIT_SOUND]
        });
        eatGhostSound = new Howl({
            src: [EAT_GHOST_SOUND]
        });
        sirenSound = new Howl({
            src: [SIREN_SOUND],
            loop: true
        });
        wazaSound = new Howl({
            src: [WAZA_SOUND],
            loop: true
        });
        readySound = new Howl({
            src: [READY_SOUND]
        });
        dieSound = new Howl({
            src: [DIE_SOUND]
        });
    }
}

function stopEatSound() {
    if (isAvailableSound()) {
        ghostEatenSound.stop();
    }
}

function stopSirenSound() {
    if (isAvailableSound()) {
        sirenSound.stop();
    }
}

function stopEatingSound() {
    if (isAvailableSound() && EATING_SOUND_LOOPING) {
        eatingSound.stop();
        EATING_SOUND_LOOPING = false;
    }
}

function stopWazaSound() {
    if (isAvailableSound()) {
        wazaSound.stop();
    }
}

function stopAllSound() {
    if (isAvailableSound()) {
        eatingSound.stop();
        ghostEatenSound.stop();
        extraLifeSound.stop();
        eatPillSound.stop();
        eatFruitSound.stop();
        eatGhostSound.stop();
        sirenSound.stop();
        wazaSound.stop();
        readySound.stop();
        dieSound.stop();
    }
}

function playEatingSound() {
    if (isAvailableSound() && !EATING_SOUND_LOOPING) {
        EATING_SOUND_LOOPING = true;
        eatingSound.play();
    }
}

function playExtraLifeSound() {
    if (isAvailableSound()) {
        extraLifeSound.play();
    }
}

function playEatFruitSound() {
    if (isAvailableSound()) {
        eatFruitSound.play();
    }
}

function playEatPillSound() {
    if (isAvailableSound()) {
        eatPillSound.play();
    }
}

function playEatGhostSound() {
    if (isAvailableSound()) {
        eatGhostSound.play();
    }
}

function playWazaSound() {
    if (isAvailableSound()) {
        stopSirenSound();
        stopEatSound();
        wazaSound.play();
    }
}

function playGhostEatenSound() {
    if (isAvailableSound()) {
        stopSirenSound();
        stopWazaSound();
        ghostEatenSound.play();
    }
}

function playSirenSound() {
    if (isAvailableSound()) {
        stopWazaSound();
        stopEatSound();
        sirenSound.play();
    }
}

function playReadySound() {
    if (isAvailableSound()) {
        readySound.play();
    }
}

function playDieSound() {
    if (isAvailableSound()) {
        stopAllSound();
        dieSound.play();
    }
}

function muteAllSound() {
    MUTED_SOUND = true;
    if (!HOME) {
        setAllSoundMuteStatus();
    }
}

function unmuteAllSound() {
    MUTED_SOUND = false;
    if (!HOME) {
        setAllSoundMuteStatus();
    }
}

function setAllSoundMuteStatus() {
    eatingSound.mute(MUTED_SOUND);
    ghostEatenSound.mute(MUTED_SOUND);
    extraLifeSound.mute(MUTED_SOUND);
    eatPillSound.mute(MUTED_SOUND);
    eatFruitSound.mute(MUTED_SOUND);
    eatGhostSound.mute(MUTED_SOUND);
    sirenSound.mute(MUTED_SOUND);
    wazaSound.mute(MUTED_SOUND);
    readySound.mute(MUTED_SOUND);
    dieSound.mute(MUTED_SOUND);
}