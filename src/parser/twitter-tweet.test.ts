import { assertEquals } from "../deps.ts";
import { parser } from "./twitter-tweet.ts";

Deno.test("Twitter tweet", () => {
  ([
    [
      `SnO2WMaN on Twitter: "さあ飲め好きだろ野菜ジュース" / Twitter`,
      { displayName: "SnO2WMaN", tweet: "さあ飲め好きだろ野菜ジュース" },
    ],
  ] as const)
    .forEach(([title, expected]) => {
      assertEquals(parser(title), expected);
    });
});
