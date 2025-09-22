export function encodeState(obj: unknown){
  const json = JSON.stringify(obj)
  const b64 = btoa(unescape(encodeURIComponent(json)))
  return b64
}
export function decodeState(b64: string){
  const json = decodeURIComponent(escape(atob(b64)))
  return JSON.parse(json)
}
