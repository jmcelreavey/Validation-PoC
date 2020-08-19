import { postGetAllAction } from "./controller/PostGetAllAction";
import { postGetByIdAction } from "./controller/PostGetByIdAction";
import { postSaveAction } from "./controller/PostSaveAction";
import * as Joiful from "joiful";
import { Post } from "./entity/Post";

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: "/posts",
    method: "get",
    action: postGetAllAction,
  },
  {
    path: "/posts/:id",
    method: "get",
    action: postGetByIdAction,
  },
  {
    path: "/posts",
    method: "post",
    action: postSaveAction,
    schema: Joiful.getSchema(Post),
  },
];
