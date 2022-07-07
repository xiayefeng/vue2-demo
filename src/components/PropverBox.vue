<template>
  <el-popover placement="right" @show="getUserInfo" trigger="hover">
    <div class="user-info">
      <div class="user-info-item">
        <span class="label">姓名:</span>
        <span class="info-item">{{ userObj.userName }}</span>
      </div>
      <div class="user-info-item">
        <span class="label">工号:</span>
        <span class="info-item">{{ userObj.userNo }}</span>
      </div>
      <div class="user-info-item">
        <span class="label">职务:</span>
        <span class="info-item">{{ userObj.title }}</span>
      </div>
      <div class="user-info-item">
        <span class="label">部门:</span>
        <span class="info-item">{{ userObj.deptName }}</span>
      </div>
    </div>
    <el-option slot="reference" :value="userObj.userId">
      <span>{{ userObj.userName }}</span><span>{{ userObj.userNo }}</span>
    </el-option>
  </el-popover>
</template>

<script>
import MyStore from '@/utils'
export default {
  props: {
    userId: {
      type: String
    }
  },
  data () {
    return {
      userObj: {
      }
    }
  },
  created () {
    this.getUser = MyStore.getInstance({ getData: this.getData })
  },
  methods: {
    getUserInfo () {
      console.log(this.userId)
      const result = this.getUser.getUserInfo(this.userId)
      if (result.then && typeof result.then === 'function') {
        result.then(res => {
          this.userObj = res
        })
      } else {
        this.userObj = result
      }
    },
    getData (userId) {
      return new Promise((resolve, reject) => {
        try {
          resolve({ userId })
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  width: 240px;
  height: 100px;
}

.user-info-item {
  display: flex;
}
</style>