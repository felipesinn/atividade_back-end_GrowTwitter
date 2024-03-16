export class Follower {
  id: string;
  userId: string;

  constructor(
      private _id: string,
      private _userId: string
  ) {
      this.id = _id;
      this.userId = _userId;
  }
}
