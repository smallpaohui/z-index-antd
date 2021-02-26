<template>
  <div>
    <a-button @click="handledAdd" type="primary" style="margin-bottom: 10px">
      新增
    </a-button>

    <a-modal v-model="visible" :title='this.edit?"编辑":"新增"' @ok="handleOk" :afterClose="clearForm">
      <a-form-model ref="form" :model="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" :rules="rules">
        <a-form-model-item label="订单号" prop="orderno">
          <a-input :allowClear="true" v-model="form.orderno"/>
        </a-form-model-item>
        <a-form-model-item label="寄件人" prop="sender">
          <a-select :options="[{value:'Lucy',label:'Lucy'}]" placeholder="请选择寄件人"
                    v-model="form.sender"/>
        </a-form-model-item>
        <a-form-model-item label="收件人" prop="receiver">
          <a-select :options="[{value:'Lucy',label:'Lucy'}]" placeholder="请选择收件人"
                    v-model="form.receiver"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-table :columns="columns" :data-source="data" :pagination="pagination" :row-key="record => record.id"
             @change="handleTableChange" :loading="loading">
    <span slot="action" slot-scope="text, record">
      <a-button size="small" @click="handledEdit(record)" type="primary">
        <a-icon type="edit"/>编辑
      </a-button>
      <a-divider type="vertical"/>
      <a-button size="small" @click="handledDel(record.orderno,record.id)" type="danger">
        <a-icon type="delete"/>删除
      </a-button>
    </span>
    </a-table>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        data: [],
        columns: [
          {
            title: '序号',
            width: 100,
            align: 'center',
            customRender: (text, record, index) => `${index + 1 + (10 * (this.pagination.current - 1))}`,
          },
          {
            dataIndex: 'orderno',
            key: 'orderno',
            title: '订单号',
            align: 'center',
          },
          {
            title: '寄件人',
            dataIndex: 'sender',
            key: 'sender',
            align: 'center',
          },
          {
            title: '收件人',
            dataIndex: 'receiver',
            key: 'receiver',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center',
          },
        ],
        pagination: {
          total: 0,
          current: 1,
        },
        loading: false,
        visible: false,
        edit: false,
        form: {
          orderno: '',
          sender: undefined,
          receiver: undefined,
        },
        rules: {
          orderno: [
            { required: true, message: '请输入订单号', trigger: 'blur' },
          ],
          sender: [
            { required: true, message: '请选择寄件人', trigger: 'change' },
          ],
          receiver: [
            { required: true, message: '请输入收件人', trigger: 'change' },
          ],
        },
      }
    },
    methods: {
      handledAdd () {
        this.edit = false
        this.visible = true
      },
      handleOk () {
        if (this.edit) {
          this.$refs.form.validate(valid => {
            if (valid) {
              this.visible = false
              this.loading = true
              let index = this.data.findIndex(res => res.orderno === this.form.orderno)
              this.data[index] = {
                id: Math.random(),
                ...this.form,
              }
              setTimeout(() => {
                this.loading = false
              }, 500)
              this.$ms('修改成功', `已修改订单号为${this.form.orderno}的订单`)
            } else {
              return false
            }
          })
        } else {
          this.$refs.form.validate(valid => {
            if (valid) {
              this.visible = false
              this.loading = true
              this.data.splice(this.data.length - 1, 1)
              this.data.unshift({
                id: Math.random(),
                ...this.form,
              })
              setTimeout(() => {
                this.loading = false
              }, 500)
              this.$ms('操作成功', `已成功添加订单号为${this.form.orderno}的订单`)
            } else {
              return false
            }
          })
        }
      },
      getList () {
        this.loading = true
        this.$get('/order/list', {
          pageIndex: this.pagination.current,
          pageSize: 10,
        }).then(res => {
          let { data: { data: { list } } } = res
          this.pagination.total = res.data.data.total
          this.data = list
          this.loading = false
        })
      },
      handledEdit (record) {
        this.edit = true
        this.form.orderno = record.orderno
        this.form.sender = record.sender
        this.form.receiver = record.receiver
        this.visible = true
      },
      handledDel (orderno, id) {
        this.$confirm({
          title: `是否删除订单号为${orderno}的订单？`,
          content: '删除该订单后将无法恢复',
          cancelText: '取消',
          okText: '确定',
          onOk: () => {
            this.data.splice(this.data.findIndex(r => r.id === id), 1)
            this.$notification.success({
              message: '操作成功',
              description: `已删除订单号为${orderno}的订单`,
            })
          },
        })
      },
      handleTableChange (pagination) {
        this.pagination.current = pagination.current
        this.getList()
      },
      clearForm () {
        this.form = {
          orderno: '',
          sender: undefined,
          receiver: undefined,
        }
        this.$refs.form.clearValidate()
      },
    },
    created () {
      this.getList()
    },
  }
</script>
