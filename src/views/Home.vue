<template>
  <div class="home">
    <TablePage :data=data
               :columns=columns>
      <div slot="headerLeft">
        <span>预约日期：</span>
        <DatePicker slot="headerLeft"
                    v-model="date"
                    type="date"
                    placeholder="预约日期"
                    style="width: 200px"></DatePicker>
      </div>
      <Button slot="headerLeft"
              @click="onSearch()"
              type="primary">查询</Button>
      <Button slot="headerLeft"
              @click="onClear()">重制</Button>
      <Button slot="headerRight"
              @click="onAdd()"
              type="primary">添加</Button>
      <div slot="action">
        <Button type="primary"
                size="small"
                style="margin-right: 5px">View</Button>
        <Button type="error"
                size="small">Delete</Button>
      </div>
    </TablePage>
    <Modal title="预约开户"
           v-model="modal"
           width=800
           :mask-closable="false"
           class-name="vertical-center-modal">
      <Row>
        <Col span="12">
        <span>11111</span>
        <Input v-model="value1"
               placeholder="Enter something..."
               clearable
               style="width: 200px" />
        </Col>
        <Col span="12">
        <span>22222</span>
        <Input v-model="value2"
               placeholder="Enter something..."
               clearable
               style="width: 200px" />
        </Col>
      </Row>
      <Row>
        <Col span="12">col-12</Col>
        <Col span="12">col-12</Col>
      </Row>
      <Row>
        <Col span="12">col-12</Col>
        <Col span="12">col-12</Col>
      </Row>
      <Row>
        <Col span="12">col-12</Col>
        <Col span="12">col-12</Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
import TablePage from '@/components/TablePage.vue'
export default {
  name: 'home',
  components: {
    TablePage
  },
  data () {
    return {
      columns: [
        {
          type: 'index',
          title: '序号',
          width: 80,
          align: 'center'
        },
        {
          title: '预约日期',
          key: 'date',
          sortable: true
        },
        {
          title: '预约时间',
          key: 'time'
        },
        {
          title: '预约人',
          slot: 'name'
        },
        {
          title: '联系电话',
          key: 'phone'
        },
        {
          title: '开户人数',
          key: 'number',
          sortable: true
        },
        {
          title: '状态',
          key: 'state'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data: [],
      date: new Date(),
      modal: false,
      value1: '',
      value2: ''
    }
  },
  created () {
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
      this.data = []
      for (let i = 0; i < 100; i++) {
        let a = {
          date: '20191216',
          time: '08:10:00 - 17:00:00',
          name: '张帆' + i,
          phone: '135****1470',
          number: 10 + i,
          state: '预约中'
        }
        this.data.push(a)
      }
    },
    onSearch () {
      console.log(this.date)
    },
    onClear () {
      this.date = ''
    },
    onAdd () {
      this.modal = true
    }
  }
}
</script>
