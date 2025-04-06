import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-reader",
  imports: [],
  templateUrl: "./reader.component.html",
  styleUrl: "./reader.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReaderComponent {}
