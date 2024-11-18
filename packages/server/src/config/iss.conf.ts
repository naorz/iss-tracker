const { ISS_USE_API } = process.env
export const issIntervalUpdatesSec:number = 15
export const issApiUrl:string = 'http://api.open-notify.org/iss-now.json'
export const issUseAPI:boolean = typeof ISS_USE_API !== 'undefined' ? Boolean(ISS_USE_API) : true
