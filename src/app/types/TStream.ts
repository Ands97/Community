import fs from 'fs';

export type TStream = {
    start: number,
    end: number,
    chunkSize: number,
    file: fs.ReadStream
}