class BufferedFile {

    #source;

    constructor(source) {
        this.#source = source;
    }

    name() {
        return this.#source.name;
    }

    size() {
        return this.#source.size;
    }

    async arrayBuffer(start, end) {
        let blob = this.#source.slice(start, end);
        return await blob.arrayBuffer();
    }

}
