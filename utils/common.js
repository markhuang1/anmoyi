let deviceState = {
  0:{title:'关机',value:'0'},
  1:{title:'开机',value:'1'},
  3:{title:'按摩中',value:'3'},
}
export let getEnum = {
    getDeviceState(value){
      return deviceState[value].title
  }
}