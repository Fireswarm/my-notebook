import { CommonModule } from '@angular/common';
import { afterRender, Component } from '@angular/core';
import { LogComponent } from "../log/log.component";
import { FormsModule } from '@angular/forms';
import { DateLog } from '../date-log';
import { PostEntry } from '../post-entry';
import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LogComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  previousLogs:DateLog[] = [];
  defaultValue: string = '';
  tempLogs:string = '';
  
  constructor(private localStorageService:LocalStorageService){}
  
  ngOnInit(): void{
    this.tempLogs = this.localStorageService.getItem("logs") || ''
    
    if(this.tempLogs != ''){
      var textLogs:DateLog[] = JSON.parse(this.tempLogs)
      textLogs.forEach(element => {
        element.date = new Date(element.date)
      });
      this.previousLogs = textLogs
    }
  }
  
  updateToday(text:string){
    if (text) {
      var today = new Date();
      var newEntry:PostEntry = {
        hours: today.getHours(),
        minutes: today.getMinutes(),
        entry: text,
        weather: 0
      };

      today.setHours(0, 0, 0, 0);
      var todayEntry = this.previousLogs.find((day)=>day.date.getTime() == today.getTime());

      if(todayEntry == null){
        var temp: PostEntry[] =[]
        todayEntry = {
          date: today,
          entries: temp
        }
        todayEntry.entries.push(newEntry);
        this.previousLogs.push(todayEntry);
      }
      else {
        todayEntry.entries.push(newEntry)
      }

      
      this.localStorageService.setItem("logs", JSON.stringify(this.previousLogs))
      this.defaultValue = ''
    }
    
  }
  clearStorage(){
    this.localStorageService.clear()
  }
}
