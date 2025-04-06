import { inject, Injectable, Injector } from "@angular/core";
import {
  collectionData,
  Firestore,
  doc,
  collection,
  docData,
  setDoc,
} from "@angular/fire/firestore";
import { map, Observable } from "rxjs";
import { Post } from "../../shared/_models";
import { Collections } from "../../shared/_enums";
import { runAsyncInInjectionContext } from "../../functions/runAsyncInInjectionContext.function";

@Injectable({ providedIn: "root" })
export class ReaderApiService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  private postCollection = collection(this.firestore, Collections.POST);

  posts$: Observable<Post[]> = collectionData(this.postCollection, {
    idField: "id",
  }) as Observable<Post[]>;

  // async getPostById(id: string): Promise<Blog | null> {
  //   return getDoc(
  //     doc(collection(this.firestore, `${this.collectionName}/${id}`))
  //   ).then((doc) => {
  //     if (doc.exists()) {
  //       return doc.data() as Blog;
  //     } else {
  //       return null;
  //     }
  //   });
  // }

  getPostById(id: string) {
    const docRef = doc(this.firestore, `${Collections.POST}/${id}`);
    return docData(docRef, { idField: "id" }).pipe(
      map((data) => (data ? (data as Post) : null))
    ) as Observable<Post>;
  }

  getComments(postId: string) {
    return collectionData(
      collection(
        this.firestore,
        `${Collections.POST}/${postId}/${Collections.COMMENT}`
      )
    ) as Observable<Comment[]>;
  }

  addComment(postId: string, comment: Comment): Promise<void> | void {
    console.log("postId in addComment ==>", postId);
    return runAsyncInInjectionContext(this.injector, async () => {
      const commentCollection = collection(
        this.firestore,
        `${Collections.POST}/${postId}/${Collections.COMMENT}`
      );

      return await setDoc(doc(commentCollection), comment);
    });
  }
}
