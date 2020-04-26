var level = 0;
var totalRowsTaken = 0;
var points = 0;
var currentRowsTaken;



function calculatePoints(currentRowsTaken){
   
    totalRowsTaken += currentRowsTaken;
    console.log(totalRowsTaken);
    
    if(currentRowsTaken == 1){
        points += 40*(level+1);
    }
    else if(currentRowsTaken == 2){
        points += 100*(level+1);
    }
    else if(currentRowsTaken == 3){
        points += 300*(level+1);
    }
    else if(currentRowsTaken == 4){
        points += 1200*(level+1);
    }
    
    document.getElementById("score").innerHTML = "Score: " + points.toString();

    if(totalRowsTaken >= (level+1)*5){
       

        level +=1;

        console.log(level);
        clearInterval(playing);
        timeInterval -= 50;
        playing = setInterval(juego,timeInterval);
        document.getElementById("level").innerHTML = "Level: " + level.toString();
        return true;
    }
   return false;
   
    
}