export const requiredField = (value: string) => {
   if (value) return undefined
   return 'Field is required'
}

export const maxlengthCreator = (maxLength: number) => (value: string) => {
   if (value.length > maxLength) return `Max length is ${maxLength} symbols`
   return undefined
}
