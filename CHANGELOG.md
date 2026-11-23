# Changelog

What changed in WittyEbook, newest first. What changed before it had a repository of its own is in the
[WittyMediaServer changelog](https://github.com/wittywilla/WittyMediaServer/blob/master/CHANGELOG.md).

## 0.4.3

- **Back on any TV remote closes the book** (or the open panel first). Some remotes' Back button did nothing in the reader. Back no longer also leaves the page before it, as it could with some remotes.

## Developer notes for 0.4.3

- Back keys (`preventDefault`, so the browser does not go back as well): `Escape`, `GoBack`, `BrowserBack`, `Back` and `XF86Back`, as WittyPlay and the server's player take them.

## 0.4.2

- The README's pictures are retaken from WittyMediaServer 0.8.0-alpha.

## 0.4.1

- The first release on module API 5. The tag v0.4.0 was made before these build changes and was never published.


- Built on WittyModule 0.5.4 and module API 5: its workflows and SDUI kit are WittyModule 0.5.4's.
- **WittyEbook 0.4.0: module API 5.** `integration.json` claims the `epub` format with the readers hook (`web.readers`), and the bundle exports `register(host)`, which hands the app the reader for it (`{ readers: { epub: … } }`). The app finds a reader by what the modules in use claim, loading WittyInk first; it no longer keeps a map of formats to readers of its own. The default export stays, for apps that embed the reader (WittyReader).
- Built with WittyModule's one builder (`kit/web/build-bundle.mjs`, Vite 8); this repository's own copy of the builder is gone. `npm test` checks that `register` hands over exactly the formats `integration.json` claims.
- **Settings in every app's Settings, under Modules** (`sdui.json`, each profile's own): layout, page colour, font, text size, line spacing, margins, justifying, brightness, warmth and the read-aloud speed. A book opens with them on every device, and changes made while reading are saved to them. The reading surface itself stays in the reader.
- A chapter that can't be loaded and a search that fails are now reported to the host's log (`host.report`), once each rather than on every retry.
- **Module API 4**, for WittyMediaServer 0.8.0-alpha and later: the module carries its own server-driven UI in `sdui.json`, which `wittymodule pack` puts in every archive.
- Carries `sdui.json` with its theme scope, so an administrator can give the EPUB reader colours of its own. Its pages come with WittyInk, which every reader shares.
- **WittyEbook 0.3.0:** Fits WittyMediaServer 0.8.x.

- Module API 3 and WittyMediaServer 0.6.0-alpha: this is how a server gets it now, with no copy compiled in.
- WittyEbook is now a project of its own, developed and released from this repository.
