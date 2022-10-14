
dead_time = 100  //time needed for a point to die

new_point_prob = 0.019  //probability for a new point to spawn (0 - 1)

size= 10

class point{
    time = 0
    aIncrease = Math.random()*0.04 - 0.02  //radios
    dead = false
    constructor(x,y,a){
        this.x = x
        this.y = y
        this.a = a
    }
    draw(){
        context.fillStyle = `rgba(0,0,0,1)`
        context.fillRect(this.x-size/2,this.y-size/2,size,size)
    }
    update(){
        this.time++
        this.a += this.aIncrease
        this.x+= Math.cos(this.a)
        this.y+= Math.sin(this.a)
        let prob = Math.random()
        if(prob < new_point_prob){
            arr.push(new point(this.x,this.y,this.a)) //+Math.random()*0.5 - 0.25
        }
        if(this.time > dead_time){
            this.dead = true
        }
    }
}

arr=[new point(window.innerWidth/2, window.innerHeight/2, Math.PI*1.5)]

function draw(){
    context.fillStyle = `rgba(255,255,255,0)`
    context.fillRect(0,0,window.innerWidth, window.innerHeight)
    for(i=0; i<arr.length; i++){
        arr[i].draw()
    }
}

function update(){
    size*=0.993
    for(i=0; i<arr.length; i++){
        arr[i].update()
        if(arr[i].dead&&arr.length>1){
            arr.splice(i,1)
        }
    }
    //limitations
    if(size < 0.01 || arr.length > 20000){
        arr = []
    }
}
