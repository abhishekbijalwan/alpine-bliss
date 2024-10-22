export const userSlice = (set, get, api) => ({
  userState: {
    email: '',
    name: ''
  },
  setUserBasicDetails: (value: any) =>
    set((state) => ({
      userState: {
        ...state.discountState,
        ...value
      }
    })),
  resetUserState: () =>
    set(() => {
      return {
        userState: {
          email: '',
          name: ''
        }
      }
    })
})
