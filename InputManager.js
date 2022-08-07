InputManager={};

InputManager.r1;
InputManager.r2;
InputManager.n1;
InputManager.n2;

InputManager.c1;

InputManager.p;

InputManager.fp;

InputManager.downloader;
InputManager.init=function()
{
    this.r1=document.getElementById("r1");
    this.r2=document.getElementById("r2");

    this.n1=document.getElementById("n1");
    this.n2=document.getElementById("n2");

    this.c1=document.getElementById("positionController");

    this.p=document.getElementById("pulserButton");

    this.fp=document.getElementById("labelF");

    this.downloader=document.getElementById("downloader");
    this.r1.value=0;
    this.r2.value=0;

    this.n1.value=0;
    this.n2.value=0;

    this.c1.value="Position Controller A";
    this.c1.number=0;
    
    this.p.number=0;
    this.p.style.backgroundColor="white";

    this.generateButtons();

}

InputManager.changeController=function()
{
 if (this.c1.number==0)
 {
    this.c1.value="Position Controller B";
    this.c1.number=1;
 }
 else
 {
    this.c1.value="Position Controller A";
    this.c1.number=0;
 }
}

InputManager.changeVel=function(waveObject,inputVal)
{
    waveObject.velocity=float(inputVal)*World.meter;
    if (isNaN(waveObject.velocity)){waveObject.velocity=0;}
    waveObject.stepPerFrame=waveObject.velocity*(1.0/World.idealFPS);
}

InputManager.changePulseState=function()
{
    if (this.p.number==0)
    {
        this.p.number=1;
        this.p.style.backgroundColor="#0add08";
        w1.pulsing=true;
        w1.pulsingTimer=w1.period;
    }
    else
    {
        this.p.number=0;
        this.p.style.backgroundColor="white";
        w1.pulsing=false;
    }
}

InputManager.clear=function()
{
    w1.pulses=[];
}

InputManager.printFp=function(frequencyText)
{
    this.fp.innerText=frequencyText;
}

InputManager.saveShot=function(imgName)
{
    nowTime=year()+"_"+month()+"_"+day()+"-"+hour()+"-"+minute()+"-"+second();
    imageName="./imgs/"+imgName+"_"+nowTime+".png";
    save(imageName);
    console.log("Saved : "+imageName);
}

InputManager.generateButtons=function()
{
  buttonDiv=document.getElementById("colorButtons");
  for(let c=0;c<3;c++)
  {
    divEl=document.createElement("DIV");
    divEl.style="width:31%;display:inline-block;height:50px;";//border:white solid
    radioB=document.createElement("input");
    radioB.setAttribute("type","radio");
    radioB.name="colorations";
    radioB.value=c;
    radioB.onclick=function(){InputManager.changeColoration(c)};
    radioB.style="width:50px;height:50px;accent-color:orange;";
    if (c==0){radioB.setAttribute("checked",true); }
    divEl.append(radioB);
    buttonDiv.append(divEl);
  }
}

InputManager.changeColoration=function(colorIndex)
{
    switch (colorIndex)
    {
        case 0:
            w1.coloration=color(0,255,0);
            w2.coloration=color(255,255,0);
            w1.pulseColoration=color(0,255,0);
            break;

        case 1:
            w1.coloration=color(0,127,255);
            w2.coloration=color(0,255,255);
            w1.pulseColoration=color(0,255,127);
            break;
        
        case 2:
            w1.coloration=color(0,255,127);
            w2.coloration=color(255,0,255);
            w1.pulseColoration=color(0,127,255);
            break;
    }
}
