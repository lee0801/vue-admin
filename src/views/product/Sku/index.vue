<!-- eslint-disable vue/html-indent -->
<template>
  <div>
    <el-table style="width: 100%;"
      border
      :data="records">
      <el-table-column type="index"
        label="序号"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column prop="skuName"
        label="名称"
        width="width">
      </el-table-column>
      <el-table-column prop="skuDesc"
        label="描述"
        width="width">
      </el-table-column>
      <el-table-column label="默认图片"
        width="110">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg"
            alt=""
            style="width: 80px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column prop="weight"
        label="重量(KG)"
        width="80">
      </el-table-column>
      <el-table-column prop="price"
        label="价格(元)"
        width="80">
      </el-table-column>

      <el-table-column label="操作"
        width="width">
        <template slot-scope="{row,$index}">
          <!-- 在售时显示可下架  图标为 下架 -->
          <el-button type="success"
            size="mini"
            icon="el-icon-caret-bottom"
            v-if="row.isSale == 1"
            @click="cancelSale(row)"></el-button>
          <!-- // 未在售时显示可上架  图标为 上架 -->
          <el-button type="success"
            size="mini"
            icon="el-icon-caret-top"
            v-else
            @click="onSale(row)"></el-button>

          <el-button type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit"></el-button>

          <el-button type="info"
            size="mini"
            icon="el-icon-info"
            @click="getSkuInfo(row)"></el-button>

          <el-button type="danger"
            size="mini"
            icon="el-icon-delete"></el-button>
        </template>

      </el-table-column>
    </el-table>

    <!-- 分页器  -->
    <el-pagination style="text-align: center;"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper, -> ,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getSkuList">
    </el-pagination>

    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer"
      :show-close="false"
      size="50%">
      <el-row>
        <el-col :span="5"
          style="">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"
          style="">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"
          style="">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"
          style="">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag type="success"
              v-for="(attr, index) in skuInfo.skuAttrValueList"
              :key="attr.id"
              style="margin-right: 5px;">{{ attr.attrId }}--{{ attr.valueId }}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"
          style="">商品图片</el-col>
        <el-col :span="16">
          <el-carousel trigger="click"
            height="500px">
            <el-carousel-item v-for="(item, index) in skuInfo.skuImageList"
              :key="item.id">
              <img :src="item.imgUrl"
                style="width: 100%;height: 100%;">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1, // 当前第一页
      limit: 10,  // 当前页面几条数据
      records: [],
      total: 0,
      skuInfo: {},
      drawer: false
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      let result = await this.$API.sku.reqSkuList(page, limit)
      // console.log(result);
      if (result.code == 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    async cancelSale(row) {
      let result = await this.$API.sku.reqCancelSale(row.id)
      if (result.code == 200) {
        this.$message({ type: 'success', message: '下架成功!' })
        row.isSale = 0
      }
    },
    async onSale(row) {
      let result = await this.$API.sku.reqOnSale(row.id)
      if (result.code == 200) {
        this.$message({ type: 'success', message: '上架成功!' })
        row.isSale = 1
      }
    },
    edit() {
      this.$message('正在开发中...')
    },
    async getSkuInfo(sku) {
      this.drawer = true
      let result = await this.$API.sku.reqGetSkuById(sku.id)
      // console.log(result);
      if (result.code == 200) {
        this.skuInfo = result.data
      }

    }
  },
}
</script>

<style scoped >
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}

.el-col {
  margin: 10px 10px;
}
</style>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.el-carousel__button {
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
}
</style>