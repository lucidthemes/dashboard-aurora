import type { BlockSupports } from '../blocks/block.schema';

export function hasBlockSupport<K extends keyof BlockSupports>(
  supports: Partial<BlockSupports>,
  key: K,
): supports is Partial<BlockSupports> & Record<K, unknown> {
  return key in supports;
}

export function hasBlockAttribute<T extends object, K extends PropertyKey>(
  attributes: T | undefined,
  key: K,
): attributes is T & Record<K, unknown> {
  return !!attributes && key in attributes;
}
