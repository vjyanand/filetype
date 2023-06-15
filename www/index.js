const { greet, read_at_offset_sync } = wasm_bindgen;

async function run_wasm() {
    await wasm_bindgen('./pkg/filetype_wasm_bg.wasm');

    let myWorker = new Worker('./worker.js')

    document.getElementById("file_picker").addEventListener("change", function () {
        let file = this.files[0];
        myWorker.postMessage({ file: file });
        myWorker.onmessage = function (e) {
            console.dir(e.data)
            alert(JSON.stringify(e.data))
        }
    })
}

run_wasm();