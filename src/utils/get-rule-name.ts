import { basename } from 'path'

export const getRuleName = (filename: string) => basename(filename, '.ts')
