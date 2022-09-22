import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input() timeleft={ 
    "days":0,
    "hours":0,
    "minutes":0,
    "secondes":0
}
date=new Date().getTime()
@Output() returnit=new EventEmitter();
  a=true
  op=1
  constructor() { }

  ngOnInit(): void {
   
  }
  close(){
    this.returnit.emit([this.a,this.op])
  }
  
}
