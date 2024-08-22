import { joinPathFragments } from '@nx/devkit';
import { mkdirSync } from 'fs';

export function createFolder(name: string, path: string) {
  const newPath = joinPathFragments(process.cwd(), name);
  mkdirSync(`${newPath}/src/${path}`, { recursive: true });
}
