import { Routes } from "@angular/router";
import { MainPageComponent } from "./main-page/main-page.component";
import { PostComponent } from "./main-page/post/post.component";
import { PostsListComponent } from "./main-page/posts-list/posts-list.component";

export const readerRoutes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    children: [
      {
        path: "posts",
        component: PostsListComponent,
      },
      {
        path: "posts/:id",
        component: PostComponent,
      },
    ],
  },
];
