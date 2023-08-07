window.onload = (event) => {
    let myWorker = new Worker('./worker.js')
    let dropArea = document.getElementById("drop-area")


        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false)
            document.body.addEventListener(eventName, preventDefaults, false)
        })

        ;['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false)
        })

        ;['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false)
        })

    dropArea.addEventListener('drop', handleDrop, false)

    function handleDrop(e) {
        let dt = e.dataTransfer
        let files = dt.files
        let file = files[0];
        handleFile(file)
    }

    function handleFile(file) {
        myWorker.postMessage({ file: file });
        myWorker.onmessage = function (e) {
            console.dir(e.data)
            alert(JSON.stringify(e.data))
        }
    }
    
    document.getElementById("file_picker").addEventListener("change", function () {
        let file = this.files[0];
        handleFile(file)
    })

}

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    let dropArea = document.getElementById("drop-area")
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    let dropArea = document.getElementById("drop-area")
    dropArea.classList.remove('highlight')
}
