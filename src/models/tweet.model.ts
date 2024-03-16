import { randomUUID } from "crypto";

export type TweetType = 'Tweet' | 'Retweet';

export class Tweet {
    private _id: string;
    private _content: string;
    private _tweetType: TweetType;
    private _userId: string;

    constructor(content: string, tweetType: TweetType, userId: string) {
        this._id = randomUUID();
        this._content = content;
        this._tweetType = tweetType;
        this._userId = userId;
    }

    get id(): string {
        return this._id;
    }

    get content(): string {
        return this._content;
    }

    get tweetType(): TweetType {
        return this._tweetType;
    }

    get userId(): string {
        return this._userId;
    }
}
