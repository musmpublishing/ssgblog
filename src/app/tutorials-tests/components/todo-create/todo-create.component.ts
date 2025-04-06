import { Component, Inject, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import { TodoApiService } from "../../services/todo-api.service";
import { Todo } from "../../models/todo.model";

@Component({
  selector: "app-todo-create",
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "./todo-create.component.html",
  styleUrl: "./todo-create.component.scss",
})
export class TodoCreateComponent {
  // private apiService = inject(TodoApiService);
  private bottomSheetRef = inject(MatBottomSheetRef<TodoCreateComponent>);

  todoForm!: FormGroup;
  todoId: string | undefined = undefined;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Todo,
    private apiService: TodoApiService
  ) {
    console.log("DATA ===>", data);
    this.todoId = data.id;
    this.initForm(data);
  }

  private initForm(data: Todo) {
    this.todoForm = new FormGroup({
      title: new FormControl(data.title ?? "", [Validators.required]),
      dueDate: new FormControl(data.dueDate ?? new Date(), [
        Validators.required,
      ]),
      priority: new FormControl(data.priority ?? "High", [Validators.required]),
    });
  }

  async onSubmit() {
    if (this.todoForm.invalid) return;
    await this.apiService.saveTodo(this.todoId, this.todoForm.value);
    this.bottomSheetRef.dismiss();
  }
}
