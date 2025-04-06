import { inject, Injectable, Injector } from "@angular/core";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
  Timestamp,
  updateDoc,
} from "@angular/fire/firestore";
import { Todo } from "../models/todo.model";
import { map, Observable } from "rxjs";
import { runAsyncInInjectionContext } from "../../functions/runAsyncInInjectionContext.function";

@Injectable({ providedIn: "root" })
export class TodoApiService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  private collectionName = "todos";
  private todoCollection = collection(this.firestore, this.collectionName);

  todos$: Observable<Todo[]> = collectionData(this.todoCollection, {
    idField: "id",
  }).pipe(
    map((todos) =>
      todos.map((todo: any) => {
        if (todo.dueDate instanceof Timestamp) {
          return { ...todo, dueDate: todo.dueDate.toDate() };
        }
        return todo;
      })
    )
  );

  gettODOById(id: string): Observable<Todo> {
    const todoDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(todoDoc, { idField: "id" }) as Observable<Todo>;
  }

  async saveTodo(id: string | undefined, todo: Todo): Promise<void> {
    if (!!id) {
      return this.updateTodo(id, todo);
    } else {
      await this.createTodo(todo);
    }
  }

  async createTodo(todo: Todo): Promise<DocumentReference<DocumentData>> {
    return runAsyncInInjectionContext(this.injector, async () => {
      return await addDoc(this.todoCollection, todo);
    });
  }

  async updateTodo(id: string, todo: Todo): Promise<void> {
    return runAsyncInInjectionContext(this.injector, async () => {
      const todoDoc = doc(this.firestore, `${this.collectionName}/${id}`);
      await updateDoc(todoDoc, todo as any);
    });
  }

  async deleteTodo(id: string): Promise<void> {
    return runAsyncInInjectionContext(this.injector, async () => {
      const todoDoc = doc(this.firestore, `${this.collectionName}/${id}`);
      await deleteDoc(todoDoc);
    });
  }
}
