import { create } from 'zustand'

import { discountSlice } from './discount'
import { userSlice } from './user'

const store = create((set, get, api) => ({
  ...discountSlice(set, get, api),
  ...userSlice(set, get, api)
}))

export default store
