import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Post } from "../entity/Post";
import { validate } from "class-validator";

/**
 * Saves given post.
 */
export async function postSaveAction(request: Request, response: Response) {
  // get a post repository to perform operations with post
  const postRepository = getManager().getRepository(Post);

  // create a real post object from post json object sent over http
  const newPost = postRepository.create(request.body);

  validate(newPost).then((errors) => {
    // errors is an array of validation errors
    if (errors.length > 0) {
      response.status(422).json({ validationErrors: errors });
      return;
    }
  });

  // save received post
  await postRepository.save(newPost);

  // return saved post back
  response.send(newPost);
}
