window.onload=init;
window.onkeydown=keyDownHandler;

var context;
var cW=234,cH=360;
var itemHeight=18,itemWidth=18;

var block,blockbg;

var s;
function init(){

	var canvas=document.getElementById("gameCanvas");
	context=canvas.getContext("2d");

	block=loadImage("res/block.png");
	blockbg=loadImage("res/blockbg2.png");

	initSnake();
	createFood();
	
	s=setInterval(gameTick,1000/30);
}

var count=0;
function gameTick(){
	cleanScreen();
	drawBG();
	drawSnake();
	drawFood();

	if(count%(6-Math.floor((snake.length-3)/10))==0){
		move();
	}
	count++;
}




//-------------------绘制snake---------------
var snake=[];

var	direction=[0,0];//上下 左右 

//初始化蛇
function initSnake(){
	snake=[
		[5,5],
		[6,5],
		[7,5]
	];
}

function drawSnake(){
	for(var i=0;i<snake.length;i++){
		drawBlock(snake[i][0],snake[i][1]);
	}

}

var food=[];

function addToSnake(){
	if(food.length==1){
		snake.unshift(food);
	}
}

function createFood(){
	var r=Math.floor(Math.random()*20);
	var c=Math.floor(Math.random()*13);

	var exist=false;
	for(var i;i<snake.length;i++){
		if(snake[i][0]==r&&snake[i][1]==c){
			exist=true;
			break;
		}
	}
	if(exist)
		createFood();
	else{
		food=[r,c];
	}
}

function drawFood(){
	drawBlock(food[0],food[1]);
}


function drawBG(){
	var pattern=context.createPattern(blockbg,"repeat");
	context.rect(0,0,cW,cH);
	context.fillStyle=pattern;
	context.fill();
}

function drawBlock(rowIndex,colIndex){
	context.drawImage(block,colIndex*itemWidth,rowIndex*itemHeight);
}

function move(){
	if(direction[0]==0&&direction[1]==0)
		return;
	var tmpRow=snake[0][0];
	var tmpColumn=snake[0][1];

	var newHead=[tmpRow+direction[0],tmpColumn+direction[1]];

	if(!check(newHead)){
		clearInterval(s);
		alert("游戏结束,得分:"+(snake.length-3)+"!");
		return;
	}

	snake.unshift(newHead);
	if(newHead[0]==food[0]&&newHead[1]==food[1]){
		createFood();
	}else{
		snake.splice(snake.length-1);
	}
}

function check(newHead){
	//边界
	if(newHead[0]<0||newHead[0]>19||newHead[1]<0||newHead[1]>12)
		return false;
	//自身
	for(var i=0;i<snake.length;i++){
		if(snake[i][0]==newHead[0]&&snake[i][1]==newHead[1])
			return false;
	}

	return true;
}




function keyDownHandler(e){
	switch(e.keyCode){
		case 37:
			if(direction[1]!=1)
				direction=[0,-1];
			break;
		case 38:
			if(direction[0]!=1)
				direction=[-1,0];
			break;
		case 39:
			if(direction[1]!=-1)
				direction=[0,1];
			break;
		case 40:
			if(direction[0]!=-1)
				direction=[1,0]
			break;
	}
}


function cleanScreen(){
	context.clearRect(0,0,cW,cH);
}

function loadImage(src){
	var img=new Image();
	img.src=src;
	return img;
}