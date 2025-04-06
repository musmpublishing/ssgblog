import { inject, Injectable, Injector } from "@angular/core";
import { collection, doc, Firestore, setDoc } from "@angular/fire/firestore";
import { runAsyncInInjectionContext } from "../../functions/runAsyncInInjectionContext.function";
import { Post } from "../../shared/_models";
import { Collections } from "../../shared/_enums";

@Injectable()
export class AdminApiService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);
  private postCollection = collection(this.firestore, Collections.POST);

  async addPost(post: Post): Promise<void> {
    return runAsyncInInjectionContext(this.injector, async () => {
      return await setDoc(doc(this.postCollection), post);
    });
  }
}
