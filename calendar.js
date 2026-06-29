/* =====================================================
   DTF Work Diary 310
   calendar.js
   カレンダー表示
===================================================== */

// ======================================
// グローバル変数
// ======================================

let currentDate = new Date();


// ======================================
// カレンダー描画
// ======================================

function renderCalendar() {

    const calendar = document.getElementById("calendar");
    const monthTitle = document.getElementById("currentMonth");

    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // タイトル表示
    monthTitle.textContent =
        `${year}年 ${month + 1}月`;

    // 月初
    const firstDay = new Date(year, month, 1);

    // 月末
    const lastDay = new Date(year, month + 1, 0);

    // 曜日
    const startWeek = firstDay.getDay();

    // 日数
    const totalDays = lastDay.getDate();


    // 前の空白

    for(let i = 0; i < startWeek; i++){

        const empty = document.createElement("div");

        calendar.appendChild(empty);

    }


    // 今日

    const today = new Date();


    // 日付生成

    for(let day = 1; day <= totalDays; day++){

        const card = document.createElement("div");

        card.className = "day-card";

        if(
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate()
        ){

            card.classList.add("today");

        }

        card.innerHTML = `
            <div class="day-number">${day}</div>

            <div class="day-info"></div>
        `;

        card.addEventListener("click", () => {

            console.log(
                `${year}/${month+1}/${day}`
            );

        });

        calendar.appendChild(card);

    }

}