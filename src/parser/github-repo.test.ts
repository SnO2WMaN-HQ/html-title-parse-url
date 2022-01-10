import { assertEquals } from "../deps.ts";
import { parser } from "./github-repo.ts";

Deno.test("GitHub repo", () => {
  ([
    [
      `SnO2WMaN/dotfiles: M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ`,
      {
        userLogin: "SnO2WMaN",
        repositoryName: "dotfiles",
        repositoryDescription: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
      },
    ],
  ] as const)
    .forEach(([title, expected]) => {
      assertEquals(parser(title), expected);
    });
});
