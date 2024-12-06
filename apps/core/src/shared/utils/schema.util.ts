// type DefaultKeys = 'id' | 'created' | 'modified' | 'deleted'
type DefaultKeys = 'id'
const defaultProjectKeys = ['id', 'created', 'modified', 'deleted'] as const

type Projection<K extends string | number | symbol> = {
  [P in K]: true
}

export function createProjectionOmit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
  withDefaults: true,
): Projection<K | DefaultKeys>
export function createProjectionOmit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Projection<K>

export function createProjectionOmit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
  withDefaults: boolean = false,
): any {
  const projection: Partial<Projection<K | DefaultKeys>> = {}

  // Add default keys if withDefaults is true
  if (withDefaults) {
    defaultProjectKeys.forEach((key) => {
      projection[key] = true
    })
  }

  // Add specified keys
  for (const key of keys) {
    projection[key] = true
  }

  // @ts-ignore
  projection.keys = [...keys, ...(withDefaults ? defaultProjectKeys : [])]
  return projection as any
}

export const getProjectionKeys = (projection: Projection<any>): string[] => {
  // @ts-expect-error
  return projection.keys
}
