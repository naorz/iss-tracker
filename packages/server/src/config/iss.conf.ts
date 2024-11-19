const { ISS_USE_MOCK } = process.env
export const issPollingIntervalSeconds:number = 15 // TODO: get as an env variable
export const issApiUrl:string = 'http://api.open-notify.org/iss-now.json'
export const issUseMock:boolean = typeof ISS_USE_MOCK !== 'undefined' ? Boolean(ISS_USE_MOCK) : false
