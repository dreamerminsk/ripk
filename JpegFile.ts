interface Block {
    parent(): Block;
}

export default class JpegFile {

    private _parent: any;
    
    constructor(parent: any) {
        this._parent = parent;
    }

    get parent(): any {
        return this._parent;
    }

}
