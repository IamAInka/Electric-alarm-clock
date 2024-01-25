const numbers = [
    [1, 1, 1, 0, 1, 1, 1], // 0
    [0, 0, 1, 0, 0, 1, 0], // 1
    [1, 0, 1, 1, 1, 0, 1], // 2
    [1, 0, 1, 1, 0, 1, 1], // 3
    [0, 1, 1, 1, 0, 1, 0], // 4
    [1, 1, 0, 1, 0, 1, 1], // 5
    [1, 1, 0, 1, 1, 1, 1], // 6
    [1, 0, 1, 0, 0, 1, 0], // 7
    [1, 1, 1, 1, 1, 1, 1], // 8
    [1, 1, 1, 1, 0, 1, 1], // 9
];

const numberElements = document.getElementsByClassName("number");
const numbersEls = Array.from(numberElements).map(numberEl => {
    return Array.from(numberEl.children);
});
// 获取每位数字和每个显示管的二维数组


function splitTime(n) {
    return [Math.floor(n / 10), n % 10];
}
function getSplitTime() {
    const time = new Date();

    return [
        splitTime(time.getHours()),
        splitTime(time.getMinutes()),
        splitTime(time.getSeconds()),
    ].flat();
}
// 获取时间的二维数组并展平



function runClock() {
    const timeNumbers = getSplitTime();

    for (let timeIndex = 0; timeIndex < timeNumbers.length; timeIndex++) {
        const numbersEl = numbersEls[timeIndex];
        const timeNumber = timeNumbers[timeIndex];

        for (let numberElIndex = 0; numberElIndex < numbersEl.length; numberElIndex++) {
            const numberEl = numbersEl[numberElIndex];

            if (numbers[timeNumber][numberElIndex]) {
                numberEl.classList.add("active");
            } else {
                numberEl.classList.remove("active");
            }
        }
    }
}
// 从第0位开始，匹配获取数字模板，遍历判断是否点亮

runClock();
setInterval(runClock, 1000);
// 每秒设置一次

let alarmMusic = new Audio('../assets/audio/kinmokusei.m4a');
let isAlarmSet = false;//false时即执行runClock
let stopButtonPressedTime = 0;


function playAlarm() {
    alarmMusic.play();
    isAlarmSet = true;
    alarmMusic.onended = stopAlarm;
}

function stopAlarm() {
    alarmMusic.pause();
    alarmMusic.currentTime = 0;
    isAlarmSet = false;
    alarmMusic.onended = null;
}
// 暂停，归零，开放设置，清除onended
function setAlarm() {
    if (!isAlarmSet) {
        const hourInput = document.getElementById("hour");
        const minuteInput = document.getElementById("minute");

        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();

        const alarmHour = parseInt(hourInput.value);
        const alarmMinute = parseInt(minuteInput.value);

        if (alarmHour === currentHour && alarmMinute === currentMinute) {
            const currentTime = Date.now();
            const timeDifference = currentTime - stopButtonPressedTime;
            if (timeDifference >= 60000) {
                playAlarm();
                console.log("0");//  到达设置时间时一分钟内闹钟只播放一次，避免stop后重新播放
            } else {
                console.log("1");
            }
        } else {
            console.log("-1");
        }
    }
}


setInterval(setAlarm, 1000);

setAlarm();

const stopButton = document.getElementById("stopBtn");
stopButton.addEventListener("click", () => {
    stopButtonPressedTime = Date.now();
    stopAlarm();
});
//停止按钮