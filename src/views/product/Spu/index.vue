<!-- eslint-disable vue/html-indent -->
<template>
  <div>
    <el-card style="margin: 20px 0px;">
      <CategorySelect @getCategotyId="getCategotyId"
        :show="flag!=0"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="flag == 0">
        <el-button type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSPU">
          添加SPU
        </el-button>
        <!-- 表格 -->
        <el-table style="width: 100%"
          border
          :data="records">
          <el-table-column type="index"
            label="序号"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column prop="spuName"
            label="spu名称"
            width="width">
          </el-table-column>
          <el-table-column prop="description"
            label="spu描述"
            width="width">
            <!-- <el-tag type="success" v-for="(attrValue, index) in row.attrValueList" :key="attrValue.id"
                style="margin:0px 20px;">{{ attrValue.valueName }}</el-tag>-->
          </el-table-column>
          <el-table-column prop="prop"
            label="操作"
            width="width">
            <template slot-scope="{row,$index}">
              <hint-button type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)">
              </hint-button>

              <hint-button type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSPU(row)">
              </hint-button>

              <hint-button type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu的sku列表"
                @click="handler(row)">
              </hint-button>

              <el-popconfirm title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)">
                <hint-button type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference">
                </hint-button>
              </el-popconfirm>


            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination style="margin-top:20px ;text-align: center;"
          layout="prev, pager, next,jumper,->,sizes,total"
          :current-page="page"
          :total="total"
          :page-size="limit"
          :page-sizes="[3, 5, 10]"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange">
        </el-pagination>
      </div>

      <SpuForm v-show="flag == 1"
        @changeFlag="changeFlag"
        ref="spu">
      </SpuForm>

      <SkuForm v-show="flag == 2"
        ref="sku"
        @changeSkuFlag="changeSkuFlag">
      </SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible" @closed="close">
      <el-table :data="skuList"
        style="width: 100%;"
        border v-loading="loading">
        <el-table-column prop="skuName"
          label="名称"
          width="150">
        </el-table-column>
        <el-table-column prop="price"
          label="价格"
          width="200">
        </el-table-column>
        <el-table-column prop="weight"
          label="重量">
        </el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: 'Spu',
  components: { SpuForm, SkuForm },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      page: 1,
      limit: 3,
      records: [],
      total: 0,
      flag: 0,  // 0展示  1修改spu  2添加sku
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      loading:true
    };
  },
  methods: {
    updateSPU(row) {
      this.flag = 1
      this.$refs.spu.initSpuData(row)
    },
    addSPU() {
      this.flag = 1
      this.$refs.spu.addSPUData(this.category3Id)
    },
    handleCurrentChange(page) {
      this.page = page
      this.getSpuList()
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
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
        this.getSpuList()
      }
    },
    async getSpuList() {
      const { page, limit, category3Id } = this
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id)
      // console.log(result);
      if (result.code == 200) {
        this.records = result.data.records,
          this.total = result.data.total
      }
    },
    changeFlag({ flag, choice }) {
      this.flag = flag
      if (choice == '修改') {
        this.getSpuList()
      } else {
        this.handleCurrentChange(1)
      }
    },
    changeSkuFlag(flag) {
      this.flag = flag
    },
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      console.log(result);
      if (result.code == 200) {
        // 目前删除接口崩溃
        this.$message({ type: 'success', message: '删除成功' })
        // 可加入判断删除后跳到哪一页
        this.getSpuList()
      }
    },
    addSku(row) {
      this.flag = 2
      this.$refs.sku.getData(this.category1Id, this.category2Id, row)
    },
    async handler(spu) {
      this.dialogTableVisible = true
      this.spu = spu
      let result = await this.$API.spu.reqSkuList(spu.id)
      if (result.code == 200) {
        this.skuList = result.data
        this.loading = false
      }
    },
    close(){
      this.loading = true
      this.skuList = []
    }
  },
}
</script>