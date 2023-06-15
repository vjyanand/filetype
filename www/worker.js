importScripts('./pkg/filetype_wasm.js');

const { greet, read_at_offset_sync } = wasm_bindgen;

async function run_in_worker() {
    await wasm_bindgen('./pkg/filetype_wasm_bg.wasm');
}

run_in_worker();

onmessage = async function(e) {
    console.log("onmessage inside worker.js runs");
    let workerResult = read_at_offset_sync(
        e.data.file,
    );
    postMessage(workerResult);
}
