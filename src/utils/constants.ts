const RESULTPERPAGE = 10
const titleOptions = ['mr', 'mrs', 'miss', 'ms'] as const
const titleOptionsType = ['Mr', 'Mrs', 'Miss', 'Ms', ...titleOptions] as const

export { RESULTPERPAGE, titleOptions, titleOptionsType }
