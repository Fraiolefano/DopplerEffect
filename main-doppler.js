//By Fraiolefano

var grid;
var w1;
var w2;

var lastTime=0;
function setup()
{
  pixelDensity(1);
  frameRate(World.idealFPS);
  World.init(720);

  grid=new World.grid(20,20,color(75,0,0));
  w1=new Wave(new p5.Vector(width*0.25,height/2.0),color(0,255,0));
  w2=new Wave(new p5.Vector(width*0.75,height/2.0),color(255,255,0));
  InputManager.init();
}

function draw()
{
  World.deltaT=(millis()-lastTime)/1000.0;
  background(0);
  grid.draw();
  w1.update();
  w1.draw();
  w2.update();
  w2.draw();
  w2.getFP(w1);
  lastTime=millis();
}


function positionControl()
{
  if (mouseX>0 && mouseX<width && mouseY>=(0.40*height) && mouseY<=(0.60*height))
  {
    if (InputManager.c1.number==0) //controlllo punto materiale A
    {
      w1.position.x=mouseX;
    }
    else //controlllo punto materiale B
    {
      w2.position.x=mouseX;
    }

  }
}

function mouseClicked()
{
  positionControl();
}

function mouseDragged()
{
  positionControl();
}
