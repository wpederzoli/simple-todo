class dataApi {
    constructor(rawData){
        this.rawData = rawData;
    }
    

    getTodo(){
        const filterTodo = (arr) =>{
            return arr.type === 'todo';
        };
        return this.rawData.filter(filterTodo);
    }

    getInProgress(){
        const filterProgress = (arr) =>{
            return arr.type === 'progress';
        };
        return this.rawData.filter(filterProgress);
    }

    getDone(){
        const filterDone = (arr) =>{
            return arr.type === 'done';
        };
        return this.rawData.filter(filterDone);
    }

}

export default dataApi;