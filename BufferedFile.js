export default class BufferedFile {

    constructor(source) {
        this.source = source;
    }

    name() {
        return this.source.name;
    }

    size() {
        return this.source.size;
    }

    async getUint8(byteOffset) {
        const buffer = this.getBuffer(byteOffset);
    }

    async getBuffer(byteOffset) {
        let idx = byteOffset >> 13;
        return arrayBuffer(idx << 13, (idx + 1) << 13);
    }

    async arrayBuffer(start, end) {
        let blob = this.source.slice(start, end);
        return await blob.arrayBuffer();
    }

}
