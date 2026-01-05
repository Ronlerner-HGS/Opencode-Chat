#!/usr/bin/env bun
/**
 * Download embedding model for semantic search.
 * Usage: bunx --bun @howaboua/opencode-chat opencode-chat-download-model
 * Run from your project root directory.
 */
import * as path from "path"
import * as fs from "fs/promises"
import { EmbeddingModel, ExecutionProvider, FlagEmbedding } from "fastembed"

const MODEL_DIRNAME = "models"

async function main() {
  const worktree = path.resolve(process.cwd())
  const cacheDir = path.join(worktree, ".opencode", "chat", MODEL_DIRNAME)

  console.log(`[model] worktree: ${worktree}`)
  console.log(`[model] cache dir: ${cacheDir}`)
  console.log(`[model] downloading AllMiniLML6V2...`)

  await fs.mkdir(cacheDir, { recursive: true })

  await FlagEmbedding.init({
    model: EmbeddingModel.AllMiniLML6V2,
    executionProviders: [ExecutionProvider.CPU],
    cacheDir,
    showDownloadProgress: true,
  })

  console.log(`[model] download complete!`)
}

await main()
