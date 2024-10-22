export const validUS5DigitsZipCodeRegExp = /^(\d{5})?$/

export const deviceReleaseYears: Record<string, number> = {
  // iPhones
  iphone: 2007,
  'iphone 3g': 2008,
  'iphone 3gs': 2009,
  'iphone 4': 2010,
  'iphone 4s': 2011,
  'iphone 5': 2012,
  'iphone 5s': 2013,
  'iphone 6': 2014,
  'iphone 6s': 2015,
  'iphone 7': 2016,
  'iphone 8': 2017,
  'iphone x': 2017,
  'iphone 11': 2019,
  'iphone 12': 2020,
  'iphone 13': 2021,
  'iphone 14': 2022,

  // iPads
  ipad: 2010,

  // Samsung Galaxy series
  'samsung galaxy s': 2010,
  'samsung galaxy s2': 2011,
  'samsung galaxy s3': 2012,
  'samsung galaxy s4': 2013,
  'samsung galaxy s5': 2014,
  'samsung galaxy s6': 2015,
  'samsung galaxy s7': 2016,
  'samsung galaxy s8': 2017,
  'samsung galaxy s9': 2018,
  'samsung galaxy s10': 2019,
  'samsung galaxy s20': 2020,
  'samsung galaxy s21': 2021,

  // Additional Samsung devices
  'samsung galaxy note': 2011,
  'samsung galaxy note 2': 2012,
  'samsung galaxy note 3': 2013,
  'samsung galaxy note 4': 2014,
  'samsung galaxy note 5': 2015,
  'samsung galaxy note 8': 2017,
  'samsung galaxy note 9': 2018,
  'samsung galaxy note 10': 2019,

  // Other Android devices
  pixel: 2016,
  'huawei p': 2016,
  xiaomi: 2018,
  oneplus: 2017,

  // Default for unknown Android devices
  android: 2010 // Assuming a base year for Android
}
