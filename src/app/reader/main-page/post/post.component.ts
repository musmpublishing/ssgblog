import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  Input,
  OnInit,
  runInInjectionContext,
  Signal,
} from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../../shared/_models";
import { ReaderApiService } from "../../_services/reader-api.service";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { CommentsComponent } from "../comments/comments.component";
import { AddCommentComponent } from "../add-comment/add-comment.component";

@Component({
  selector: "app-post",
  imports: [CommonModule, CommentsComponent, AddCommentComponent],
  providers: [ReaderApiService],
  templateUrl: "./post.component.html",
  styleUrl: "./post.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  @Input()
  id!: string;

  apiService = inject(ReaderApiService);
  injector = inject(Injector);

  post$!: Observable<Post | null>;
  comments$!: Signal<Comment[] | undefined>;

  ngOnInit(): void {
    this.post$ = runInInjectionContext(this.injector, () => {
      return this.apiService.getPostById(this.id);
    });
    this.comments$ = runInInjectionContext(this.injector, () => {
      return toSignal(this.apiService.getComments(this.id));
    });
  }
}
