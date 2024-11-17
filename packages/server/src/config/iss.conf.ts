const { ISS_USE_API } = process.env
export const issIntervalUpdatesSec:number = 3
export const issApiUrl:string = 'http://api.open-notify.org/iss-now.json'
export const issUseAPI:boolean = false// && Boolean(ISS_USE_API) || true
