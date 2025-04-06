import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ReaderApiService } from "../../_services/reader-api.service";

@Component({
  selector: "app-add-comment",
  imports: [ReactiveFormsModule],
  templateUrl: "./add-comment.component.html",
  styleUrl: "./add-comment.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCommentComponent {
  apiService = inject(ReaderApiService);
  fb = inject(FormBuilder);

  @Input()
  postId!: string;

  commentForm!: FormGroup;

  constructor() {
    this.commentForm = this.fb.group({
      content: ["", [Validators.required]],
    });
  }

  onSubmit() {
    if (this.commentForm.valid) {
      console.log(this.commentForm.value);
      this.apiService.addComment(this.postId, this.commentForm.value);
    }
  }
}
