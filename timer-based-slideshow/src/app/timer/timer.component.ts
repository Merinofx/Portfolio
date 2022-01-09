import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  private subscription: Subscription;
  public timerDate: Date;
  public timeDifference: number;
  public chart = "bar";
  public charts = ["bar", "line"];
  public isPause = true;
  milliSecondsInASecond = 1000;
  SecondsInAMinute = 60;
  seconds: number = 0;


  constructor() { }

  addTime = (miliSeconds: number) => {
    let newDate = new Date();
    this.timerDate = new Date();
    this.timerDate.setTime(newDate.getTime() + miliSeconds);
  }

  getTimeDifference() {
    this.seconds = this.timerDate.getTime() - new Date().getTime();
    this.timeDifference = Math.floor((this.seconds) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
  }

  onStart = () => {
    this.isPause = false;
    this.addTime(16000);
  }

  onPause = () => {

    if (this.isPause) {
      this.isPause = false;
      this.addTime(this.seconds);
    }
    else {
      this.isPause = true;
      this.getTimeDifference();
    }

  }

  rotateChart = () => {

    let chartIndex = this.charts.indexOf(this.chart);
    if (chartIndex + 1 >= this.charts.length) {
      this.chart = this.charts[0];
    }
    else {
      this.chart = this.charts[chartIndex + 1]
    }
  }

  ngOnInit(): void {
    this.subscription = interval(200)
      .subscribe(x => {
        if (!this.isPause) {
          this.getTimeDifference();
          if (this.timeDifference <= 0) {
            this.addTime(16000);
            this.rotateChart();
          }
        }
      });
  }
}
