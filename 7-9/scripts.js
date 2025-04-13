const schedule = [
  { label: "1st Period", end: "08:45" },
  { label: "2nd Period", end: "09:30" },
  { label: "3rd Period", end: "10:15" },
  { label: "Break 1", end: "10:35" },
  { label: "4th Period", end: "11:20" },
  { label: "5th Period", end: "12:05" },
  { label: "6th Period", end: "12:50" },
  { label: "Break 2", end: "13:05" },
  { label: "7th Period", end: "13:50" },
  { label: "8th period/Bus Leave", end: "14:30" },
  { label: "8th Period/End of school", end: "14:35" },
];

const tuesdaySchedule = [
  { label: "1st Period", end: "08:35" },
  { label: "2nd Period", end: "09:10" },
  { label: "3rd Period", end: "09:45" },
  { label: "Break 1", end: "10:00" },
  { label: "4th Period", end: "10:35" },
  { label: "5th Period", end: "11:10" },
  { label: "6th Period", end: "11:45" },
  { label: "Break 2", end: "12:00" },
  { label: "7th Period", end: "12:35" },
  { label: "8th Period/End of School", end: "13:20" },
];

// for debugging purposes only
let testHour = 10;
let testMinute = 14;
let testSecond = 55;
const useTestTime = false;

function updateCountdown() {
  const now = new Date();

  if (useTestTime) {
    now.setHours(testHour);
    now.setMinutes(testMinute);
    now.setSeconds(testSecond);
    testSecond++;
    if (testSecond >= 60) {
      testSecond = 0;
      testMinute++;
      if (testMinute >= 60) {
        testMinute = 0;
        testHour++;
        if (testHour >= 24) {
          testHour = 0;
        }
      }
    }
  }

  const isTuesday = now.getDay() === 2; // 2 = tuesday
  const todaySchedule = isTuesday ? tuesdaySchedule : schedule;

  const currentTime = now.getHours() * 60 + now.getMinutes();
  const periodText = document.getElementById("current-period");
  const countdownText = document.getElementById("countdown");

  const firstPeriodStart = 8 * 60; // 08:00
  const lastPeriodEnd =
    parseInt(todaySchedule[todaySchedule.length - 1].end.split(":")[0]) * 60 +
    parseInt(todaySchedule[todaySchedule.length - 1].end.split(":")[1]);

  if (currentTime < firstPeriodStart) {
    periodText.textContent = "School hasn't started yet!";
    countdownText.textContent = "";
    return;
  }

  if (currentTime > lastPeriodEnd) {
    periodText.textContent = "School is over!";
    countdownText.textContent = "";
    return;
  }

  let nextPeriod = null;

  for (let i = 0; i < todaySchedule.length; i++) {
    const [h, m] = todaySchedule[i].end.split(":").map(Number);
    const endMinutes = h * 60 + m;

    if (currentTime < endMinutes) {
      nextPeriod = { ...todaySchedule[i], endMinutes };
      break;
    }
  }

  if (nextPeriod) {
    const nowTotalSeconds =
      now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const endTotalSeconds = nextPeriod.endMinutes * 60;

    let secondsLeftTotal = endTotalSeconds - nowTotalSeconds;
    let realMinutes = Math.floor(secondsLeftTotal / 60);
    let realSeconds = secondsLeftTotal % 60;

    periodText.textContent = "Current: " + nextPeriod.label;
    countdownText.textContent = `Time left: ${realMinutes} min ${realSeconds
      .toString()
      .padStart(2, "0")} sec`;
  } else {
    periodText.textContent = "School is over!";
    countdownText.textContent = "";
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);
