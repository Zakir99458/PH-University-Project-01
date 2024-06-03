export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type TAcademicSmesterName = 'Autumn' | 'Summer' | 'Fall'
export type TAcademicSmesterCode = '01' | '02' | '03'

export type TAcademicSemester = {
  name: TAcademicSmesterName
  code: TAcademicSmesterCode
  year: string
  startMonth: TMonths
  endMonth: TMonths
}
