let camera = index => {
  return window.plus.camera.getCamera(index)
}

export default {camera}
// index => {
//   let indexin = index || 1
//   let cmr = window.plus.camera.getCamera(indexin)
//   let cam = {}
//   cam.supportedImageResolutions = cmr.supportedImageResolutions
//   cam.supportedVideoFormats = cmr.supportedVideoFormats
//   cam.captureImage = (option) => {
//     return new Promise((resolve, reject) => {
//       cmr.captureImage((position) => {
//         resolve(position)
//       }, (error) => {
//         reject(error)
//       }, option || {})
//     })
//   }
//   cam.startVideoCapture = (option) => {
//     return new Promise((resolve, reject) => {
//       cmr.startVideoCapture((position) => {
//         resolve(position)
//       }, (error) => {
//         reject(error)
//       }, option || {})
//     })
//   }
//   cam.stopVideoCapture = cmr.stopVideoCapture
// }
