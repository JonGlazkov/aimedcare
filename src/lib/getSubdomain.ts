export function getSubdomain(domain: string): string {
  return domain
    .toLocaleLowerCase()
    .replace(/\s+/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}
