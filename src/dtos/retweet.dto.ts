export interface CreateRetweetDTO {
    content: string;
    userId: string;
    tweetId: string;
    tweetType: string;
  }
  
  export interface UpdateRetweetDTO {
    id: string;
    content: string;
    userId: string;
    tweetId: string;
  }
  