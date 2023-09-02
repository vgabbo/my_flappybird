document.addEventListener("DOMContentLoaded", () => {
    const bird = document.querySelector(".bird"); 
    const gameDisplay = document.querySelector(".game-container");
    const ground = document.querySelector(".ground");

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }

    let gametimerId = setInterval(startGame, 20);

    function control(e){
        if (e.keyCode === 32){
            jump();
        }
    }

    function jump() {
        if(birdBottom < 500) {
            birdBottom += 50;
            bird.style.bottom = birdBottom + 'px';
        }
    }
    document.addEventListener("keyup", control);

    function generateObstacles(){
        let obstacleLeft=500
        let topObstacleLeft=500
        let randomHeight = Math.random() * 160;
        let topObstacleBottom=randomHeight + 570;
        let obstacleBottom=randomHeight;
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if(!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        //I'm putting the obstacle in the background into the div gamecontainer
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);

        obstacle.style.bottom = obstacleBottom+'px'
        obstacle.style.left = obstacleLeft+'px';

        topObstacle.style.bottom = topObstacleBottom+'px'
        topObstacle.style.left = topObstacleLeft+'px';

        function obstacleMove(){
            obstacleLeft -= 2
            topObstacleLeft -= 2
            obstacle.style.left = obstacleLeft+'px';
            topObstacle.style.left = topObstacleLeft+'px';

            if (obstacleLeft === -60){
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }

            if( (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && birdBottom < obstacleBottom + 153 ) ||
                ( topObstacleLeft > 200 && topObstacleLeft < 280 && birdLeft === 220 && birdBottom+45 > topObstacleBottom + 1 ) ||
                birdBottom === 0){
                gameOver();
                clearInterval(timerId);
            }

        }

        let timerId = setInterval(obstacleMove, 20)
        if(!isGameOver) setTimeout(generateObstacles, 3000) //
    }

    generateObstacles();

    function gameOver(){
        clearInterval(gametimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
    }

})