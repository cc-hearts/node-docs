import { fileURLToPath } from "url";
import { resolve } from "path";
import { isDirectory } from "./valid";
import { existsSync } from "fs";

/**
 * used in the alias of vite's configuration file etc.
 *
 * @param {string} url is import.meta.url
 * @returns {string}
 */
export function resolveCurrentPath(url: string): string {
  return resolve(fileURLToPath(url), '..');
}


/**
 * Join the current working directory with the provided path arguments.
 *
 * @param {...string[]} args - The path arguments to join with the current working directory.
 * @return {string} - The joined path.
 */
export function cwdJoin(...args: string[]) {
  return resolve(process.cwd(), ...args)
}


/**
 * Step up to find the most recent file
 *
 * @param path
 * @returns
 */
export async function findUpFile(path: string, fileName: string) {
  if (fileName === void 0) {
    throw new Error('fileName is required')
  }
  let curPath: string
  if (await isDirectory(path)) {
    curPath = resolve(path, 'package.json')
  } else {
    curPath = resolve(path, '../package.json')
  }
  if (existsSync(curPath)) {
    return curPath
  }
  if (path === '/') return null
  return findUpFile(resolve(path, '..'), fileName)
}


export async function findUpPkg(path: string) {
  return  findUpFile(path, 'package.json')
}
