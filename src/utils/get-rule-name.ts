import { parse } from 'path'

export const getRuleName = (filename: string) => parse(filename).name
