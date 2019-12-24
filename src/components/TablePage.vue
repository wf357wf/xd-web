<template>
  <div class="table">
    <div class="content">
      <Table border
             stripe
             :loading="loading"
             :columns="columns"
             :data="data">
        <template slot-scope="{ row }"
                  slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot="action">
          <slot name="action"></slot>
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
    loading: Boolean, // 加载状态
    columns: Array, // 表头
    data: Array, // 数据
    dataCount: Number, // 总条数
    pageCurrent: Number, // 当前页
    changePageCallback: Function
  },
  data () {
    return {
      nowData: [],
      pageSize: 10
    }
  },
  methods: {
    changepage (index) {
      this.changePageCallback(index, this.pageSize)
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
