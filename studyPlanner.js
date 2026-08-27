// نجيب زر "إضافة مهمة" من HTML
const addButton = document.querySelector(".add-task .btn");

// نجيب مكان ظهور المهام
const cardContainer = document.querySelector("#card");

// نجيب input اسم المهمة
const taskInput = document.querySelector("#task");

// نجيب input المادة
const subjectInput = document.querySelector("#test");

// نجيب input الوقت
const timeInput = document.querySelector("#time");


// لما نضغط على زر إضافة مهمة
addButton.addEventListener("click", function () {

    // نأخذ المعلومات التي كتبتها المستخدم
    const taskName = taskInput.value;
    const subject = subjectInput.value;
    const time = timeInput.value;


    // نتأكد أن المستخدم ملأ جميع الخانات
    if (taskName === "" || subject === "" || time === "") {
        alert("من فضلك املئي جميع الخانات 🌷");
        return;
    }


    // إنشاء بطاقة جديدة
    const newTask = document.createElement("div");

    // نعطي البطاقة class اسمه task-card
    newTask.classList.add("task-card");


    // نضع محتوى البطاقة داخلها
    newTask.innerHTML = `
        <h3>${subject}</h3>

        <span class="spn">${taskName}</span>

        <span>${time}</span>

        <br>

        <button class="delete-btn">حذف</button>
    `;


    // نضيف البطاقة الجديدة داخل مكان المهام
    cardContainer.appendChild(newTask);


    // نجيب زر الحذف الموجود داخل البطاقة الجديدة
    const deleteButton = newTask.querySelector(".delete-btn");


    // لما نضغط على حذف
    deleteButton.addEventListener("click", function () {

        // نحذف البطاقة نفسها
        newTask.remove();

    });


    // نفرغ الخانات بعد إضافة المهمة
    taskInput.value = "";
    subjectInput.value = "";
    timeInput.value = "";

});
