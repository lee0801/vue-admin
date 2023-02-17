<template>
    <div>
        <el-form ref="form"
            label-width="80px">
            <el-form-item label="SPU名称">
                {{ spu.spuName }}
            </el-form-item>

            <el-form-item label="SKU名称">
                <el-input placeholder="sku名称"
                    v-model="skuInfo.skuName">
                </el-input>
            </el-form-item>

            <el-form-item label="价格(元)">
                <el-input placeholder="价格(元)"
                    type="number"
                    v-model="skuInfo.price">
                </el-input>
            </el-form-item>

            <el-form-item label="重量(千克)">
                <el-input placeholder="重量(千克)"
                    v-model="skuInfo.weight">

                </el-input>
            </el-form-item>

            <el-form-item label="规格描述">
                <el-input type="textarea"
                    rows="4"
                    v-model="skuInfo.skuDesc">

                </el-input>
            </el-form-item>

            <el-form-item label="平台属性">
                <el-form :inline="true"
                    ref="inForm"
                    label-width="80px">
                    <el-form-item :label="attr.attrName"
                        v-for="(attr, index) in attrInfoList"
                        :key="attr.id">
                        <el-select placeholder="请选择"
                            v-model="attr.attrIdAndValueId">
                            <el-option :label="attrValue.valueName"
                                :value="`${attr.id}:${attrValue.id}`"
                                v-for="(attrValue, index) in attr.attrValueList"
                                :key="attrValue.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>

            <el-form-item label="销售属性">
                <el-form :inline="true"
                    ref="inForm"
                    label-width="80px">
                    <el-form-item :label="saleAttr.saleAttrName"
                        v-for="(saleAttr, index) in spuSaleAttrList"
                        :key="saleAttr.id">
                        <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
                            <el-option :label="saleAttrValue.saleAttrValueName"
                                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                                v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList"
                                :key="saleAttrValue.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>

            <el-form-item label="图片列表">
                <el-table style="width: 100%"
                    border :data="spuImageList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"
                        width="80"
                        prop="prop">
                    </el-table-column>
                    <el-table-column label="图片"
                        width="width"
                        prop="prop">
                        <template slot-scope="{row,$index}">
                            <img :src="row.imgUrl" style="width: 100px;height: 100px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="名称"
                        width="width"
                        prop="imgName">
                        
                    </el-table-column>
                    <el-table-column label="操作"
                        width="width"
                        prop="prop">
                        <template slot-scope="{row,$index}">
                            <el-button type="primary" v-if="row.isDefault==0" @click="changeIsDefault(row)">
                                设置默认
                            </el-button>
                            <el-button v-else>
                                默认
                            </el-button>                            
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="saveInfo">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
export default {
    name: 'SkuForm',
    data() {
        return {
            spuImageList: [],
            spuSaleAttrList: [],
            // 临时收集，后期整理
            attrInfoList: [],
            spu: {},
            skuInfo: {
                // 来自父组件
                category3Id: 0,
                spuId: 0,
                tmId: 0,
                // 绑定到model收集
                price: 0,
                skuName: '',
                weight: '',
                skuDesc: "",
                // 自己整理书写
                skuImageList: [
                    /* {
                        "id": 0,
                        "imgName": "string",
                        "imgUrl": "string",
                        "isDefault": "string",
                        "skuId": 0,
                        "spuImgId": 0
                    } */
                ],
                skuDefaultImg: "",
                // 平台属性
                skuAttrValueList: [
                    /* {
                        attrId: 0,
                        valueId: 0,
                    } */
                ],
                 // 销售属性
                skuSaleAttrValueList: [
                    /* {
                        "id": 0,
                        "saleAttrId": 0,
                        "saleAttrName": "string",
                        "saleAttrValueId": 0,
                        "saleAttrValueName": "string",
                        "skuId": 0,
                        "spuId": 0
                    } */
                ],
            },
            imageList:[]
        };
    },
    methods: {
        async getData(category1Id, category2Id, spu) {
            this.skuInfo.category3Id = spu.category3Id
            this.skuInfo.spuId = spu.id
            this.skuInfo.tmId = spu.tmId
            this.spu = spu
            let result1 = await this.$API.spu.reqSpuImageList(spu.id)
            // console.log(result1);
            if (result1.code == 200) {
                 let list = result1.data
                 list.forEach(item => {
                    item.isDefault = 0
                 });
                 this.spuImageList = list
            }
            let result2 = await this.$API.spu.reqSpuSaleAttrList(spu.id)
            // console.log(result2);
            if (result2.code == 200) {
                this.spuSaleAttrList = result2.data
            }
            let result3 = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
            // console.log(result3);
            if (result3.code == 200) {
                this.attrInfoList = result3.data
            }
        },
        handleSelectionChange(row){
            this.imageList = row // no isDefault attr
        },
        changeIsDefault(row){
            this.spuImageList.forEach(item => {
                item.isDefault = 0
            });
            row.isDefault = 1
            this.skuInfo.skuDefaultImg = row.imgUrl
        },
        cancel(){
            this.$emit('changeSkuFlag',0);
            Object.assign(this._data,this.$options.data())
        },
        async saveInfo(){
            const {attrInfoList,skuInfo,spuSaleAttrList,imageList} = this
            
            attrInfoList.forEach(element => {
                if (element.attrIdAndValueId) {
                    const [attrId,valueId] = element.attrIdAndValueId.split(':')
                    skuInfo.skuAttrValueList.push({attrId,valueId})
                }                                 
            });
            spuSaleAttrList.forEach(element => {
                if (element.attrIdAndValueId) {
                    const [attrId,valueId] = element.attrIdAndValueId.split(':')
                    skuInfo.skuSaleAttrValueList.push({attrId,valueId})
                }                                 
            });
            skuInfo.skuImageList = imageList.map(item=>{
                return {
                    imgName:item.imgName,
                    imgUrl:item.imgUrl,
                    isDefault:item.isDefault,
                    spuImgId:item.id
                }
            })

            let result = await this.$API.spu.reqAddSku(skuInfo)
            console.log(result);
            if (result.code == 200) {
                this.$message({type:'success',message:'保存成功'})
                this.$emit('changeSkuFlag',0)
            }
            Object.assign(this._data,this.$options.data())
        }
    },
};
</script>