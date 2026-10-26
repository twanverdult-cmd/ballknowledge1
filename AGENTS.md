<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use shared pixel pitch/sprite graphics and semantic CSS tokens throughout the game so every game state belongs to the same football-field scene.
- Keep player archive membership browser-local with source attribution; merge archived names with curated rarity estimates and reject ambiguous surname-only answers.
- Select matches through a session-local shuffled question deck, consuming unseen questions first and excluding the previous match on refill, so replay does not just reshuffle the same questions.
- Unknown answers fall back to an AI rarity check via a server function (src/lib/ai-rarity.functions.ts) so the API key stays server-side.
