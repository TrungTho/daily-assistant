const DEFAULT_COUNTDOWN_DURATION = 900; //15 minutes
let currTime = new Date()
let finishTime = new Date(currTime.getTime() + 1000 * DEFAULT_COUNTDOWN_DURATION);
const notificationSound = new Audio("./sounds/notification-sound.wav")
const waterVoice = new Audio("./sounds/water-voice.mp3")

const startCountdown = async () => {
    setInterval(async () => {
        await displayCountdownTimer();
    }, 900);
}

const timeFormatter = async (timeInSeconds) => {
    const date = new Date(timeInSeconds * 1000);
    if (timeInSeconds < 3600) {
        return date.toISOString().substring(14, 19);
    }

    return date.toISOString().substring(11, 19);
}

const displayCountdownTimer = async () => {
    const currTime = new Date();
    if (currTime >= finishTime) {
        await showWaterNotification()
        finishTime = new Date(currTime.getTime() + 1000 * (DEFAULT_COUNTDOWN_DURATION));
    }

    const duration = (finishTime - currTime) / 1000;
    const formattedTime = await timeFormatter(duration);
    document.getElementById('timer-display').innerText = `${formattedTime}`;
}

const showWaterNotification = async () => {
    await notificationSound.play();
    await waterVoice.play();
    await Neutralino.os.showNotification('Water', 'Drink some water please!!!');
}

Neutralino.init();
startCountdown();