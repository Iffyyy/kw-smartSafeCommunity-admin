module.exports = function(file) {
  try {
    return require('@/views/' + file + '.vue').default
  } catch (e) {
    console.log(e)
    return false
  }
} // vue-loader at least v13.0.0+
