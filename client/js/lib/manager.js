class Manager{

    constructor(){
        this.success = 0
        this.error = 0
        this.queue = []
        this.cache = {}
    }
    enqueue(path){
        this.queue.push(path)
    }
    loadQueue(callback){
        for(let i in this.queue){
            var path = this.queue[i]
            var img = new Image()
            img.src = path
            img.addEventListener('load',function(){
                this.success++;
            })
            img.addEventListener('error',function(){
                this.error++;
            })
            this.cache[path] = img
        }
        callback()
    }
    get(path){
        return this.cache[path]
    }
}