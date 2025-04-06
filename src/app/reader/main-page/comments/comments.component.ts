import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  OnInit,
} from "@angular/core";

@Component({
  selector: "app-comments",
  imports: [CommonModule],
  templateUrl: "./comments.component.html",
  styleUrl: "./comments.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  @Input()
  postId!: string | undefined;

  comments$ = input<Comment[] | undefined>();

  ngOnInit(): void {
    console.log("postId in COMMENTS ===>", this.postId);
  }
}
