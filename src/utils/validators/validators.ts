export type RequiredMaxLengthFieldType = {
   values: any
   maxLength: number
}

export const requiredMaxLengthField = ({ values, maxLength }: RequiredMaxLengthFieldType) => {
   const keys = Object.keys(values)
   const errors: any = {}
   for (let i = 0; i < keys.length; i++) {
      if (!values[keys[i]]) {
         errors[keys[i]] = 'Field is required'
      } else if (values[keys[i]].length > maxLength) {
         errors[keys[i]] = `Max length is ${maxLength} symbols`
      }
   }
   return errors
}
