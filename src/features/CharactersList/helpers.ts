export const getId = (url: string) => {
  return url.match(/(\d)+\/$/)![0].replace('/', '');
}
