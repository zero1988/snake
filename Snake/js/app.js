window.onload=init;
window.onkeydown=keyDownHandler;//处理键盘事件

var context;
var cW,cH;

var blockbg;
var block;
var blockWidth,blockHeight;


var canUp=true;
var canLeft=true;
var canRight=true;
var canDown=false;

var s;

function init(){
	log("game start!");

	context=document.getElementById("gameCanvas").getContext("2d");
	cW=234;//14
	cH=360;//20

	blockbg=loadImage("res/blockbg2.png");
	block=loadImage("res/block.png");

	blockWidth=18;
	blockHeight=18;

	initSnake();

	createBean();

	s=setInterval(gameTick,1000/60);
}

var timeCount=0;
function gameTick(){
	//timeCount++;
	//if(timeCount%20==0){
		//crtRowIndex--;
	//}
	drawBG();
	drawSnake();
	drawBean();
}


var snake=[];

function initSnake(){

	snake=[
		[5,5],
		[6,5],
		[7,5]
	];

}

var crtRowIndex=0,crtColumnIndex=5;//运动方块组的当前的行列索引

function drawSnake(){

	if(snake[0][0]<0||snake[0][1]>12||snake[0][1]<0||snake[0][0]>19){
		clearInterval(s);
		alert("游戏结束,得分:"+(snake.length-3)+"!");
		return;
	}

	for(var i=0;i<snake.length;i++){
		//drawBlock(snake[i][0]+crtRowIndex,snake[i][1]);
		drawBlock(snake[i][0],snake[i][1]);
	}
}


function drawBlock(rowIndex,colIndex){
	context.drawImage(block,colIndex*blockWidth,rowIndex*blockHeight);

}


function drawBG(){
	var pattern=context.createPattern(blockbg,"repeat");
	context.rect(0,0,cW,cH);
	context.fillStyle=pattern;
	context.fill();
}

function drawBean(){
	drawBlock(beanRow,beanColumn);
}

//处理键盘事件
function keyDownHandler(e){

	switch(e.keyCode){
		case 37://left
			var tmp1=[];
			var tmp2=[];
			for(var i=0;i<snake.length;i++){
				if(i==0){

					if(snake[i][1]>snake[i+1][1])
						return;

					if(snake[i][0]==beanRow&&snake[i][1]-1==beanColumn){
						var b=[];
						b[0]=beanRow;
						b[1]=beanColumn;
						snake.unshift(b);
						createBean();
						break;
					}

					tmp1[0]=snake[i][0];
					tmp1[1]=snake[i][1];
					tmp2[0]=snake[i][0];
					tmp2[1]=snake[i][1];
					snake[i][1]-=1;
				}else{
					tmp1[0]=snake[i][0];
					tmp1[1]=snake[i][1];
					snake[i][0]=tmp2[0];
					snake[i][1]=tmp2[1];
					tmp2[0]=tmp1[0];
					tmp2[1]=tmp1[1];
				}
	
			}

			break;
		case 38://up
			var tmp1=[];
			var tmp2=[];
			for(var i=0;i<snake.length;i++){
				if(i==0){

					if(snake[i][0]>snake[i+1][0])
						return;

					if(snake[i][0]-1==beanRow&&snake[i][1]==beanColumn){
						var b=[];
						b[0]=beanRow;
						b[1]=beanColumn;
						snake.unshift(b);
						createBean();
						break;
					}

					tmp1[0]=snake[i][0];
					tmp1[1]=snake[i][1];
					tmp2[0]=snake[i][0];
					tmp2[1]=snake[i][1];
					snake[i][0]-=1;
				}else{
					tmp1[0]=snake[i][0];
					tmp1[1]=snake[i][1];
					snake[i][0]=tmp2[0];
					snake[i][1]=tmp2[1];
					tmp2[0]=tmp1[0];
					tmp2[1]=tmp1[1];
				}
			}


			break;
		case 39://right
			var tmp1=[];
			var tmp2=[];
			for(var i=0;i<snake.length;i++){
				if(i==0){
					if(snake[i][1]<snake[i+1][1])
						return;

					if(snake[i][0]==beanRow&&snake[i][1]+1==beanColumn){
						var b=[];
						b[0]=beanRow;
						b[1]=beanColumn;
						snake.unshift(b);
						createBean();
						break;
					}

					tmp1[0]=snake[i][0];
					tmp1[1]=snake[i][1];
					tmp2[0]=snake[i][0];
					tmp2[1]=snake[i][1];
					snake[i][1]+=1;
				}else{
					tmp1[0]=snake[i][0];
					tmp1[1]=snake[i][1];
					snake[i][0]=tmp2[0];
					snake[i][1]=tmp2[1];
					tmp2[0]=tmp1[0];
					tmp2[1]=tmp1[1];

				}
	
			}

			break;
		case 40://down
			var tmp1=[];
			var tmp2=[];
			for(var i=0;i<snake.length;i++){
				if(i==0){
					if(snake[i][0]<snake[i+1][0])
						return;

					if(snake[i][0]+1==beanRow&&snake[i][1]==beanColumn){
						var b=[];
						b[0]=beanRow;
						b[1]=beanColumn;
						snake.unshift(b);
						createBean();
						break;
					}

					

					tmp1[0]=snake[i][0];
					tmp1[1]=snake[i][1];
					tmp2[0]=snake[i][0];
					tmp2[1]=snake[i][1];
					snake[i][0]+=1;
				}else{
					tmp1[0]=snake[i][0];
					tmp1[1]=snake[i][1];
					snake[i][0]=tmp2[0];
					snake[i][1]=tmp2[1];
					tmp2[0]=tmp1[0];
					tmp2[1]=tmp1[1];
					
				}
			}
			break;
	}
}

var beanRow,beanColumn;

function createBean(){

	var i,j;
	i=Math.round(Math.random()*19);
	j=Math.round(Math.random()*13);

	var exist=false;
	for(var k=0;k<snake.length;k++){
		if(snake[k][0]==i&&snake[k][1]==j){
			exist=true;
		}
	}
	if(!exist){
		beanRow=i;
		beanColumn=j;
	}else{
		createBean();
	}

}








function loadImage(src){
	var img=new Image();
	img.src=src;
	return img;
}


function log(s){
	console.log(s);
}