import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { TimerComponent } from './timer/timer.component';

const routes: Routes = [
  {path: 'barChart', component: BarChartComponent},
  {path: 'lineChart', component: LineChartComponent},
  {path: 'timer', component: TimerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
