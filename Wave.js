class Wave
{
  constructor(positionPoint,coloration)
  {

    this.position=positionPoint;
    this.velocity=0;
    this.stepPerFrame=this.velocity*(1.0/World.idealFPS);
    this.period=1;
    this.coloration=coloration;
    this.pulseColoration=color(0,255,0);
    if (this.coloration==undefined){this.coloration=color(255,255,255);}

    this.pulsing=false;
    this.pulsingTimer=0;
    this.pulses=[];
    this.toReset=false;
    this.mach=0;
  }

  draw()
  {
    stroke(this.coloration);
    fill(this.coloration);
    circle(this.position.x,this.position.y,5);

    noFill();
    for(let p=this.pulses.length-1;p>=0;p--)
    {
      this.pulses[p].updateAndDraw();
      if (this.pulses[p].alpha<=0)
      {
        this.pulses.splice(p,1);
      }
    }
  }

  update()
  {
    this.period=(1.0/(5*abs(this.velocity)))*340*World.meter;
    if (this.period>1)
    {this.period=1;}
    this.position.x+=this.velocity*World.deltaT;
    //this.position.x+=this.stepPerFrame;
    
    if (this.position.x>width && this.velocity>0)
    {
      if (this.pulsing==true)
      {
        this.toReset=true;
        InputManager.changePulseState();
      }
      else
      {
        if (this.toReset)
        {
          if (this.pulses.length==0)
          {
            this.position.x=0;
            InputManager.changePulseState();
            this.toReset=false;
          }
        }
        else
        {
          if (this.pulses.length==0)
          {
            this.position.x=0;
          }
        }
      }
    }
    else if (this.position.x<0 && this.velocity<0)
    {
      if (this.pulsing==true)
      {
        this.toReset=true;
        InputManager.changePulseState();
      }
      else
      {
        if (this.toReset)
        {
          if (this.pulses.length==0)
          {
            this.position.x=width;
            InputManager.changePulseState();
            this.toReset=false;
          }
        }
        else
        {
          if (this.pulses.length==0)
          {
            this.position.x=width;
          }
        }
      }
    }

    if (this.pulsing)
    {
      this.pulsingTimer+=World.deltaT;
      if (this.pulsingTimer>=this.period)
      {
        this.pulses.push(new Pulse(this.position.copy(),this.pulseColoration));
        this.pulsingTimer=0;
      }
    }
  }

  getFP(waveObject) // Funziona solo con velocità subsoniche
  {

    let pf=0;
    if (waveObject.pulses.length>0)
    {
      if (abs(waveObject.velocity)<World.propagationalSpeed)
        {
          if ( (this.position.x>=waveObject.pulses[0].position.x && this.position.x<=( waveObject.pulses[0].position.x+waveObject.pulses[0].r)) || ((this.position.x<=waveObject.pulses[0].position.x && this.position.x>=( waveObject.pulses[0].position.x-waveObject.pulses[0].r))))
          {
              if (this.position.x>=waveObject.position.x) //osservatore a destra della sorgente
              {
                if(this.velocity<=0 && waveObject.velocity>=0) //si avvicinano
                {
                  pf=( (World.propagationalSpeed + abs(this.velocity)) / (World.propagationalSpeed - abs(waveObject.velocity)) )
                }

                else if(this.velocity<=0 && waveObject.velocity<=0) //ricevitore avvicina, sorgente allontana
                {
                  pf=( (World.propagationalSpeed + abs(this.velocity)) / (World.propagationalSpeed + abs(waveObject.velocity)) )
                }
                else if(this.velocity>=0 && waveObject.velocity<=0) //si allontanano
                {
                  pf=( (World.propagationalSpeed - abs(this.velocity)) / (World.propagationalSpeed + abs(waveObject.velocity)) )
                }
                else if(this.velocity>=0 && waveObject.velocity>=0) //ricevitore si allontana, sorgente si avvicina
                {
                  pf=( (World.propagationalSpeed - abs(this.velocity)) / (World.propagationalSpeed - abs(waveObject.velocity)) )
                }
              }


              else //osservatore a sinistra della sorgente
              {
                if(this.velocity>=0 && waveObject.velocity<=0) //si avvicinano
                {
                  pf=( (World.propagationalSpeed + abs(this.velocity)) / (World.propagationalSpeed - abs(waveObject.velocity)) )
                }

                else if(this.velocity>=0 && waveObject.velocity>=0) //ricevitore avvicina, sorgente allontana
                {
                  pf=( (World.propagationalSpeed + abs(this.velocity)) / (World.propagationalSpeed + abs(waveObject.velocity)) )
                }
                else if(this.velocity<=0 && waveObject.velocity>=0) //si allontanano
                {
                  pf=( (World.propagationalSpeed - abs(this.velocity)) / (World.propagationalSpeed + abs(waveObject.velocity)) )
                }
                else if(this.velocity<=0 && waveObject.velocity<=0) //ricevitore si allontana, sorgente si avvicina
                {
                  pf=( (World.propagationalSpeed - abs(this.velocity)) / (World.propagationalSpeed - abs(waveObject.velocity)) )
                }
              }
            InputManager.printFp("f'="+pf.toFixed(2)+"f");
          }
        }
      else
      {
        waveObject.mach=abs(waveObject.velocity)/World.propagationalSpeed;
        InputManager.printFp("Mach="+waveObject.mach.toFixed(2));
      }
    }
    else
    {
      InputManager.printFp("-");
    }
  }
}

class Pulse
{
  constructor(positionPoint,coloration)
  {
    this.position=positionPoint;
    this.r=0;
    this.lifeTime=0;
    this.alpha=255;
    this.coloration=coloration;
  }
  updateAndDraw() // Per risparmiare un ciclo for
  {
    if (this.lifeTime>=5)
    {
      this.alpha-=1;
    }
    this.coloration.setAlpha(this.alpha);
    stroke(this.coloration);
    this.r+=World.propagationalSpeed*World.deltaT;
    circle(this.position.x,this.position.y,this.r*2);
    this.lifeTime+=World.deltaT;
  }

}
