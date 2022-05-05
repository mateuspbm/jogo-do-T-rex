//criação das sprites 

// criaçao das sprites do trex
var trex, trex_running, trex_collided;

//criaçao das sprites do chao
var solo, invisibleGround, groundImage,solar;

var cactG,nuvG

var stado=0

var gameover

var reeniciamento

var fim

var recomerço

var somP

var somdamorte

var somdospontos
var pont=0

// carregar imagens para usar no código
function preload() {
  
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
nunvem=loadImage("cloud.png")
carct11=loadImage("obstacle1.png")
carct12=loadImage("obstacle2.png")
carct13=loadImage("obstacle3.png")
carct14=loadImage("obstacle4.png")
carct15=loadImage("obstacle5.png")
carct16=loadImage("obstacle6.png")
gameover=loadImage("gameOver.png")
reeniciamento=loadImage("restart.png")
somP=loadSound("jump.mp3")
somdamorte=loadSound("die.mp3")
somdospontos=loadSound("checkpoint.mp3")
}


// criar sprites - configurar sprites - adicionar animações ou imagens 
function setup() {
  //cria a tela
  createCanvas(windowWidth, windowHeight);
  
  //cria o trex
  trex = createSprite(50,160,20,50);
  // coloca a animação no trex
  trex.addAnimation("running", trex_running);
  // cria a escala do trex
  trex.scale = 0.5;
  //velocidade pernas do trex 
  trex_running.frameDelay = 1;
  trex.debug=true
  trex.setCollider("circle",0,0,40)
  // cria o solo
  solo = createSprite(width/2 ,windowHeight/2 ,400,20);
  // adiciona a imagem na sprite
  solo.addImage("ground",groundImage);
  solo.x = solo.width /2;
  //adiciona velocidade do solo - anda pra esquerda (x)
  solo.velocityX = -(10+pont/100);
  
  //cria o solo 
  solar = createSprite(300,windowHeight/2+20 ,600,20);
  //deixamos o solo invisivel
  solar.visible=false;
  
cactG=new Group()
nuvG=new Group()

fim=createSprite(windowWidth/2,windowHeight/2,200,300)
recomerço =createSprite(width/2,windowHeight/2+30,100,200)
fim.addImage("fim",gameover)
recomerço.addImage("recomerco",reeniciamento)
recomerço.scale=0.1
fim.visible=false
recomerço.visible=false
}


// ações - tudo que o jogo faz

function draw() {
  //cor da tela
  background("pink");
  
  //mostra na tela o valor do trex na posicao y
  console.log(trex.y);
  
  
  
  
  
  //gravidade
  trex.velocityY = trex.velocityY + 0.8;
  
  
  
  // colisao do trex com o chao invisivel 
  trex.collide(solar);
  
  
  //desenha as nossas sprites
  drawSprites();
  
if ( stado==0) {
//da um espaço entre as nunvens

if(frameCount%100==0){ // esta chamando a funcao 
  criate()
obstalos()
}
text("potuaçao"+pont,500,50)
pont+=1
if (frameCount%100==0) {
  somdospontos.play()
  
}

  //reinicia o solo - faz o solo nunca acabar
  if (solo.x < 0) {
    solo.x = solo.width / 2;
  }
  // quando você apertar espaço - trex pula pra cima
  if (touches.length>0 || keyDown("space")) {
    // testa se o trex está no chao  
      if(trex.y>=144){
      trex.velocityY = -20;
      somP.play()
      }
    
    
    }
    if ( cactG.isTouching(trex)) {
stado=1  
fim.visible=true
recomerço.visible=true  
somdamorte.play()  

      
    }
}
if ( stado==1) {
 solo.velocityX=0
 cactG.setVelocityXEach(0)
 cactG.setLifetimeEach(-1)
 trex.addAnimation("bateu",trex_collided)
 trex.changeAnimation("bateu")
 
 if (touches.length>0 || mousePressedOver(recomerço)) {
   fim.visible=false
   recomerço.visible=false
     stado=0
     cactG.destroyEach()
     trex.changeAnimation("running")
     solo.velocityX = -(10+pont/100);
  pont=0
  }
 }

}
//criar as nunvens
function criate(){
  nuv=createSprite(0,100,100,200)
 nuv.velocityX=(10+pont/100)
 nuv.addImage(nunvem)
nuv.scale=0.3
nuv.y=random(10,70)
nuv.lifetime=150
nuvG.add(nuv)
}
function obstalos(){
  cact=createSprite(windowWidth,windowHeight/2  )
  cact.scale=0.2
 cact.velocityX=-(10+pont/100)
var numero=Math.round(random(1,6))
switch(numero){
  case 1:cact.addImage(carct11)
  cact.scale=0.15
   break
    case 2:cact.addImage(carct12)
   break
   case 3:cact.addImage(carct13)
   break
   case 4:cact.addImage(carct14)
  cact.scale=0.08
   break
   case 5:cact.addImage(carct15)
   cact.scale=0.08
   break
   case 6:cact.addImage(carct16)
   break
}
cact.lifetime=150
cactG.add(cact)

}