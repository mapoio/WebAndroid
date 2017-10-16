let toPromise = (func, option) => {
  return new Promise(function (resolve, reject) {
    func((success) => {
      resolve(success)
    }, (error) => {
      reject(error)
    })
  })
}

export default toPromise
