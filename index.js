import BufferedFile from './BufferedFile.js';
import JpegFile from './JpegFile.ts';
import {SimpleGreeting} from './SimpleGreeting.ts';

window.addEventListener("error", (event) => {
     let bf = new JpegFile();
     alert(`${event.message}, ${bf}`);
});

window.customElements.define('simple-greeting', SimpleGreeting);

export function selectFile () {
    return new Promise(resolve => {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
            let files = Array.from(input.files);
            resolve(files[0]);
        };
        input.click();
    });
}

export function onClick() {
    setTimeout(clear);
    selectFile().then(function(file) {
        document.querySelector("p#file-name").innerText = file && file.name || "no file selected";

        if (file.name.endsWith(".mp3")) {
            mp3 = new Mp3File(file);
            mp3.child().then(c => {
                let parent = document.querySelector("div.struct");
                parent.innerHTML = '';
                c.forEach((child) => parent.innerHTML += blockView(child));
            });
        } else {
        readTableDirectory(file).then(td => {
            document.querySelector("div.struct").innerHTML = blockView(td);
            let recs = [...td.records];
            recs = recs.sort(function (a, b) { return a.offset - b.offset; });
            for (const rec of recs) {
                document.querySelector("div.struct").innerHTML += blockView({name: names[rec.tag] || rec.tag, offset: rec.offset, size: rec.length});
            }
        });
        }
    });
}

export function clear() {
    document.querySelector("p#file-name").innerText = `no file selected`;
    document.querySelector("div.struct").innerHTML = ``;
}

export function blockView(block) {
    return `
        <div class=struct-block>
            <div class=struct-header>${block.name}</div>
            <div class=struct-size>size: ${block.size}</div>
            <div class=struct-offset>offset: ${block.offset}</div>
        </div>`;
}
