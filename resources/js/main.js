const DEFAULT_COUNTDOWN_DURATION = 900; //15 minutes
let timer = DEFAULT_COUNTDOWN_DURATION;
const notificationSound = new Audio("./sounds/notification-sound.wav")

const startCountdown = async () => {

    setInterval(async () => {
        await displayCountdownTimer();
    }, 1000);
}

const timeFormatter = async (timeInSeconds) => {
    const date = new Date(timeInSeconds * 1000);
    if (timeInSeconds < 3600) {
        return date.toISOString().substring(14, 19);
    }

    return date.toISOString().substring(11, 19);
}

const displayCountdownTimer = async () => {
    timer -= 1;
    const formattedTime = await timeFormatter(timer);
    document.getElementById('timer-display').innerText = `${formattedTime}`;

    if (timer < 1) {
        await showWaterNotification()
        timer = DEFAULT_COUNTDOWN_DURATION + 1;
    }
}

const showWaterNotification = async () => {
    await notificationSound.play();
    await Neutralino.os.showNotification('Water', 'Drink some water please!!!');
}

Neutralino.init();
startCountdown();