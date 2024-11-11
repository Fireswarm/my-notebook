import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DateLog } from '../date-log';
import { EntryComponent } from '../entry/entry.component';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule, EntryComponent],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent {
  @Input() dateLog!:DateLog
}