import { Denops } from "https://deno.land/x/denops_std@v1.0.0/mod.ts";
import { execute } from "https://deno.land/x/denops_std@v1.0.0/helper/mod.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async memo(): Promise<void> {
      denops.cmd(
        "call nvim_open_win(bufnr(''), v:true, {'relative': 'cursor', 'height': 20, 'width': 100, 'row': 1, 'col': 1})"
      );
      denops.cmd("e ~/.local/share/nvim/memo/memo.md");
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      const YYYYMMDD = year + "-" + month + "-" + date;
      denops.cmd("silent! normal! Go" + YYYYMMDD);
      denops.cmd("silent! normal! o");
      denops.cmd("silent! startinsert");
    },
  };
  await execute(
    denops,
    `command! Qmemo call denops#request('dqm', 'memo', [])`
  );
}
