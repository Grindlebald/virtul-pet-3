class Food{
    constructor(){
        this.foodStock=0
        this.lastFed=0
        this.image=loadImage('images/Milk.png')
    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock
    }
    getFedTime(lastFed){
        this.lastFed=lastFed
    }
    deductFood(){
        if (this.foodStock>0){
            this.foodStock=this.foodStock-1
        }
    }
    getFoodStock(){
        return this.foodStock
    }
    display(){
        background(46,138,87)
        fill(255)
        textSize(15)
        if (lastFed >= 12){
            text("Last Fed: "+lastFed%12+"PM", 50, 30)
        }
        else if (lastFed == 0){
            text("Last Fed: "+"12 AM", 50, 30)
        }
        else {
            text("Last Fed: "+lastFed+"AM", 50, 30)
        }
        var x=80,y=100
        imageMode(CENTER)
        image(this.image,720,220,70,70)

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80
                    y=y+50
                }
                image(this.image,x,y,50,50);
                x=x+30
            }
        }
    }
    bedroom(){
        background(bedroomImg, 550, 500)
    }
    garden(){
        background(gardenImg, 550, 500)
    }
    bathroom(){
        background(bathroomImg, 550, 500)
    }
}