import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../../shared/_models";
import { ReaderApiService } from "../../_services/reader-api.service";
import { AsyncPipe } from "@angular/common";
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: "app-posts-list",
  imports: [AsyncPipe, RouterLink, RouterModule],
  templateUrl: "./posts-list.component.html",
  styleUrl: "./posts-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent {
  apiService = inject(ReaderApiService);
  posts$: Observable<Post[]> = this.apiService.posts$;
}
