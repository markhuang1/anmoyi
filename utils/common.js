let deviceState = {
  0:{title:'关机',value:'0'},
  1:{title:'开机',value:'1'},
  2:{title:'按摩中',value:'2'},
}
export let getEnum = {
    getDeviceState(value){
      return deviceState[value].title
  }
}