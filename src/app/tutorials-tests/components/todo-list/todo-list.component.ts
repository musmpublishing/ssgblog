import { Component, inject, OnInit } from "@angular/core";
import { Todo } from "../../models/todo.model";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from "@angular/material/bottom-sheet";
import { TodoCreateComponent } from "../todo-create/todo-create.component";
import { TodoApiService } from "../../services/todo-api.service";
import { Observable } from "rxjs";
import { Blog } from "../../shared/_models";

@Component({
  selector: "app-todo-list",
  imports: [CommonModule, MatIconModule, MatButtonModule, MatBottomSheetModule],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
})
export class TodoListComponent {
  private apiService = inject(TodoApiService);
  private _bottomSheet = inject(MatBottomSheet);

  todos$: Observable<Todo[]> = this.apiService.todos$;

  addOrEditTodo(event?: MouseEvent, todo?: Todo) {
    if (!!event) event.stopPropagation();
    const data = todo ?? {
      id: undefined,
      title: "",
      dueDate: new Date(),
      priority: "High",
    };
    this._bottomSheet.open(TodoCreateComponent, { data: data });
  }

  changeCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.apiService.updateTodo(todo.id as string, todo);
  }
  markAsIncomplete(todo: Todo) {
    todo.completed = false;
  }
  deleteTodo(event: MouseEvent, todo: Todo) {
    event.stopPropagation();
    this.apiService.deleteTodo(todo.id as string);
  }
}
