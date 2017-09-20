// import vueResource from 'vue-resource'
const LOG_PRINT = true

export let log = {
  info (info) {
    LOG_PRINT ? console.info(info) : {}
  },
  warn (warn) {
    LOG_PRINT ? console.warn(warn) : {}
  },
  debug (debug) {
    LOG_PRINT ? console.debug(debug) : {}
  },
  log (log) {
    LOG_PRINT ? console.log(log) : {}
  },
  error (error) {
    LOG_PRINT ? console.error(error) : {}
  }
}

export default {}
