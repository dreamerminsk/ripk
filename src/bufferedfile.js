import LRUCache from './lrucache.js';

export default class BufferedFile {
    constructor(source, cacheSize = 8) {
        this.source = source;
        this.cache = new LRUCache(cacheSize);
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
        if (this.cache.has(idx)) {
            return this.cache.get(idx);
        }

        const start = idx << 13;
        const end = Math.min((idx + 1) << 13, this.size());
        const buffer = await this.arrayBuffer(start, end);

        const uint8Buffer = new Uint8Array(buffer);
        this.cache.set(idx, uint8Buffer);

        return uint8Buffer;
    }

    async arrayBuffer(start, end) {
        const blob = this.source.slice(start, end);
        return await blob.arrayBuffer();
    }
}