let btnStart = document.querySelector('.start button');
let palyerName = document.querySelector('.name span');
let overlay = document.querySelector('.start');
let gameBlock =  Array.from(document.querySelectorAll('.game-block'));
let orderRange = [...Array(gameBlock.length).keys()];
let wrongTries = document.querySelector('.wrong-tries span');
let checkArray  = [];
let finishBox = document.querySelector('.finish');
let restartBtn = document.querySelector('.finish button');
let soundScuess = document.querySelector('#sucess');
let soundFail = document.querySelector('#fail');

let duration = 5;

btnStart.addEventListener('click' , function(){
    let name = window.prompt('What is Your Name?');

    if(name != ''){
        palyerName.innerHTML = name;
        overlay.remove();

    }else{
        palyerName.innerHTML = 'Unknown';
        overlay.remove();
    };

});

shaffelCards(orderRange)

gameBlock.forEach((block , index)=>{
    block.style.order = orderRange[index];
    block.addEventListener('click', (e)=>{
       
        let flipedCards = Array.from(document.querySelectorAll('.fliped'));

        if(flipedCards.length < 2){
            e.target.parentElement.classList.add('fliped');
            
            flipedCards = Array.from(document.querySelectorAll('.fliped'));
            checkArray.push(e.target.parentElement.dataset.game)

            if(checkArray.length === 2){
                for(let i = 0;  i < checkArray.length; i++){

                    if(checkArray[0] === checkArray[1]){

                        flipedCards.forEach((card)=>{
                            card.classList.remove('fliped');
                            card.classList.add('sucsses');
                            soundScuess.play();
                            checkArray =  [];

                        });

                    }else{
                        
                      setTimeout(()=>{
                        wrongTries.innerHTML = Number(wrongTries.textContent) + 1 / 2;  
                        flipedCards.forEach((card)=>{
                            card.classList.remove('fliped');
                            soundFail.play();
                            checkArray =  [];
                        });
                      }, 500)

                    };
                };
            };        

        }else{
             console.log('No');
        }; 

        if(document.querySelectorAll('.sucsses').length === gameBlock.length){
          setTimeout(()=>{
             finishBox.style.display = 'grid';
                restartBtn.addEventListener('click' ,function(){
                    location.reload();
                })
          }, 1000)
        }
       
    });
});

function shaffelCards(array){
    
    let current = array.length,
        temp,
        random;

    while(current > 0){
        random =  Math.floor(Math.random() * current);

        current--;
        
        temp = array[current];

        array[current] = array[random];

        array[random] = temp;  
    }

    return array;
}

