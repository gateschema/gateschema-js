import { $SchemaCallback } from '../interface/index';
export default function $schema(path: string, rootData: {
    [key: string]: any;
} | $SchemaCallback, cb: $SchemaCallback): void;
