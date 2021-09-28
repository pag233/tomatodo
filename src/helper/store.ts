export function getItemById<T extends { id: number }>(items: T[], id: number): T {
  const result = items.find((item) => item.id === id)
  if (!result) throw new Error(`Object Array: ${items} contains no such object that hold given id: ${id}`)
  return result
}