/*
============================================

DTF Work Diary 310
Version 1.0.1

storage.js

LocalStorage 管理レイヤー

============================================
*/

"use strict";


//======================================
// 保存キー（共通）
//======================================

const STORAGE_KEY = "dtf_work_diary_310";


//======================================
// 全データ取得
//======================================

function getAllDiaries() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return {};

    try {

        return JSON.parse(data);

    } catch (e) {

        console.error("データ破損:", e);

        return {};

    }

}


//======================================
// 1日分取得
//======================================

function getDiary(date) {

    const all = getAllDiaries();

    return all[date] || null;

}


//======================================
// 1日分保存
//======================================

function saveDiary(date, diaryData) {

    const all = getAllDiaries();

    all[date] = diaryData;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(all)
    );

}


//======================================
// 削除
//======================================

function deleteDiary(date) {

    const all = getAllDiaries();

    if (all[date]) {

        delete all[date];

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(all)
        );

    }

}


//======================================
// 日付一覧取得（カレンダー用）
//======================================

function getDiaryDates() {

    const all = getAllDiaries();

    return Object.keys(all);

}

