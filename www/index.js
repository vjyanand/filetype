async function run_wasm() {
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