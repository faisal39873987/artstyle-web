Place only public-domain, licensed, or owned ROM files approved for website playback in this folder.

`art-style-demo.nes` is generated from `tools/build-demo-rom.mjs`. Rebuild it with:

```sh
node tools/build-demo-rom.mjs
```

Browser emulators must fetch the ROM file in the user's browser. Anything placed here and linked from
`assets/js/data/emulator.js` can be downloaded by visitors, so do not place commercial or unreviewed
files here.

The official NES demo uses the lightweight `jsnes` canvas player. Other systems continue through
EmulatorJS unless their manifest entry sets another engine.

To publish a hosted game:

1. Add the approved ROM file to this folder.
2. Add a matching entry to `HOSTED_ROM_MANIFEST` in `assets/js/data/emulator.js`.
3. If the file is intentionally public, force-add it because this folder is ignored by default:
   `git add -f assets/playable-roms/<file>`
