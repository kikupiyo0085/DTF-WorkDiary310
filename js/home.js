"use strict";

/*
============================================

DTF Work Diary 310
home.js

・今日 / 前日表示
・storage連携
・簡易サマリー生成

============================================
*/


//======================================
// 初期化
//======================================

document.addEventListener("DOMContentLoaded", () => {

    renderTodayAndYesterday();
    setupButtons();

});


//======================================
// 日付ユーティリティ
//======================================

function getYesterday(dateStr) {

    const d = new Date(dateStr);
    d.setDate(d.getDate() - 1);

    return formatDate(d);

}

function formatDate(date) {

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
}


//======================================
// 表示メイン
//======================================

function renderTodayAndYesterday() {

    const today = getToday();
    const yesterday = getYesterday(today);

    // 日付表示
    setText("todayDate", today);
    setText("yesterdayDate", yesterday);

    // データ取得
    const todayData = getDiary(today);
    const yData = getDiary(yesterday);

    // 描画
    renderCard("todayContent", todayData);
    renderCard("yesterdayContent", yData);

}


//======================================
// カード描画
//======================================

function renderCard(targetId, data) {

    const el = document.getElementById(targetId);

    if (!el) return;

    if (!data) {
        el.innerHTML = "<p>データなし</p>";
        return;
    }

    let html = "";

    // 作業サマリー
    if (data.schedule && data.schedule.length > 0) {

        html += "<div class='summary-section'>";

        html += "<h3>作業</h3>";

        data.schedule.forEach(item => {

            html += `
                <div class="summary-line">
                    <span class="tag">${getIcon(item.type)} ${item.type}</span>
                    <span class="count">${item.count}件</span>
                </div>
            `;

        });

        html += "</div>";
    }

    // 注意・連絡系（dynamic）
    if (data.dynamic && data.dynamic.length > 0) {

        html += "<div class='summary-section'>";
        html += "<h3>連絡事項</h3>";

        data.dynamic.forEach(item => {

            html += `
    <div class="summary-line notice">
        <span class="tag">${getNoticeIcon(item.type)} ${item.type}</span>
        <span class="text">${item.text}</span>
    </div>
`;

        });

        html += "</div>";
    }

    // トラブル
    if (data.trouble) {

        html += `
            <div class="summary-section">
                <h3>トラブル</h3>
                <div class="summary-line">${data.trouble}</div>
            </div>
        `;
    }

    // 明日の予定（前日用に重要）
    if (data.tomorrowSchedule) {

        html += `
            <div class="summary-section">
                <h3>予定</h3>
                <div class="summary-line">${data.tomorrowSchedule}</div>
            </div>
        `;
    }

    el.innerHTML = html;
}


//======================================
// アイコン
//======================================

function getIcon(type) {

    switch (type) {

        case "印刷": return "🖨";
        case "梱包": return "📦";
        case "検品": return "🔍";
        case "DTF": return "🖨";
        case "出荷": return "🚚";
        default: return "📝";

    }

}


//======================================
// テキスト設定
//======================================

function setText(id, text) {

    const el = document.getElementById(id);
    if (el) el.textContent = text;

}


//======================================
// ボタン
//======================================

function setupButtons() {

    const btn = document.getElementById("newDiary");

    if (btn) {

        btn.addEventListener("click", () => {

            const today = getToday();
            location.href = `editor.html?date=${today}`;

        });

    }

}
function getNoticeIcon(type) {

    switch (type) {

        case "連絡事項":
            return "📢";

        case "トラブル":
            return "⚠️";

        case "注意事項":
            return "🔔";

        default:
            return "📝";

    }
}
