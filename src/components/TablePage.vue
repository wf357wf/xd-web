<template>
  <div class="table">
    <div class="header">
      <div class="left">
        <slot name="headerLeft"></slot>
      </div>
      <div class="right">
        <slot name="headerRight"></slot>
      </div>
    </div>
    <div class="content">
      <Table border
             stripe
             :columns="columns"
             :data="nowData">
        <template slot-scope="{ row }"
                  slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }"
                  slot="action">
          <slot name="action"></slot>
          <Button type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="show(index)">View</Button>
          <Button type="error"
                  size="small"
                  @click="remove(index)">Delete</Button>
        </template>
      </Table>
    </div>
    <div class="footer">
      <Page :total="dataCount"
            :page-size="pageSize"
            @on-change="changepage"
            @on-page-size-change="_nowPageSize"
            show-total
            show-sizer
            show-elevator />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablePage',
  props: {
    msg: String,
    columns: Array,
    data: Array
  },
  data () {
    return {
      nowData: [],
      pageSize: 10, // 每页显示多少条
      dataCount: 0, // 总条数
      pageCurrent: 1 // 当前页
    }
  },
  mounted () {
    this._getData()
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.nowData[index].name}`
      })
    },
    remove (index) {
      this.nowData.splice(index, 1)
    },
    _getData () {
      // 分页显示所有数据总数
      this.dataCount = this.data.length
      // 循环展示页面刚加载时需要的数据条数
      this.nowData = []
      for (let i = 0; i < this.pageSize; i++) {
        this.nowData.push(this.data[i])
      }
    },
    changepage (index) {
      // 需要显示开始数据的index,(因为数据是从0开始的，页码是从1开始的，需要-1)
      let _start = (index - 1) * this.pageSize
      // 需要显示结束数据的index
      let _end = index * this.pageSize
      // 截取需要显示的数据
      this.nowData = this.data.slice(_start, _end)
      // 储存当前页
      this.pageCurrent = index
    },
    _nowPageSize (index) {
      // 实时获取当前需要显示的条数
      this.pageSize = index
      this.changepage(1)
    }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
}
.header {
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.left > * {
  margin-right: 10px;
}
.right > * {
  margin-left: 10px;
}
.content {
  width: 100%;
  height: 84vh;
  overflow-y: scroll;
  padding-top: 10px;
}
.footer {
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid #eee;
}
</style>
