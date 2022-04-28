let player = {
    name: ' Mau ',
    chips:  100,
    bet: 0
}
let card
let cards = ''
let sum = 0
let blackJack = false
let isAlive = false
let message = ''
let messageEl = document.getElementById('message-el')
let sumEl = document.getElementById('sum-el')
let cardEl = document.getElementById('cards-el')
let playerEl = document.getElementById('player-el')
let random = 0
//Casa
let stand = false
let hSumEl = document.getElementById('h-sum-el')
let hCardEl = document.getElementById('h-cards-el')
let hCards = ''
let hSum = 0
const standBtn = document.getElementById('stand-btn')
const img = [
    'img/1.png',
    'img/2.png',
    'img/3.png',
    'img/4.png',
    'img/5.png',
    'img/6.png',
    'img/7.png',
    'img/8.png',
    'img/9.png',
    'img/10.png',    
    'img/11.png',
    'img/12.png',
    'img/13.png'
]
//apuestas
const add10 = document.getElementById('add-10')
const add50 = document.getElementById('add-50')
const add100 = document.getElementById('add-100')
let betEl = document.getElementById('bet-el')

//
let a1 = document.getElementById('a-1')
let a11 = document.getElementById('a-11')


playerEl.textContent = player.name + ': $' + player.chips



add10.addEventListener('click', ()=>{
    if(player.chips>9){
        player.chips-=10
        player.bet +=10

        playerEl.textContent = player.name + ': $' + player.chips
        betEl.textContent = 'Bet: ' + player.bet
    }
})

add50.addEventListener('click', ()=>{
    if(player.chips>49){
        player.chips-=50
        player.bet +=50

        playerEl.textContent = player.name + ': $' + player.chips
        betEl.textContent = 'Bet: ' + player.bet
    }
})

add100.addEventListener('click', ()=>{
    if(player.chips>99){
        player.chips-=100
        player.bet +=100

        playerEl.textContent = player.name + ': $' + player.chips
        betEl.textContent = 'Bet: ' + player.bet
    }
})


standBtn.addEventListener('click', ()=>{
    stand = true
    if(hSum<17&&isAlive){
        do{
            let hCard = getRandomCard()
            if(hCard===1 && hSum<9 ){
                hCard = 11
            }else if(hCard===1 && hSum===10){
                hCard = 11
            }
            hSum += hCard
            hCards+=`<img src='${img[random-1]}'/> `
        }while (hSum<17&&isAlive)
        renderGame()

        if(hSum<sum || hSum>21){
            message +=' You Won $' + player.bet + ' !'
            player.chips+=player.bet*2
            player.bet=0
            isAlive= false
        }else if(sum<hSum && hSum<22){
            message ='You Lose.'
            player.bet=0
            isAlive= false
            console.log(player.chips)
            if(player.chips===0){
                message += ' You have no more money'
                }
        }else{
            message ='Draw!'
            player.chips+=player.bet
            player.bet=0
            isAlive= false
        }
    messageEl.textContent = message
    playerEl.textContent = player.name + ': $' + player.chips
    betEl.textContent = 'Bet: '+player.bet
    }

    
    
})

//function getRandomCard()
const getRandomCard = ()=>{
    random = Math.ceil(Math.random()*13)

    if(random>10){
        return 10
    }else if(random>1){
        return random
    }else{
        return 1
    }
}

const renderGame = ()=>{
    sumEl.textContent = 'Sum: ' + sum

    cardEl.innerHTML = cards
    // for(let i=0;i<cards.length; i++){
    //     cardEl.textContent += cards[i] + ' ' 

    // }


    if (sum <= 20){
        message = 'New card?'
    } else if(sum ===21){
        message = 'Blackjack!'
        blackJack = true
        do{
            let hCard = getRandomCard()
            hSum += hCard
            hCards+=`<img src='${img[random-1]}'/> `
        }while (hSum<17)
        
        if(hSum<sum || hSum>21){
            message +=' You Won $' + player.bet + ' !'
            player.chips+=player.bet*2
            player.bet=0
            isAlive= false
        }else{
            message +=' Draw!'
            player.chips+=player.bet
            player.bet=0
            isAlive= false
        }        
        
        
    }else {
        message = 'Loser.'
        isAlive = false
        player.bet=0
        console.log(player.chips)
        if(player.chips===0){
                message += ' You have no more money'
        }
    }
messageEl.textContent = message
hCardEl.innerHTML = hCards
hSumEl.textContent = 'Sum: ' + hSum
playerEl.textContent = player.name + ': $' + player.chips
betEl.textContent = 'Bet: '+player.bet
}

const newCard = ()=>{

    if(isAlive && blackJack===false  && stand===false){
        card = getRandomCard()
        if(card===1){
            a1.textContent = 'A=1'
            a11.textContent = 'A=11'
            sum--
        }
            sum += card
            cards+=`<img src='${img[random-1]}'/> `
        
            renderGame()
        
    }

}

const startGame = ()=>{

    if(player.bet>0&& isAlive===false){
        isAlive = true
        stand = false
        blackJack = false
        sum = 0
    //Player cards
        let firstCard = getRandomCard()
        cards =`<img src='${img[random-1]}'/>`
        let secondCard = getRandomCard()
        cards+=`<img src='${img[random-1]}'/> `
        if(firstCard===1||secondCard===1){
            a1.textContent = 'A=1'
            a11.textContent = 'A=11'
            sum--
        }
    
        sum += firstCard + secondCard
    //House cards
        let hFirstCard = getRandomCard()
        if(hFirstCard===1){
            hFirstCard=11
        }
        hCards =`<img src='${img[random-1]}'/>`
        

        hSum = hFirstCard 

        renderGame()
    }else if(player.bet===0){
        messageEl.textContent = 'place your bet'
    }
}


a1.addEventListener('click',()=>{
    if(firstCard=1){
        firstCard=1
    }else if(secondCard=1){
        secondCard=1
    }else if(card=1){
        card=1
    }
    sum++

    a1.textContent = ''
    a11.textContent = ''
    renderGame()
})

a11.addEventListener('click',()=>{
    if(firstCard=1){
        firstCard=11
    }else if(secondCard=1){
        secondCard=11
    }else if(card=1){
        card=11
    }
    sum+=11


    a1.textContent = ''
    a11.textContent = ''
    renderGame()
})

console.log(player.chips)
