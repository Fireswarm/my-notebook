import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PostEntry } from '../post-entry';


@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent {
  @Input() entry!:PostEntry
}
