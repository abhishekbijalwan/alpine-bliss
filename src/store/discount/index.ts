export const discountSlice = (set, get, api) => ({
  discountState: {
    discountPercent: null
  },
  setDiscountPercentage: (value: any) =>
    set((state) => ({
      discountState: {
        discountPercent: value
      }
    })),
  resetDiscountState: () =>
    set(() => {
      return {
        discountState: {
          discountPercent: null
        }
      }
    })
})
