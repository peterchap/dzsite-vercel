import type { DefineSchemaBase } from "sanity";
import type { SchemaTypeDefinition } from "sanity";
import { schemaTypes } from "./schemaTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};

