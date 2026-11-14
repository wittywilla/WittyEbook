// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 WittyWilla and contributors
// The readers hook, checked without a browser: register() hands over a reader for exactly the
// formats integration.json claims (web.readers), and nothing else. Builds register.ts with Vite,
// with a stand-in for the reader itself, so neither React nor WittyInk is needed.
import { readFileSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { build } from 'vite'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const integration = JSON.parse(readFileSync(join(root, 'integration.json'), 'utf8'))
const manifest = JSON.parse(readFileSync(join(root, 'module.json'), 'utf8'))

test('integration.json is this module of API 5', () => {
  assert.equal(integration.module, manifest.id)
  assert.equal(manifest.api, 5)
})

test('register() hands over a reader for each format integration.json claims', async () => {
  const outDir = join(root, '.test-web.tmp')
  const stub = { name: 'stub-reader', enforce: 'pre',
    resolveId: (id) => (id === './EpubReader' ? '\0reader' : null),
    load: (id) => (id === '\0reader' ? 'export default function Reader() { return null }' : null) }
  await build({ configFile: false, logLevel: 'silent', publicDir: false, plugins: [stub],
    build: { outDir, emptyOutDir: true, minify: false, lib: { entry: join(root, 'register.ts'), formats: ['es'], fileName: () => 'register.mjs' } } })
  try {
    const { register } = await import(pathToFileURL(join(outDir, 'register.mjs')).href)
    const r = register({})
    assert.deepEqual(Object.keys(r).sort(), ['readers'])
    assert.deepEqual(Object.keys(r.readers).sort(), integration.web.readers.map((x) => x.format).sort())
    for (const c of Object.values(r.readers)) assert.equal(typeof c, 'function')
  } finally {
    rmSync(outDir, { recursive: true, force: true })
  }
})
