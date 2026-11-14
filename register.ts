// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 WittyWilla and contributors
//
// The reader in WittyMediaServer's web app (module API 5, the readers hook). integration.json says
// which kind of book this module reads (web.readers); the app finds the module that claims a
// book's format, loads WittyInk first (the reader kit every reader shares), then calls register
// and draws the component it hands over inside WittyInk's HostContext. The app keeps no map of
// formats to readers of its own.
import EpubReader from './EpubReader'

/** What register hands the app: the EPUB reader, by the format integration.json claims. */
export function register(_host?: unknown) {
  return { readers: { epub: EpubReader } }
}
