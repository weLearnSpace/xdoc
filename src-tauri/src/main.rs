// #![cfg_attr(
//   all(not(debug_assertions), target_os = "windows"),
//   windows_subsystem = "windows"
// )]

// fn main() {
//   tauri::Builder::default()
//     .run(tauri::generate_context!())
//     .expect("error while running tauri application");
// }
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::sync::Mutex;
use tauri::api::dialog::*;
use tauri::Manager;
use tauri::State;

// Mutex<i32> 型のカウンタ構造体を定義する
struct Counter(Mutex<i32>);

// カウンタ値を増減して新しい値を返す
#[tauri::command]
fn counter(count_val: i32, counter: State<Counter>) -> i32 {
    let mut ct = counter.0.lock().unwrap();
    *ct += count_val;
    *ct
}

// 受け取った値をメッセージBOXに出してみる
#[tauri::command]
fn call_rust(js_msg: String, window: tauri::Window) -> String {
    println!("JSからメッセージ：{}", js_msg);
    let label = window.label();
    let parent_window = window.get_window(label).unwrap();
    tauri::async_runtime::spawn(async move {
        message(Some(&parent_window), "タイトル", &js_msg);
    });
    "ぼくRust!".into()
}

fn main() {
    tauri::Builder::default()
        .manage(Counter(Default::default()))
        .invoke_handler(tauri::generate_handler![call_rust, counter,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
