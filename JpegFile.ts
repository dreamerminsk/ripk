export default class JpegFile {

    private _parent: any;

    private _offset = 0;
    
    constructor(parent: any) {
        this._parent = parent;
    }

    get parent(): any {
        return this._parent;
    }

}
