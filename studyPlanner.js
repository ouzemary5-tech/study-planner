// ================================
// إضافة المهام
// ================================

const addButton = document.querySelector(".add-task .btn");

const cardContainer = document.querySelector("#card");

const taskInput = document.querySelector("#task");

const subjectInput = document.querySelector("#test");

const timeInput = document.querySelector("#time");

const message = document.querySelector("#message");


// رسالة كيوت
function showMessage(text) {

    message.textContent = text;

    message.style.display = "block";

    setTimeout(function () {

        message.style.display = "none";

    }, 3000);
}


// زر إضافة المهمة
addButton.addEventListener("click", function () {

    const taskName = taskInput.value;

    const subject = subjectInput.value;

    const time = timeInput.value;


    // التأكد من اسم المهمة
    if (taskName === "") {

        showMessage("🌷 أوووه! نسيتِ اسم المهمة 💕");

        return;
    }


    // التأكد من المادة
    if (subject === "") {

        showMessage("📚 أين المادة؟، يجب علينا تحديدها أولا 😭💗");

        return;
    }


    // التأكد من الوقت
    if (time === "") {

        showMessage("⏰ اختاري وقت المهمة يا روحي 🌸");

        return;
    }


    // إنشاء بطاقة جديدة
    const newTask = document.createElement("div");

    newTask.classList.add("task-card");


    // محتوى البطاقة
    newTask.innerHTML = `
        <h3>${subject}</h3>

        <span class="spn">${taskName}</span>

        <span class="task-time">🕐 ${time}</span>

        <br>

        <button class="delete-btn">حذف</button>
    `;


    // إضافة البطاقة إلى الصفحة
    cardContainer.appendChild(newTask);


    // زر الحذف
    const deleteButton = newTask.querySelector(".delete-btn");


    deleteButton.addEventListener("click", function () {

        newTask.remove();

        showMessage("🗑️ تم حذف المهمة بنجاح ✨");

    });


    // تفريغ الخانات
    taskInput.value = "";

    subjectInput.value = "";

    timeInput.value = "";


    // رسالة النجاح
    showMessage("✨ تمت إضافة المهمة بنجاح! أحسنتِ يا روحي 💗");

});



// ================================
// العداد التنازلي
// ================================
// ================================
// العداد التنازلي
// ================================

const countdownDisplay = document.querySelector("#countdown-display");

const hoursInput = document.querySelector("#hours");

const minutesInput = document.querySelector("#minutes");

const secondsInput = document.querySelector("#seconds");

const startTimer = document.querySelector("#start-timer");

const resetTimer = document.querySelector("#reset-timer");

let timer;

let totalSeconds = 0;


// ================================
// تجهيز الصوت
// ================================

let audioContext = null;

let oscillator = null;

let gainNode = null;


function prepareAlarm() {

    audioContext = new AudioContext();

    oscillator = audioContext.createOscillator();

    gainNode = audioContext.createGain();


    oscillator.connect(gainNode);

    gainNode.connect(audioContext.destination);


    oscillator.type = "sine";

    oscillator.frequency.value = 800;

    gainNode.gain.value = 0;


    oscillator.start();

}


// ================================
// تشغيل التنبيه
// ================================

function playAlarm() {

    if (!audioContext || !gainNode) {

        return;

    }


    gainNode.gain.value = 0.3;


    setTimeout(function () {

        gainNode.gain.value = 0;

    }, 1000);

}


// ================================
// تحديث شكل العداد
// ================================

function updateCountdown() {

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;


    countdownDisplay.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}


// ================================
// تشغيل العداد
// ================================

startTimer.addEventListener("click", function () {

    const hours = Number(hoursInput.value) || 0;

    const minutes = Number(minutesInput.value) || 0;

    const seconds = Number(secondsInput.value) || 0;


    totalSeconds =
        hours * 3600 +
        minutes * 60 +
        seconds;


    // إذا ما دخل المستخدم وقت
    if (totalSeconds <= 0) {

        showMessage("⏰ حددي وقت العداد أولًا يا روحي 🌷");

        return;

    }


    // تجهيز الصوت بعد ضغط المستخدم
    if (!audioContext) {

        prepareAlarm();

    }


    // إيقاف أي عداد قديم
    clearInterval(timer);


    updateCountdown();


    timer = setInterval(function () {

        totalSeconds--;


        updateCountdown();


        if (totalSeconds <= 0) {

            clearInterval(timer);


            playAlarm();


            showMessage(
                "🎉 انتهى الوقت! أحسنتِ يا روحي 💗"
            );

        }

    }, 1000);

});


// ================================
// إعادة ضبط العداد
// ================================

resetTimer.addEventListener("click", function () {

    clearInterval(timer);

    totalSeconds = 0;

    updateCountdown();


    hoursInput.value = "";

    minutesInput.value = "";

    secondsInput.value = "";

});



// ================================
// التقويم
// ================================

// ================================
// التقويم
// ================================

// ================================
// التقويم
// ================================

const calendar = document.querySelector("#calendar-content");

let displayedYear = new Date().getFullYear();
let displayedMonth = new Date().getMonth();

const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "ماي",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر"
];

const days = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت"
];


// ================================
// إنشاء أزرار السنة
// ================================

const yearNavigation = document.createElement("div");

yearNavigation.className = "year-navigation";

const previousYear = document.createElement("button");
previousYear.textContent = "‹";

const yearTitle = document.createElement("h3");

const nextYear = document.createElement("button");
nextYear.textContent = "›";

yearNavigation.append(
    previousYear,
    yearTitle,
    nextYear
);

calendar.appendChild(yearNavigation);


// ================================
// إنشاء أزرار الشهر
// ================================

const monthNavigation = document.createElement("div");

monthNavigation.className = "month-navigation";

const previousMonth = document.createElement("button");
previousMonth.textContent = "‹";

const monthTitle = document.createElement("h3");

const nextMonth = document.createElement("button");
nextMonth.textContent = "›";

monthNavigation.append(
    previousMonth,
    monthTitle,
    nextMonth
);

calendar.appendChild(monthNavigation);


// ================================
// مكان الأيام
// ================================

const monthContainer = document.createElement("div");

calendar.appendChild(monthContainer);


// ================================
// إنشاء التقويم
// ================================

function createCalendar() {

    monthContainer.innerHTML = "";

    yearTitle.textContent = displayedYear;

    monthTitle.textContent = months[displayedMonth];


    // أسماء الأيام
    const week = document.createElement("div");

    week.className = "week";

    days.forEach(function(dayName) {

        const dayNameElement =
            document.createElement("span");

        dayNameElement.textContent = dayName;

        week.appendChild(dayNameElement);

    });

    monthContainer.appendChild(week);


    // عدد أيام الشهر
    const numberOfDays =
        new Date(
            displayedYear,
            displayedMonth + 1,
            0
        ).getDate();


    // أول يوم في الشهر
    const firstDay =
        new Date(
            displayedYear,
            displayedMonth,
            1
        ).getDay();


    const daysContainer =
        document.createElement("div");

    daysContainer.className = "days";


    // الفراغات
    for (let i = 0; i < firstDay; i++) {

        const emptyDay =
            document.createElement("span");

        daysContainer.appendChild(emptyDay);

    }


    // تاريخ اليوم
    const today = new Date();

    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();


    // أرقام الأيام
    for (let day = 1; day <= numberOfDays; day++) {

        const dayElement =
            document.createElement("span");

        dayElement.className = "day";

        dayElement.textContent = day;


        // ⭐ إجبار الرقم على الظهور
        dayElement.style.display = "flex";
        dayElement.style.visibility = "visible";
        dayElement.style.opacity = "1";
        dayElement.style.color = "#d10795";
        dayElement.style.alignItems = "center";
        dayElement.style.justifyContent = "center";


        // ❤️ اليوم الحالي
        if (
            day === currentDay &&
            displayedMonth === currentMonth &&
            displayedYear === currentYear
        ) {

            dayElement.classList.add("today");

        }


        daysContainer.appendChild(dayElement);

    }


    monthContainer.appendChild(daysContainer);

}


// ================================
// تغيير السنة
// ================================

previousYear.addEventListener("click", function() {

    displayedYear--;

    createCalendar();

});


nextYear.addEventListener("click", function() {

    displayedYear++;

    createCalendar();

});


// ================================
// تغيير الشهر
// ================================

previousMonth.addEventListener("click", function() {

    displayedMonth--;

    if (displayedMonth < 0) {

        displayedMonth = 11;
        displayedYear--;

    }

    createCalendar();

});


nextMonth.addEventListener("click", function() {

    displayedMonth++;

    if (displayedMonth > 11) {

        displayedMonth = 0;
        displayedYear++;

    }

    createCalendar();

});


// ================================
// تشغيل التقويم
// ================================

createCalendar();
// ================================
// الساعة الرقمية
// ================================

const clock = document.querySelector("#clock");
const todayDate = document.querySelector("#today-date");


function updateClock() {

    const now = new Date();


    const hours = String(now.getHours()).padStart(2, "0");

    const minutes = String(now.getMinutes()).padStart(2, "0");

    const seconds = String(now.getSeconds()).padStart(2, "0");


    clock.textContent =
        `${hours}:${minutes}:${seconds}`;


    const date = now.toLocaleDateString("ar-DZ", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });


    todayDate.textContent = date;

}


// تشغيل الساعة
updateClock();

setInterval(updateClock, 1000);
// ================================
// تذكير المواعيد
// ================================

const reminderTask =
    document.querySelector("#task-name");

const reminderTime =
    document.querySelector("#task-time");

const reminderButton =
    document.querySelector("#set-reminder");

const reminderMessage =
    document.querySelector("#reminder-message");


let reminder = null;


// تعيين التذكير
reminderButton.addEventListener("click", function () {

    const taskName = reminderTask.value.trim();

    const taskTime = reminderTime.value;


    // التأكد من اسم المهمة
    if (taskName === "") {

        reminderMessage.textContent =
            "🌷 اكتبي اسم المهمة أولًا";

        return;

    }


    // التأكد من الوقت
    if (taskTime === "") {

        reminderMessage.textContent =
            "⏰ اختاري وقت التذكير";

        return;

    }


    // حفظ التذكير
    reminder = {

        task: taskName,

        time: taskTime

    };


    reminderMessage.textContent =
        `🔔 تم ضبط تذكير "${taskName}" على الساعة ${taskTime} 💗`;


    // تنظيف الخانات
    reminderTask.value = "";

    reminderTime.value = "";

});
// ================================
// فحص التذكير كل ثانية
// ================================

setInterval(function () {

    if (!reminder) {
        return;
    }


    const now = new Date();


    const currentHours =
        String(now.getHours()).padStart(2, "0");

    const currentMinutes =
        String(now.getMinutes()).padStart(2, "0");


    const currentTime =
        `${currentHours}:${currentMinutes}`;


    if (currentTime === reminder.time) {

        reminderMessage.textContent =
            `🔔 حان وقت "${reminder.task}" 🌷💗`;


        showMessage(
            `🔔 حان وقت ${reminder.task}!`
        );


        // منع التكرار في نفس الدقيقة
        reminder = null;

    }

}, 1000);