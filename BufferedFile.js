export default class BufferedFile {
    constructor(source) {
        this.source = source;
        this.buffers = new Map();
    }

    name() {
        return this.source.name;
    }

    size() {
        return this.source.size;
    }

    async getUint8(byteOffset) {
        const buffer = await this.getBuffer(byteOffset);
        const localOffset = byteOffset & 0x1FFF;
        return buffer[localOffset];
    }

    async getBuffer(byteOffset) {
        const idx = byteOffset >> 13;
        if (this.buffers.has(idx)) {
            return this.buffers.get(idx);
        } else {
            const start = idx << 13;
            const end = Math.min((idx + 1) << 13, this.size());
            const buffer = await this.arrayBuffer(start, end);
            this.buffers.set(idx, new Uint8Array(buffer));
            return this.buffers.get(idx);
        }
    }

    async arrayBuffer(start, end) {
        const blob = this.source.slice(start, end);
        return await blob.arrayBuffer();
    }
}
