import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Post } from "../entity/Post";
import { ObjectSchema } from "@hapi/joi";

/**
 * Saves given post.
 */
export async function postSaveAction(
  request: Request,
  response: Response,
  schema: ObjectSchema
) {
  const { error } = schema.validate(request.body, { abortEarly: false }); // Finds the validation errors in this request and wraps them in an object with handy functions

  if (error) {
    response.status(422).json({ errors: error.details });
    return;
  }

  // get a post repository to perform operations with post
  const postRepository = getManager().getRepository(Post);

  // create a real post object from post json object sent over http
  const newPost = postRepository.create(request.body);

  // save received post
  await postRepository.save(newPost);

  // return saved post back
  response.send(newPost);
}
