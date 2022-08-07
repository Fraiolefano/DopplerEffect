World={};

World.unit;
World.meter;// il metro sarà un trecentoquarantesimo di unità
World.propagationalSpeed;//340 m/s = 1 u/s

World.idealResolution=720;  //hd
World.idealFPS=60;

World.canvas;
World.window_size;
World.deltaT;
World.init=function (idealRes)
{
  this.window_size=parseInt(Math.min(window.innerWidth,window.innerHeight)*0.95,10);

  if (idealRes!=undefined && idealRes>0)
    {this.idealResolution=idealRes;}
  
  this.canvas=document.getElementById("defaultCanvas0");
  
  if (this.idealResolution>this.window_size)
  {
    this.idealResolution=this.window_size;
  }
  createCanvas(this.idealResolution,this.idealResolution);
  this.canvas.style="width:"+this.window_size+"px;height:"+this.window_size+"px;";

  this.unit=this.idealResolution/10.0;
  this.meter=this.unit/340.0;
  this.propagationalSpeed=this.unit;
  this.deltaT=1/this.idealFPS;
}

World.grid=class
{
  
  constructor(nRows,nColumns,coloration)
  {
    this.nRows=nRows;
    this.nColumns=nColumns;
    this.coloration=coloration;
    if (this.coloration==undefined){this.coloration=color(255,255,255);}
    this.cellSize=[width/nColumns,height/nRows];

    World.unit=World.idealResolution/this.nColumns;
    World.meter=World.unit/340.0;
    World.propagationalSpeed=World.unit;
  }

  draw()
  {
    stroke(this.coloration);
    for(let col=0;col<this.nColumns;col++)
    {
      let x=col*this.cellSize[0];
      line(x,0,x,height);
    }
    for(let row=0;row<this.nRows;row++)
    {
      let y=row*this.cellSize[1];
      line(0,y,width,y);
    }
  }
}
