<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="名称">
      <a-input v-model="form.name"/>
    </a-form-model-item>
    <a-form-model-item label="类别">
      <a-select v-model="form.region" placeholder="请输入类别">
        <a-select-option :value="1">
          测试类别1
        </a-select-option>
        <a-select-option :value="2">
          测试类别2
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="时间">
      <a-date-picker
          v-model="form.date1"
          show-time
          type="date"
          placeholder="请选择时间"
          style="width: 100%;"
      />
    </a-form-model-item>
    <a-form-model-item label="是否启用">
      <a-switch v-model="form.delivery"/>
    </a-form-model-item>
    <a-form-model-item label="动态表格">
      <a-tag :closable="true" v-for="tag in tags" :key="tag" @close="() => handleClose(tag)">
        {{ tag }}
      </a-tag>
      <a-input
          v-if="inputVisible"
          ref="input"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          :value="inputValue"
          @change="handleInputChange"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
      />
      <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
        <a-icon type="plus"/>
        新增
      </a-tag>
      <div>
        <table ref="specsTable" class="specs-table" v-if="tags.length > 0">
          <tr>
            <th v-for="group in tags" :key="group">
              {{ group }}
            </th>
            <th>价格</th>
            <th>操作</th>
          </tr>
          <tr v-for="(specGroup, i) in specGroups" :key="specGroup.id">
            <td v-for="group in tags" :key="group">
              <input type="text"/>
            </td>
            <td>
              <input type="text"/>
            </td>
            <td>
              <a-icon type="delete" @click="specGroups.splice(i, 1)"/>
            </td>
          </tr>
          <tfoot>
          <tr>
            <td :colspan="tags.length + 2">
              <a-button
                  @click="addSpecGroups"
                  icon="plus-circle"
                  ghost
                  type="primary"
              >添加规格组
              </a-button
              >
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
    </a-form-model-item>
    <a-form-model-item label="优惠活动">
      <a-checkbox-group v-model="form.type">
        <a-checkbox value="1" name="type">
          100减10
        </a-checkbox>
        <a-checkbox value="2" name="type">
          200减20
        </a-checkbox>
        <a-checkbox value="3" name="type">
          300减30
        </a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="状态">
      <a-radio-group v-model="form.resource">
        <a-radio value="1">
          上架
        </a-radio>
        <a-radio value="2">
          下架
        </a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="上传图片">
      <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
      >
        <div v-if="fileList.length < 8">
          <a-icon type="plus"/>
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage"/>
      </a-modal>
    </a-form-model-item>
    <a-form-model-item label="备注">
      <a-input v-model="form.desc" type="textarea"/>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        创建
      </a-button>
      <a-button style="margin-left: 10px;">
        清空
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
  function getBase64 (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  export default {
    data () {
      return {
        labelCol: { span: 2 },
        wrapperCol: { span: 12 },
        form: {
          name: '',
          region: undefined,
          date1: undefined,
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        tags: [],
        specGroups: [{
          id: +new Date(),
        }],
        inputVisible: false,
        inputValue: '',
        fileList: [],
        previewVisible: false,
        previewImage: '',
      }
    },
    methods: {
      onSubmit () {
        let specGroup = []
        //通过refs获取到表格的DOM对象，然后获取到表格的所有行
        let rows = this.$refs.specsTable.rows
        console.log(rows)
        //遍历每一行，拿到其中的单元格数组
        for (let i = 0; i < rows.length; i++) {
          const cells = rows[i].cells
          let specItem = [] //每一行的值
          //拿到单元格数组后，遍历，并取到单元格中的值
          for (let i = 0; i < cells.length; i++) {
            const cell = cells[i] //每个单元格
            let input = cell.querySelector('input')
            //TH中是取文字，td中取input的值
            if (input) specItem.push(input.value)
            else specItem.push(cell.innerText)
          }
          specGroup.push(specItem)
        }

        console.log(specGroup)
      },
      handleClose (removedTag) {
        const tags = this.tags.filter(tag => tag !== removedTag)
        console.log(tags)
        this.tags = tags
      },

      showInput () {
        this.inputVisible = true
        this.$nextTick(function () {
          this.$refs.input.focus()
        })
      },

      handleInputChange (e) {
        this.inputValue = e.target.value
      },

      handleInputConfirm () {
        const inputValue = this.inputValue
        let tags = this.tags
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue]
        }
        console.log(tags)
        Object.assign(this, {
          tags,
          inputVisible: false,
          inputValue: '',
        })
      },

      addSpecGroups () {
        this.specGroups.push({
          id: +new Date(),
        })
      },

      handleCancel () {
        this.previewVisible = false
      },

      async handlePreview (file) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj)
        }
        this.previewImage = file.url || file.preview
        this.previewVisible = true
      },

      handleChange ({ fileList }) {
        this.fileList = fileList
      },
    },
  }
</script>

<style scoped>
  .specs-table {
    border-collapse: collapse;
  }

  .specs-table th, td {
    width: 120px;
    border: 1px solid #ccc;
    text-align: center;
    padding: 2px;
  }

  .specs-table input {
    border: none;
    width: 90%;
    outline: none;
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
