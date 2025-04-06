import { inject } from "@angular/core";
import { RenderMode, ServerRoute } from "@angular/ssr";
import { ReaderApiService } from "./reader/_services/reader-api.service";
import { Post } from "./shared/_models";
import { firstValueFrom, map } from "rxjs";

export const serverRoutes: ServerRoute[] = [
  {
    path: "posts/:id",
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const apiService = inject(ReaderApiService);
      const posts$ = apiService.posts$.pipe(
        map((posts: Post[]) => posts.map((post: Post) => ({ id: post.id })))
      );
      const posts = await firstValueFrom(posts$);
      return posts.map((post) => ({ id: post.id?.toString() ?? "" }));
    },
  },
  {
    path: "**",
    renderMode: RenderMode.Prerender,
  },
];
