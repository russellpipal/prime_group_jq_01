// Fruit Objects
var apple = {
	price: 500,
	average: 0,
	number: 0,
	priceHistory: []
};

var banana = {
	price: 799,
	average: 0,
	number: 0,
	priceHistory: []
};

var grape = {
	price: 699,
	average: 0,
	number: 0,
	priceHistory: []
};

var orange = {
	price: 249,
	average: 0,
	number: 0,
	priceHistory: []
}
// Starting Money Amount
var money = 10000;

// This function updates all the display elements
$(function(){
	updateDisplay();
// Timer with random price generator
	setInterval(function(){
		updatePrice(orange);
		updatePrice(apple);
		updatePrice(grape);
		updatePrice(banana);
		updateDisplay();
	}, 15000);

// Buy button click events
	$("#buyAppleButton").on("click", function(){
		buy(apple);
	});
	$("#buyOrangeButton").on("click", function(){
		buy(orange);
	});
	$("#buyGrapesButton").on("click", function(){
		buy(grape);
	});
	$("#buyBananaButton").on("click", function(){
		buy(banana);
	});

	//Sell button click events
	$("#sellAppleButton").on("click", function(){
		sell(apple);
	});
	$("#sellOrangeButton").on("click", function(){
		sell(orange);
	});
	$("#sellGrapeButton").on("click", function(){
		sell(grape);
	});
	$("#sellBananaButton").on("click", function(){
		sell(banana);
	})
});

// Updates display when items are changed
function updateDisplay(){
	$("#myMoney").text(formatAsCurrency(money));
	$("#numApples").text(apple.number);
	$("#numBananas").text(banana.number);
	$("#numGrapes").text(grape.number);
	$("#numOranges").text(orange.number);
	$("#avgApple").text(formatAsCurrency(apple.average));
	$("#avgBanana").text(formatAsCurrency(banana.average));
	$("#avgOrange").text(formatAsCurrency(orange.average));
	$("#avgGrape").text(formatAsCurrency(grape.average));
	$("#applePrice").text(formatAsCurrency(apple.price));
	$("#bananaPrice").text(formatAsCurrency(banana.price));
	$("#grapePrice").text(formatAsCurrency(grape.price));
	$("#orangePrice").text(formatAsCurrency(orange.price));
	console.log("update display running");
}

// function for what happens when the buy button is clicked. Gets passed into the click event
function buy(fruit){
	if(fruit.price <= money){
		money -= fruit.price;
		fruit.number++;
		fruit.priceHistory.push(fruit.price);
		updateAverage(fruit);
		updateDisplay();
	}else{
		alert("NO FRUIT FOR YOU >:( ");
	}
}

// function for what happens when the sell button is clicked. Gets passed into the click event
function sell(fruit){
	if(fruit.number > 0){
		money += fruit.price;
		fruit.number--;
		updateDisplay();
	}else{
		alert("NO FRUIT TO SELL");
	}
}

// Function for calculating the average price of the fruit
function updateAverage(fruit){
	var sum = 0;
	for(var it = 0; it < fruit.priceHistory.length; it++){
		sum += fruit.priceHistory[it];
	}
	fruit.average = Math.round(sum / fruit.priceHistory.length);
}

// function that calculates the random number to be added to the fruit price and to update the fruit price. Passed into timer function
function updatePrice(fruit) {
	console.log("updatePrice:", 'running');
	do {
		var priceChange = randomNumber(-50, 50);
		console.log('priceChange', priceChange);
		fruit.price += priceChange;
	} while(fruit.price >= 999 || fruit.price <= 50);

	console.log(fruit.price);
	return fruit.price;
}

// Random number generator
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

// Converts numbers into currency fo
function formatAsCurrency(input) {
	return (input/100).toLocaleString('en-US', {style: 'currency', currency: 'USD', currencyDisplay: 'symbol'});
}
