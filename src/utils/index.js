export default class MyStore {
  constructor(prop) {
    this.getData = prop.getData
  }
  instance = null
 static getInstance(prop) {
    if(!this.instance) {
      this.instance = new MyStore(prop)
    }
    return this.instance
  }
  userMap = new Map()
  get(key) {
    if(this.userMap.has(key)) {
      const result = this.userMap.get(key)
      return result
    }
    return null
  }
  set(key,val) {
    this.userMap.set(key, val)
  }
  getUserInfo(userId) {
    const userInfo = this.get(userId)
    if(userInfo){
      return userInfo
    } else {
      return this.getData().then(res => {
        this.set(userId, res)
        return res
      })
    }
  }
}