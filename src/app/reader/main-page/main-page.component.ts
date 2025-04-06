import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ReaderApiService } from "../_services/reader-api.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-main-page",
  imports: [CommonModule, RouterModule],
  providers: [ReaderApiService],
  templateUrl: "./main-page.component.html",
  styleUrl: "./main-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {}
