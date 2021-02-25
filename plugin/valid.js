export function $valid (ref) {
  return new Promise((resolve) => {
    this.$refs[ref].validate(valid => {
      if (valid) {
        resolve()
      }
    })
  })
}
