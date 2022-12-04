var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// BufferedFile.js
var _source;
var BufferedFile = class {
  constructor(source) {
    __privateAdd(this, _source, void 0);
    __privateSet(this, _source, source);
  }
  name() {
    return __privateGet(this, _source).name;
  }
  size() {
    return __privateGet(this, _source).size;
  }
  arrayBuffer(start, end) {
    return __async(this, null, function* () {
      let blob = __privateGet(this, _source).slice(start, end);
      return yield blob.arrayBuffer();
    });
  }
};
_source = new WeakMap();

// JpegFile.ts
var JpegFile = class {
  constructor(parent) {
    this.parent = parent;
  }
};

// index.js
window.addEventListener("error", (event) => {
  let bf = new JpegFile();
  alert(`${event.message}, ${bf}`);
});
function selectFile() {
  return new Promise((resolve) => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      let files = Array.from(input.files);
      resolve(files[0]);
    };
    input.click();
  });
}
function onClick() {
  setTimeout(clear);
  selectFile().then(function(file) {
    document.querySelector("p#file-name").innerText = file && file.name || "no file selected";
    if (file.name.endsWith(".mp3")) {
      mp3 = new Mp3File(file);
      mp3.child().then((c) => {
        let parent = document.querySelector("div.struct");
        parent.innerHTML = "";
        c.forEach((child) => parent.innerHTML += blockView(child));
      });
    } else {
      readTableDirectory(file).then((td) => {
        document.querySelector("div.struct").innerHTML = blockView(td);
        let recs = [...td.records];
        recs = recs.sort(function(a, b) {
          return a.offset - b.offset;
        });
        for (const rec of recs) {
          document.querySelector("div.struct").innerHTML += blockView({ name: names[rec.tag] || rec.tag, offset: rec.offset, size: rec.length });
        }
      });
    }
  });
}
function clear() {
  document.querySelector("p#file-name").innerText = `no file selected`;
  document.querySelector("div.struct").innerHTML = ``;
}
function blockView(block) {
  return `
        <div class=struct-block>
            <div class=struct-header>${block.name}</div>
            <div class=struct-size>size: ${block.size}</div>
            <div class=struct-offset>offset: ${block.offset}</div>
        </div>`;
}
export {
  blockView,
  clear,
  onClick,
  selectFile
};
