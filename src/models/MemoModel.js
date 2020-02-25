class MemoModel {
    constructor (data) {
        let created_date = new Date().toISOString();
        this._id = data._id ? data._id : null;
        this.name = data.name ? data.name : "";
        this.content = data.content ? data.content : "";
        this.created_date = data.created_date ? data.created_date : created_date;
    }
}

export default MemoModel;