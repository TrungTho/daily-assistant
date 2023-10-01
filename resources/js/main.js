const DEFAULT_COUNTDOWN_DURATION = 30; //30 seconds
const getFinishedTime = (preTime = new Date())  => new Date(preTime.getTime() + 1000 * DEFAULT_COUNTDOWN_DURATION)
let finishTime = getFinishedTime();

const initAudio = src => {
    const audio = new Audio(src)
    audio.muted = true;
    audio.autoplay = false;
    return audio;
}
const notificationSound = initAudio('./sounds/notification-sound.wav');
const waterVoice = initAudio('sounds/water-voice.mp3')
const timerDisplayElm = document.getElementById('timer-display')

const startCountdown = () => {
    setInterval(() => {
        displayCountdownTimer();
    }, 500); // 0.5 second interval
}

const timeFormatter = (timeInSeconds) => {
    const date = new Date(timeInSeconds * 1000);
    if (timeInSeconds < 3600) {
        return date.toISOString().substring(14, 19);
    }

    return date.toISOString().substring(11, 19);
}

const displayCountdownTimer = () => {
    const currTime = new Date();
    if (currTime >= finishTime) {
        showWaterNotification(currTime)
        finishTime = getFinishedTime(finishTime);
    }

    const duration = (finishTime - currTime) / 1000;
    const formattedTime = timeFormatter(duration);
    timerDisplayElm.innerText = `${formattedTime}`;
}

const showWaterNotification = (currTime) => {
    Neutralino.debug.log(`${currTime.toISOString()}: Notification shown`);        
    playAudio(notificationSound).then(() => playAudio(waterVoice)).then(() => Neutralino.debug.log(`${currTime.toISOString()}: Audio Finished`))
    Neutralino.os.showNotification('Water', 'Drink some water please!!!');
}

const waitAudioToLoad = (audio) => new Promise((resolve) => {
    audio.addEventListener("canplaythrough", resolve, {
        once: true
    })
})

const playAudio = async (audio) => {
    audio.muted = false;
    await new Promise((resolve) => {
        audio.addEventListener("ended", resolve, {
            once: true
        })
        audio.play()
    })
    audio.pause()
    audio.muted = true;
};

Promise.all([
    waitAudioToLoad(notificationSound),
    waitAudioToLoad(waterVoice)
]).then(() => {
    Neutralino.init();
    startCountdown();
})
