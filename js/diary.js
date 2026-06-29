"use strict";

/*
============================================

editor (diary.js)

============================================
*/

let isSaved = true;

document.addEventListener("DOMContentLoaded", () => {

    initDiary();

    if (document.querySelector(".task-btn")) {
        initTaskButtons();
    }

    if (document.getElementById("addNoticeBtn")) {
        initDynamicButtons();
    }

    const back = document.getElementById("backButton");
    if (back) {
        back.addEventListener("click", () => location.href = "index.html");
    }

    const saveBtn = document.getElementById("saveButton");
    const footerSave = document.getElementById("footerSaveButton");

    if (saveBtn) saveBtn.addEventListener("click", save);
    if (footerSave) footerSave.addEventListener("click", save);

    document.addEventListener("input", () => {
        isSaved = false;
    });

});

function initDiary() {

    const dateInput = document.getElementById("diaryDate");
    const weekInput = document.getElementById("weekDay");

    if (!dateInput || !weekInput) return;

    const params = new URLSearchParams(location.search);
    const urlDate = params.get("date");

    const targetDate = urlDate || getToday();

    dateInput.value = targetDate;

    updateWeekday();

    dateInput.addEventListener("change", updateWeekday);

    const data = getDiary(targetDate);

    if (data) {
        load(targetDate);
    } else {
        addRow();
    }
}

function updateWeekday() {

    const date = document.getElementById("diaryDate")?.value;
    const weekInput = document.getElementById("weekDay");

    if (!date || !weekInput) return;

    const week = ["日","月","火","水","木","金","土"];

    const d = new Date(date);
    weekInput.value = week[d.getDay()];
}

function addRow(type = "印刷", count = "") {

    const tbody = document.querySelector("#scheduleTable tbody");
    if (!tbody) return;

    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>
            <select class="type">
                <option ${type === "印刷" ? "selected" : ""}>印刷</option>
                <option ${type === "梱包" ? "selected" : ""}>梱包</option>
                <option ${type === "検品" ? "selected" : ""}>検品</option>
                <option ${type === "DTF" ? "selected" : ""}>DTF</option>
                <option ${type === "出荷" ? "selected" : ""}>出荷</option>
                <option ${type === "その他" ? "selected" : ""}>その他</option>
            </select>
        </td>
        <td>
            <input type="number" class="count" value="${count}">
        </td>
        <td>
            <button class="delete">×</button>
        </td>
    `;

    tbody.appendChild(tr);

    tr.querySelector(".delete").addEventListener("click", () => tr.remove());
}

function save() {

    const date = document.getElementById("diaryDate")?.value;
    if (!date) return;

    const data = collectData();

    saveDiary(date, data);

    isSaved = true;

    showToast("保存しました");
}

function collectData() {

    const schedule = [];

    document.querySelectorAll("#scheduleTable tbody tr").forEach(tr => {

        const type = tr.querySelector(".type")?.value;
        const count = tr.querySelector(".count")?.value;

        if (type && count !== "") {
            schedule.push({
                type,
                count: Number(count)
            });
        }
    });

    const dynamic = [];

    document.querySelectorAll(".dynamic-row").forEach(row => {

        const type = row.querySelector(".dynamic-tag")?.textContent;
        const text = row.querySelector(".dynamic-input")?.value;

        if (text?.trim()) {
            dynamic.push({ type, text });
        }
    });

    return {
        weather: document.getElementById("weather")?.value,
        temperature: document.getElementById("temperature")?.value,
        worker: document.getElementById("worker")?.value,
        companyNotice: document.getElementById("companyNotice")?.value,
        handover: document.getElementById("handover")?.value,
        trouble: document.getElementById("trouble")?.value,
        countermeasure: document.getElementById("countermeasure")?.value,
        tomorrowSchedule: document.getElementById("tomorrowSchedule")?.value,
        attention: document.getElementById("attention")?.value,
        schedule,
        dynamic
    };
}

function load(date) {

    const data = getDiary(date);
    if (!data) return;

    Object.keys(data).forEach(key => {

        const el = document.getElementById(key);

        if (el) el.value = data[key];
    });

    if (data.schedule) {
        data.schedule.forEach(s => addRow(s.type, s.count));
    } else {
        addRow();
    }

    if (data.dynamic) {
        data.dynamic.forEach(d => addDynamicField(d.type, d.text));
    }
}

function initTaskButtons() {

    document.querySelectorAll(".task-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            addRow(btn.dataset.type, "");
        });
    });
}

function addDynamicField(type, value = "") {

    const container = document.getElementById("dynamicFields");
    if (!container) return;

    const row = document.createElement("div");
    row.className = "dynamic-row";

    row.innerHTML = `
        <div class="dynamic-tag">${type}</div>
        <textarea class="dynamic-input">${value}</textarea>
        <button type="button" class="remove-btn">×</button>
    `;

    row.querySelector(".remove-btn").addEventListener("click", () => {
        row.remove();
    });

    container.appendChild(row);
}

function initDynamicButtons() {

    const map = [
        ["addNoticeBtn", "連絡事項"],
        ["addTroubleBtn", "トラブル"],
        ["addAttentionBtn", "注意事項"]
    ];

    map.forEach(([id, type]) => {

        const btn = document.getElementById(id);

        if (btn) {
            btn.addEventListener("click", () => {
                addDynamicField(type);
            });
        }
    });
}

function showToast(message) {

    const toast = document.createElement("div");

    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#7FD8BE";
    toast.style.color = "#fff";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "20px";
    toast.style.zIndex = "9999";

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 1500);
}

btn.classList.toggle("active");
