"use strict";

const APP = {
    name: "DTF Work Diary 310",
    version: "1.0.1",
    storageKey: "dtf-work-diary"
};

// 今日の日付
function getToday() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

// 曜日取得
function getWeekday(dateString) {
    const week = ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"];
    return week[new Date(dateString).getDay()];
}

// 画面遷移
function openEditor(date = getToday()) {
    location.href = `editor.html?date=${date}`;
}

function openHome() {
    location.href = "index.html";
}