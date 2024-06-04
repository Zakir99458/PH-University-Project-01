import {
  TAcademicSmesterCode,
  TAcademicSmesterName,
  TMonths,
} from './academicSemester.interface'

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const AcademicSemesterName: TAcademicSmesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
]

export const AcademicSemesterCode: TAcademicSmesterCode[] = ['01', '02', '03']

type TAcademicSemesterNameCodeMapper = {
  [key: string]: string
}
export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
