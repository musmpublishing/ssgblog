import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AdminApiService } from "../../_services/admin-api.service";

@Component({
  selector: "app-add-post",
  imports: [ReactiveFormsModule],
  providers: [AdminApiService],
  templateUrl: "./add-post.component.html",
  styleUrl: "./add-post.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPostComponent {
  postForm: FormGroup;

  private fb = inject(FormBuilder);
  private apiService = inject(AdminApiService);

  constructor() {
    this.postForm = this.fb.group({
      title: ["", [Validators.required]],
      content: ["", [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.apiService.addPost(this.postForm.value);
    }
  }
}
