var name = "_dismantlingParmams"

function CheckAndGetParam(param) {
  let params = param
  if (!params || params.isNormal == undefined) {
    // 取 localStorage
    try {
      var str = localStorage.getItem(name)
      params = JSON.parse(str)
    } catch (e) {
      params = null
    }
  }
  if (!params || params.isNormal == undefined) {
        return null
  }
  
  return params
}

function SaveParam(params) {
  localStorage.setItem(name, JSON.stringify(params))
}

function RemoveParam() {
  localStorage.removeItem(name)
}

export {
  SaveParam,
  RemoveParam,
  CheckAndGetParam
}
