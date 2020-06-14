
var cardObject={};
var playerNumbers = [];
flag = true
var numberToCardMapping = {
    11 : 'J',
    12 : 'Q',
    13 : 'K',
    14 : 'A'
};
var numberToPlayerMapping = {
    1 : 'A',
    2 : 'B',
    3 : 'C',
    4 : 'D'
}
function declareWinner(playerNumber){
    $("#result").text(numberToPlayerMapping[playerNumber]);
    playerNumbers = [];
    return numberToPlayerMapping[playerNumber];
}
function getRandomCardNumber(cardObject){
    // if(flag)
    // return 3;
    let keys = Object.keys(cardObject);
    let randomNumber = Math.floor(Math.random() * Math.floor(10000));;
    let randomCard = keys[randomNumber%keys.length];
    if(cardObject[randomCard]==1){
        delete cardObject[randomCard];
    }else{
        cardObject[randomCard]--;
    }
    return randomCard;
}
function dealCardsToPlayers(numOfDeals,numOfPlayers){
    let dealedCards = {};
    let currentDeal = 0,playerCount =1;
    while(currentDeal!=numOfDeals){
        let card = getRandomCardNumber(cardObject);
        if(!dealedCards[playerCount]){
            dealedCards[playerCount] = [];
        }
        dealedCards[playerCount].push(card);
        card = numberToCardMapping[card] ? numberToCardMapping[card] : card;

        
        let id = "#"+playerCount+""+parseInt(currentDeal+1); 
        $(id).text(card);


        if(playerCount==numOfPlayers){
            playerCount = 1;
            currentDeal++;  
        }else {
            playerCount++;
        }
    }
    // if(flag){
    // dealedCards = {
    //     1: [11,2,10,5],
    //     2: [9,11,8,12],
    //     3: [11,12,10,3],
    //     4: [5,14,2,8]
    // }
    // flag= false;}
    // flag = false;
    return dealedCards;
}
function getType(playerCards){
    let cardCount={};
    for(let i in playerCards){
        if(!cardCount[playerCards[i]]){
            cardCount[playerCards[i]] = 0;
        }
        cardCount[playerCards[i]]++;
    }
    let maxType=0;
    let countCard= {};
    for(let i in cardCount){
        if(!countCard[cardCount[i]]){
            countCard[cardCount[i]] = [];
        }
        countCard[cardCount[i]].push(i);
        maxType = Math.max(cardCount[i],maxType);    
    }
    countCard["maxType"] = maxType;

    return countCard;
}
function compare(list1,list2){
    let maxType = list1.maxType;
    for(let i=maxType; i>0;i--){
        // console.log(maxType,list1,list2)
        if(list1[i]){
            list1[i].sort((a,b) => b-a);
            list2[i].sort((a,b) => b-a);
            for(let j in list1[i]){
                list1[i][j] = parseInt(list1[i][j])
                list2[i][j] = parseInt(list2[i][j])
                if(list1[i][j]>list2[i][j]){
                    return 0;
                }else if(list1[i][j]<list2[i][j]){
                    return 1;
                }
            }
        }
    }
    return [list1.playerNumber,list2.playerNumber];
}
function getBestCardType(cardsType){
    cardsType.sort(function(a,b){
        return b.maxType - a.maxType;
    })
    // console.log(cardsType)
    let maxType = cardsType[0].maxType;
    for(let i=0;i<cardsType.length;i++){
        if(maxType != cardsType[i].maxType){
            cardsType.splice(i,1);
            i--;
        }
    }
    if(cardsType.length==1){
        return declareWinner(cardsType[0].playerNumber);
    }else if(cardsType.length==2){
        let comp = compare(cardsType[0],cardsType[1]);
        if(typeof comp === 'number'){
            return declareWinner(cardsType[comp].playerNumber);
        }else{
            // playerNumbers.push(cardsType[0].playerNumber, cardsType[1].playerNumber)
            // console.log(comp)
            playerNumbers = comp;
            return checkWinner(dealCardsToPlayers(1,2),playerNumbers);
        }
    }else if(cardsType.length==3){
        let comp1 = compare(cardsType[0],cardsType[1]);
        let comp2;
        if(typeof comp1 === 'number'){
            comp2 = compare(cardsType[comp1],cardsType[2]);
            if(comp2 === 'number'){
                return declareWinner(cardsType[comp].playerNumber);    
            }else {
                playerNumbers = comp2;
                return checkWinner(dealCardsToPlayers(1,2),playerNumbers);
            }
        }else {
            comp2 = compare(cardsType[0],cardsType[2]);
            if(typeof comp2 === 'number'){
                if(comp2 == 0){
                    playerNumbers = comp1;
                    return checkWinner(dealCardsToPlayers(1,2),playerNumbers);
                }else {
                    return declareWinner(cardsType[2].playerNumber);
                }
            }else {
                playerNumbers = [cardsType[0].playerNumber,cardsType[1].playerNumber,cardsType[2].playerNumber]
                return checkWinner(dealCardsToPlayers(1,3),playerNumbers);
            }
        }
    }else if(cardsType.length==4){
        let comp1 = compare(cardsType[0],cardsType[1]);
        let comp2 = compare(cardsType[2],cardsType[3]);
        if(typeof comp1 === 'number' && typeof comp2 === 'number') {
            let comp3 = compare(cardsType[comp1],cardsType[comp2+2]);
            if(typeof comp3 === 'number'){
                if(comp3 == 0){
                    return declareWinner(cardsType[comp1].playerNumber);
                }else {
                    return declareWinner(cardsType[comp2+2].playerNumber);
                }
            }else {
                playerNumbers = comp3;
                return checkWinner(dealCardsToPlayers(1,2),playerNumbers);
            }
        }else if(typeof comp1 === 'number' && typeof comp2 != 'number'){
            let comp3 = compare(cardsType[comp1],cardsType[2]);
            if(typeof comp3 === 'number'){
                if(comp3 == 0){
                    return declareWinner(cardsType[comp1].playerNumber);
                }else {
                    playerNumbers = comp2;
                    return checkWinner(dealCardsToPlayers(1,2),playerNumbers);
                }
            }else {
                playerNumbers = [cardsType[comp1].playerNumber,cardsType[2].playerNumber,cardsType[3].playerNumber]
                return checkWinner(dealCardsToPlayers(1,3),playerNumbers);
            }
        }else if(typeof comp1 != 'number' && typeof comp2 === 'number'){
            let comp3 = compare(cardsType[0],cardsType[comp2+2]);
            if(typeof comp3 === 'number'){
                if(comp3 == 1){
                    return declareWinner(cardsType[comp2+2].playerNumber);
                }else {
                    playerNumbers = comp1;
                    return checkWinner(dealCardsToPlayers(1,2),playerNumbers);
                }
            }else {
                playerNumbers = [cardsType[0].playerNumber,cardsType[1].playerNumber,cardsType[comp2+2].playerNumber]
                return checkWinner(dealCardsToPlayers(1,3),playerNumbers);
            }
        }else{
            let comp3 = compare(cardsType[0],cardsType[2]);
            if(typeof comp3 === 'number'){
                if(comp3 == 0){
                    playerNumbers = comp1;
                    return checkWinner(dealCardsToPlayers(1,2),playerNumbers);
                }else {
                    playerNumbers = comp2;
                    return checkWinner(dealCardsToPlayers(1,2),playerNumbers);
                }
            }else {
                playerNumbers = [cardsType[0].playerNumber,cardsType[1].playerNumber,cardsType[2].playerNumber,cardsType[3].playerNumber]
                return checkWinner(dealCardsToPlayers(1,4),playerNumbers);
            }
        }
    };
}
function checkWinner(playerCards,playerNumbers){
    let cardsType = [];
    for(let i in playerCards){
        cardsType.push(getType(playerCards[i]));
        if(playerNumbers && !playerNumbers.length){
            cardsType[i-1]["playerNumber"] = i;
        }
        else{
            cardsType[i-1]["playerNumber"] = playerNumbers[i-1];
        }
    }
    getBestCardType(cardsType);
}
function initiateCards(numOfDeals,numOfPlayers){
    for(let i=2;i<=14;i++){
        cardObject[i] = numOfDeals;
    }
    playerNumbers = [];
    checkWinner(dealCardsToPlayers(numOfDeals,numOfPlayers),playerNumbers);
}

$("#play").click(function(){
    $("#winnerDiv").hide();
    initiateCards(4,4);
    $("#winnerDiv").show(2000);
    $("#play").text("Play again");
});