import { TweetType } from "../TweetType/typeTweet";

export interface CreateTweetDTO {
  content: string;
  tweetType: TweetType | any
  userId: string;
}

export interface UpdateTweetDTO {
  id: string;
  content: string;
}

export interface LikeTweetDTO {
  tweetId: string;
  userId: string;
}
