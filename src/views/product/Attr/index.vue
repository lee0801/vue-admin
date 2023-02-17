<template>
  <div>
    <el-card style="margin: 20px 0px;">
      <CategorySelect @getCategotyId="getCategotyId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">添加属性</el-button>
        <!-- 表格 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{row,$index}">
              <el-tag type="success" v-for="(attrValue, index) in row.attrValueList" :key="attrValue.id"
                style="margin:0px 20px;">{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{row,$index}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
              <!-- 删除属性 -->
              <el-popconfirm :title="`确定删除第${$index+1}项：${row.attrName}吗`" @onConfirm="deleteAttr(row)" style="margin:0px 20px;">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 修改属性 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button :disabled="!attrInfo.attrName" type="primary" icon="el-icon-plus"
          @click="addAttrValue">添加属性值</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table style="width: 100%;margin: 20px 0px;" border :data="attrInfo.attrValueList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性值名称">
            <template slot-scope="{row,$index}">
              <!-- span与input来回切换 -->
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" @blur="toLook(row)"
                @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
              <span v-else @click="toEdit(row, $index)" style="display: block;">{{ row.valueName.trim() }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <!-- 删除属性值 -->
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`确定删除${row.valueName}吗`" @onConfirm="deleteAttrValue($index)">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 保存所有的修改 -->
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length < 1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: [],
      isShowTable: true,
      // 添加修改的属性值
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
      flag: true
    };
  },
  methods: {
    getCategotyId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level == 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        // 发请求获取属性
        this.getAttrList()
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this
      let result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
      if (result.code == 200) {
        this.attrList = result.data
      }
    },
    // 
    addAttr() {
      this.isShowTable = false
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      }
    },
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true
      })
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      });
    },
    updateAttr(row) {
      this.isShowTable = false
      // 对象套对象  使用深拷贝
      // this.attrInfo = {...row}
      this.attrInfo = cloneDeep(row)

      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false);
      });
    },
    async deleteAttr(row) {
      // console.log(row);
      try {
        await this.$API.attr.reqDeleteAttr(row.id)
        // this.isShowTable = true
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getAttrList()
      } catch (error) {

      }
      // let result = await this.$API.attr.reqDeleteAttr(row.id)
    },
    toLook(row) {
      if (row.valueName.trim() == '') {
        this.$message('请输入合法的属性值！')
        return
      }
      let isRepat = this.attrInfo.attrValueList.some(item => {
        if (row != item) {
          return row.valueName.trim() == item.valueName.trim()
        }
      })
      if (isRepat) {
        this.$message('输入重复！请重新输入')
        return
      }

      row.flag = false
    },
    toEdit(row, index) {
      row.flag = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      });
    },
    // 气泡确认框
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    async addOrUpdateAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.attrName != '') {
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.isShowTable = true
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.getAttrList()
      } catch (error) {

      }
    }
  },
}
</script>
