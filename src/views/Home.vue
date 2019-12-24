<template>
  <div class="home">
    <TableHeader>
      <div slot="headerLeft">
        <span>预约日期：</span>
        <DatePicker slot="headerLeft"
                    v-model="startDate"
                    type="date"
                    format="yyyy年MM月dd日"
                    placeholder="起始日期"
                    style="width: 200px"></DatePicker>
      </div>
      <DatePicker slot="headerLeft"
                  v-model="endDate"
                  type="date"
                  format="yyyy年MM月dd日"
                  placeholder="结束日期"
                  style="width: 200px"></DatePicker>
      <Button slot="headerLeft"
              @click="onSearch()"
              type="primary">查询</Button>
      <Button slot="headerLeft"
              @click="onClear()">重制</Button>
      <Button slot="headerRight"
              @click="onAdd()"
              type="primary">添加</Button>
    </TableHeader>
    <TablePage :data=data
               :columns=columns
               :dataCount=dataCount
               :pageCurrent=pageCurrent
               :loading=loading
               :changePageCallback="changePageCallback"
               v-if="flag">
    </TablePage>
    <Modal title="预约开户"
           v-model="modal"
           width=650
           :closable="false"
           :mask-closable="false"
           class-name="vertical-center-modal">
      <Form ref="formInline1"
            label-position="right"
            :label-width="90"
            :disabled="disabled"
            :model="value1"
            :rules="ruleInline">
        <Row class="row">
          <Col span="12">
          <FormItem prop="reservDate"
                    label="预约日期">
            <DatePicker v-model="value1.reservDate"
                        type="date"
                        placeholder="预约日期"
                        style="width: 200px"></DatePicker>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem prop="reservTime"
                    label="预约时间">
            <TimePicker v-model="value1.reservTime"
                        format="HH:mm"
                        type="timerange"
                        placement="bottom-end"
                        placeholder="预约时间"
                        style="width: 200px"></TimePicker>
          </FormItem>
          </Col>
        </Row>
        <Row class="row">
          <Col span="12">
          <FormItem prop="custName"
                    label="预约人">
            <Input v-model="value1.custName"
                   placeholder="预约人"
                   clearable
                   style="width: 200px" />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem prop="tel"
                    label="联系电话">
            <Input v-model="value1.tel"
                   placeholder="联系电话"
                   clearable
                   style="width: 200px" />
          </FormItem>
          </Col>
        </Row>
        <Row class="row">
          <Col span="12">
          <FormItem prop="reservNum"
                    label="开户人数">
            <Input v-model="value1.reservNum"
                   placeholder="开户人数"
                   clearable
                   style="width: 200px" />
          </FormItem>
          </Col>
        </Row>
        <Row class="row">
          <Col span="24">
          <FormItem prop="reservAddr"
                    label="上门地址">
            <Input v-model="value1.reservAddr"
                   class="textarea"
                   type="textarea"
                   :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="上门地址" />
          </FormItem>
          </Col>
        </Row>
        <Row class="row"
             v-show="commentFlag">
          <Col span="12">
          <FormItem label="满意度">
            <Select v-model="value3.satisfaction"
                    @on-change="changeOption"
                    style="width:200px">
              <Option v-for="item in cityList"
                      :value="item.value"
                      :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row class="row"
             v-show="commentFlag">
          <Col span="24">
          <FormItem label="评价信息">
            <Input v-model="value3.evaluateInf"
                   class="textarea"
                   type="textarea"
                   :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请填写评价信息" />
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('formInline1')">取消</Button>
        <Button type="primary"
                @click="handleSubmit('formInline1')">确定</Button>
      </div>
    </Modal>
    <Modal title="预约评价"
           v-model="modal1"
           width=650
           :closable="false"
           :mask-closable="false"
           class-name="vertical-center-modal">
      <Form ref="formInline"
            label-position="right"
            :label-width="90"
            :model="value2"
            :rules="ruleInline">
        <Row class="row">
          <Col span="12">
          <FormItem prop="satisfaction"
                    label="满意度">
            <Select v-model="value2.satisfaction"
                    @on-change="changeOption"
                    style="width:200px">
              <Option v-for="item in cityList"
                      :value="item.value"
                      :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row class="row">
          <Col span="24">
          <FormItem prop="evaluateInf"
                    label="评价信息">
            <Input v-model="value2.evaluateInf"
                   class="textarea"
                   type="textarea"
                   :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请填写评价信息" />
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="commentCancel('formInline')">取消</Button>
        <Button type="primary"
                @click="commentSubmit('formInline')">确定1</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import TablePage from '@/components/TablePage.vue'
import TableHeader from '@/components/TableHeader.vue'
import System from '../service/system'
export default {
  name: 'home',
  components: {
    TablePage,
    TableHeader
  },
  data () {
    return {
      Filter: {}, // 数据提交对象
      flag: false, // 组件现实隐藏状态
      loading: false, // 组件请求loading状态
      submitFlag: '1', // 新增修改评价状态 1:新增 2:修改 3:查看 4:评价
      disabled: false, // 表单禁用状态
      commentFlag: false, // 评论详情是否显示
      columns: [
        {
          type: 'index',
          title: '序号',
          width: 80,
          align: 'center'
        },
        {
          title: '预约日期',
          key: 'reservDate',
          sortable: true
        },
        {
          title: '预约时间',
          key: 'reservTime'
        },
        {
          title: '预约人',
          key: 'custName'
        },
        {
          title: '联系电话',
          key: 'tel'
        },
        {
          title: '开户人数',
          key: 'reservNum',
          sortable: true
        },
        {
          title: '状态',
          key: 'stsNote'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'left',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  shape: 'circle',
                  type: 'text',
                  icon: 'ios-menu-outline'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }),
              h('Button', {
                props: {
                  shape: 'circle',
                  type: 'text',
                  icon: 'ios-create-outline'
                },
                style: {
                  display: (params.row.reservSts === '1') ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.modify(params.index)
                  }
                }
              }),
              h('Button', {
                props: {
                  shape: 'circle',
                  type: 'text',
                  icon: 'ios-remove-circle-outline'
                },
                style: {
                  display: (params.row.reservSts === '1') ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.stop(params.index)
                  }
                }
              }),
              h('Button', {
                props: {
                  shape: 'circle',
                  type: 'text',
                  icon: 'ios-thumbs-up-outline'
                },
                style: {
                  display: (params.row.reservSts === '4') ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.comment(params.index)
                  }
                }
              })
            ])
          }
        }
      ], // 表头信息
      data: null, // 表格数据
      pageSize: 10, // 每页显示多少条
      dataCount: 25, // 总条数
      pageCurrent: 1, // 当前页
      startDate: new Date(), // 查询栏预约开始日期
      endDate: new Date(), // 查询栏预约结束日期
      modal: false, // 弹出框状态
      modal1: false, // 评价弹出框状态
      value1: {}, // 提交信息
      value2: {}, // 评价信息
      value3: {}, // 评价展示信息
      ruleInline: {
        custName: [
          { required: true, message: '预约人不能为空', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' }
        ],
        reservNum: [
          { required: true, message: '开户人数不能为空', trigger: 'blur' }
        ],
        reservDate: [
          { required: true, type: 'date', message: '请选择预约日期', trigger: 'change' }
        ],
        reservTime: [{
          type: 'array',
          required: true,
          message: '请选择起止时间',
          fields: {
            0: { type: 'string', required: true, message: '请选择起止时间' },
            1: { type: 'string', required: true, message: '请选择起止时间' }
          }
        }],
        reservAddr: [
          { required: true, message: '上门地址不能为空', trigger: 'blur' }
        ],
        satisfaction: [
          { required: true, message: '请选择满意度', trigger: 'change' }
        ],
        evaluateInf: [
          { required: true, message: '评价信息不能为空', trigger: 'blur' }
        ]
      },
      commentSeqNo: '',
      cityList: [
        {
          value: '1',
          label: '非常满意'
        },
        {
          value: '2',
          label: '满意'
        },
        {
          value: '3',
          label: '一般'
        },
        {
          value: '4',
          label: '不满意'
        },
        {
          value: '5',
          label: '非常不满意'
        }
      ],
      model1: ''
    }
  },
  mounted () {
    this._getData()
  },
  methods: {
    onSearch () { // 查询
      this._getData()
    },
    onClear () { // 重制查询日期
      this.date = ''
    },
    onAdd () { // 新增弹出狂显示
      this.modal = true
      this.submitFlag = '1'
    },
    show (index) { // 信息展示
      this.modal = true
      this.disabled = true
      this.submitFlag = '3'
      let seqNo = this.data[index].seqNo
      System.getPayrollDetail({ seqNo }).then(res => {
        console.log('gggg', res)
        if (res.data.code === 0) {
          this.value1 = res.data.data
          this.value1.reservTime = res.data.data.timeScope // 日期格式为数组 需要单独赋值
          if (res.data.result === '1') {
            this.commentFlag = true
            let obj = {}
            obj.satisfaction = res.data.data.satisfaction
            obj.evaluateInf = res.data.data.evaluateInf
            this.value3 = obj
          } else {
            this.commentFlag = false
          }
        } else {
          this.$Message.error(res.msg)
        }
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    modify (index) { // 修改操作
      this.modal = true
      this.submitFlag = '2'
      let seqNo = this.data[index].seqNo
      System.getPayrollDetail({ seqNo }).then(res => {
        if (res.data.code === 0) {
          this.value1 = res.data.data
          this.value1.reservTime = res.data.data.timeScope // 日期格式为数组 需要单独赋值
        } else {
          this.$Message.error(res.msg)
        }
      }).catch(err => {
        this.$Message.error(err)
      })
      // this.value1 = JSON.parse(JSON.stringify(this.data[index])) // 数据解耦
    },
    stop (index) { // 取消预约
      let seqNo = this.data[index].seqNo
      this.$Modal.confirm({
        title: '提醒',
        content: '<p>确定取消本条预约吗？</p>',
        onOk: () => {
          System.cancelPayrollDetail({ seqNo }).then(res => {
            if (res.data.code === 0) {
              this.$Message.info('您已取消预约')
              this._getData()
            } else {
              this.$Message.error(res.msg)
            }
          }).catch(err => {
            this.$Message.error(err)
          })
        }
      })
    },
    comment (index) { // 评价
      this.modal1 = true
      this.commentSeqNo = this.data[index].seqNo
    },
    _getData () { // 获取数据
      this.loading = true
      let Filter = this.Filter
      Filter.limit = this.pageSize
      Filter.page = this.pageCurrent
      Filter.startDate = this.getNowFormatDate(this.startDate)
      Filter.endDate = this.getNowFormatDate(this.endDate)
      System.getPayrollList({ Filter }).then(res => {
        if (res.data.code === 0) {
          this.data = res.data.data
          this.dataCount = res.data.count
          this.flag = true
          this.loading = false
        } else {
          this.$Message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error(err)
      })
    },
    changePageCallback (pageCurrent, pageSize) { // 跳页
      // 此时的page为传过来的页数，pageSize为每页条数
      this.pageCurrent = pageCurrent
      this.pageSize = pageSize
      this._getData()
    },
    handleSubmit (name) { // 确定提交
      let Filter = this.value1
      Filter.custNo = '81501210120142001406'
      console.log('11111', name)
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.submitFlag === '1') {
            // 新增
            Filter.reservDate = this.getNowFormatDate(this.value1.reservDate)
            let jsonStr = JSON.stringify(Filter)
            System.addPayrollList({ Filter: jsonStr }).then(res => {
              if (res.code === 0) {
                this.modal = false
                this.value1 = {}
                this.$Message.info('新增成功')
                this._getData()
              } else {
                this.$Message.error(res.msg)
              }
            }).catch(err => {
              this.$Message.error(err)
            })
          } else if (this.submitFlag === '2') {
            // 修改
            Filter.reservDate = this.getNowFormatDate(this.value1.reservDate)
            let jsonStr = JSON.stringify(Filter)
            System.editPayrollDetail({ Filter: jsonStr }).then(res => {
              if (res.code === 0) {
                this.modal = false
                this.value1 = {}
                this.$Message.info('修改成功')
                this._getData()
              } else {
                this.$Message.error(res.msg)
              }
            }).catch(err => {
              this.$Message.error(err)
            })
          } else if (this.submitFlag === '3') {
            this.disabled = false
            this.modal = false
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    commentSubmit (name) { // 评价提交
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.value1 = {}
          let Filter = this.value2
          Filter.seqNo = this.commentSeqNo
          let jsonStr = JSON.stringify(Filter)
          System.evaluateReservation({ Filter: jsonStr }).then(res => {
            if (res.code === 0) {
              this.$Message.info('评价完成')
              this._getData()
              this.modal1 = false
            } else {
              this.$Message.error(res.msg)
            }
          }).catch(err => {
            this.$Message.error(err)
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleCancel (name) { // 取消预约清空
      this.value1 = {}
      this.modal = false
      this.disabled = false
      this.$refs[name].resetFields()
    },
    commentCancel (name) { // 取消评价清空
      this.value2 = {}
      this.modal1 = false
      this.$refs[name].resetFields()
    },
    changeOption () {
      console.log(this.value2)
    },
    getNowFormatDate (d) { // 时期格式化
      var date = d
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    }
  }
}
</script>
<style scoped>
.row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.textarea {
  width: 500px;
}
</style>
