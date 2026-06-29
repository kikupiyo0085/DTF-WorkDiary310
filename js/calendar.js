"use strict";

document.addEventListener("DOMContentLoaded", () => {
    renderCalendar();
});

function renderCalendar() {

    const calendar = document.getElementById("calendar");
    if (!calendar) return;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startWeek = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const todayStr = getToday();

    calendar.innerHTML = "";

    // 空白
    for (let i = 0; i < startWeek; i++) {
        calendar.appendChild(document.createElement("div"));
    }

    for (let d = 1; d <= totalDays; d++) {

        const dateStr =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

        const data = getDiary(dateStr);

        const cell = document.createElement("div");
        cell.className = "day-cell";

        if (dateStr === todayStr) {
            cell.classList.add("today");
        }

        // 日付
        const number = document.createElement("div");
        number.className = "day-number";
        number.textContent = d;

        // ドット領域
        const area = document.createElement("div");
        area.className = "event-area";

        if (data) {

            // 作業
            if (data.schedule?.length) {

                data.schedule.forEach(item => {

                    const dot = document.createElement("span");
                    dot.className = "event-dot " + getDotClass(item.type);
                    dot.title = item.type;

                    area.appendChild(dot);

                });

            }

            // 連絡系
            if (data.dynamic?.length) {

                const hasNotice = data.dynamic.some(i => i.type === "連絡事項");
                const hasTrouble = data.dynamic.some(i => i.type === "トラブル");
                const hasAttention = data.dynamic.some(i => i.type === "注意事項");

                if (hasNotice) addIcon(area, "📢", "連絡事項");
                if (hasTrouble) addIcon(area, "⚠️", "トラブル");
                if (hasAttention) addIcon(area, "🔔", "注意事項");
            }
        }

        cell.appendChild(number);
        cell.appendChild(area);

        cell.addEventListener("click", () => {
            location.href = `editor.html?date=${dateStr}`;
        });

        calendar.appendChild(cell);
    }
}


//--------------------------
// アイコン追加
//--------------------------

function addIcon(parent, icon, title) {
    const el = document.createElement("span");
    el.textContent = icon;
    el.title = title;
    parent.appendChild(el);
}


//--------------------------
// ドット色
//--------------------------

function getDotClass(type) {

    switch (type) {

        case "印刷": return "dot-print";
        case "梱包": return "dot-pack";
        case "検品": return "dot-check";
        case "DTF": return "dot-dtf";
        case "出荷": return "dot-ship";
        default: return "";

    }
}