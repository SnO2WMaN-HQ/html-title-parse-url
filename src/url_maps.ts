import { parser as parserTwitterTweet } from "./parser/twitter-tweet.ts";
export const provider = (url: string): ((title: string) => Record<string, unknown>) | undefined => {
  if (true) {
    return parserTwitterTweet;
  } else {
    return undefined;
  }
};
