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

        showMessage("📚 وين المادة؟ ما نخليوهاش تهرب 😭💗");

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

const countdownDisplay = document.querySelector("#countdown-display");

const hoursInput = document.querySelector("#hours");

const minutesInput = document.querySelector("#minutes");

const secondsInput = document.querySelector("#seconds");

const startTimer = document.querySelector("#start-timer");

const resetTimer = document.querySelector("#reset-timer");

let timer;

let totalSeconds = 0;


// تحديث شكل العداد
function updateCountdown() {

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;


    countdownDisplay.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}


// زر بدء العداد
startTimer.addEventListener("click", function () {

    const hours = Number(hoursInput.value) || 0;

    const minutes = Number(minutesInput.value) || 0;

    const seconds = Number(secondsInput.value) || 0;


    totalSeconds =
        hours * 3600 +
        minutes * 60 +
        seconds;


    clearInterval(timer);


    updateCountdown();


    timer = setInterval(function () {

        if (totalSeconds <= 0) {

            clearInterval(timer);

            showMessage("🎉 انتهى الوقت! أحسنتِ يا روحي 💗");

            return;
        }


        totalSeconds--;

        updateCountdown();

    }, 1000);

});


// زر إعادة العداد
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
    "أحد",
    "اثنين",
    "ثلاثاء",
    "أربعاء",
    "خميس",
    "جمعة",
    "سبت"
];


// ================================
// أزرار السنة
// ================================

const yearNavigation = document.createElement("div");

yearNavigation.classList.add("year-navigation");


const previousYear = document.createElement("button");

previousYear.textContent = "‹";


const yearTitle = document.createElement("h3");


const nextYear = document.createElement("button");

nextYear.textContent = "›";


yearNavigation.appendChild(previousYear);

yearNavigation.appendChild(yearTitle);

yearNavigation.appendChild(nextYear);

calendar.appendChild(yearNavigation);


// ================================
// أزرار الشهر
// ================================

const monthNavigation = document.createElement("div");

monthNavigation.classList.add("month-navigation");


const previousMonth = document.createElement("button");

previousMonth.textContent = "‹";


const monthTitle = document.createElement("h3");


const nextMonth = document.createElement("button");

nextMonth.textContent = "›";


monthNavigation.appendChild(previousMonth);

monthNavigation.appendChild(monthTitle);

monthNavigation.appendChild(nextMonth);

calendar.appendChild(monthNavigation);


// مكان الأيام

const monthContainer = document.createElement("div");

calendar.appendChild(monthContainer);


// ================================
// إنشاء التقويم
// ================================

function createCalendar() {

    monthContainer.innerHTML = "";


    yearTitle.textContent = displayedYear;

    monthTitle.textContent = months[displayedMonth];


    // أسماء أيام الأسبوع

    const week = document.createElement("div");

    week.classList.add("week");


    for (let day = 0; day < 7; day++) {

        const dayName = document.createElement("span");

        dayName.textContent = days[day];

        week.appendChild(dayName);

    }


    monthContainer.appendChild(week);


    // عدد أيام الشهر

    const numberOfDays =
        new Date(
            displayedYear,
            displayedMonth + 1,
            0
        ).getDate();


    // اليوم الذي يبدأ فيه الشهر

    const firstDay =
        new Date(
            displayedYear,
            displayedMonth,
            1
        ).getDay();


    const daysContainer = document.createElement("div");

    daysContainer.classList.add("days");


    // الفراغات قبل اليوم الأول

    for (let i = 0; i < firstDay; i++) {

        const emptyDay = document.createElement("span");

        daysContainer.appendChild(emptyDay);

    }


    // إنشاء الأيام

    for (let day = 1; day <= numberOfDays; day++) {

        const dayNumber = document.createElement("span");

        dayNumber.textContent = day;

        dayNumber.classList.add("day");


        daysContainer.appendChild(dayNumber);

    }


    monthContainer.appendChild(daysContainer);
}


// ================================
// تغيير السنة
// ================================

previousYear.addEventListener("click", function () {

    displayedYear--;

    createCalendar();

});


nextYear.addEventListener("click", function () {

    displayedYear++;

    createCalendar();

});


// ================================
// تغيير الشهر
// ================================

previousMonth.addEventListener("click", function () {

    displayedMonth--;


    if (displayedMonth < 0) {

        displayedMonth = 11;

        displayedYear--;

    }


    createCalendar();

});


nextMonth.addEventListener("click", function () {

    displayedMonth++;


    if (displayedMonth > 11) {

        displayedMonth = 0;

        displayedYear++;

    }


    createCalendar();

});


// إنشاء التقويم عند فتح الصفحة

createCalendar();
