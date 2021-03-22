const cards = document.querySelectorAll('.card');
const restartBtn = document.getElementById('restartBtn');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let firstClick = false;


function rotateCard() {
    if (this === firstCard) return;
    if (lockBoard) return;
    this.classList.add('rotate'); 
    if(!hasFlippedCard){
        // Ha meg nincs felforditott lap, akkor hozzaadja a cardhoz a rotate classt, atallitja a hasFlippedCardot true-ra 
        hasFlippedCard = true;
        // es az elso kartyat beallitjuk this-re
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch(){
    if(firstCard.dataset.logo === secondCard.dataset.logo){
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', rotateCard);
    secondCard.removeEventListener('click', rotateCard);

    resetBoard();
}
 
  function unflipCards() {
      lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('rotate');
      secondCard.classList.remove('rotate');

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  })();


cards.forEach(card => card.addEventListener('click', rotateCard));

//RESTART BUTTON TRYING
restartBtn.addEventListener('click', function(){
    cards.forEach( card =>{
        card.classList.remove('rotate');
    })
});