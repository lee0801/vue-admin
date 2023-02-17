<template>
    <div>
        <el-form ref="form"
            label-width="80px"
            :model="spu">
            <el-form-item label="SPU名称">
                <el-input placeholder="SPU名称"
                    v-model="spu.spuName"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select placeholder="请选择品牌"
                    v-model="spu.tmId">
                    <el-option :label="tm.tmName"
                        :value="tm.id"
                        v-for="(tm, index) in tradeMarkList"
                        :key="tm.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea"
                    rows="4"
                    placeholder="描述"
                    v-model="spu.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <el-upload action="/dev-api/admin/product/fileUpload"
                    list-type="picture-card"
                    :file-list="spuImageList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handlerSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%"
                        :src="dialogImageUrl"
                        alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`"
                    v-model="attrIdAndName">
                    <el-option :lable="unselect.name"
                        :value="`${unselect.id}:${unselect.name}`"
                        v-for="(unselect, index) in unSelectSaleAttr"
                        :key="unselect.id">
                    </el-option>
                </el-select>
                <el-button type="primary"
                    icon="el-icon-plus"
                    :disabled="!attrIdAndName"
                    @click="addSaleAttr">
                    添加销售属性
                </el-button>
                <!-- 展示销售属性 -->
                <el-table style="width: 100%"
                    border
                    :data="spu.spuSaleAttrList">
                    <el-table-column type="index"
                        label="序号"
                        width="80"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="saleAttrName"
                        label="属性名"
                        width="width">
                    </el-table-column>

                    <el-table-column prop="prop"
                        label="属性值列表"
                        width="width">
                        <template slot-scope="{row,$index}">
                            <el-tag :key="tag.id"
                                v-for="(tag, index) in row.spuSaleAttrValueList"
                                closable
                                :disable-transitions="false"
                                @close="row.spuSaleAttrValueList.splice(index, 1)">
                                {{ tag.saleAttrValueName }}
                            </el-tag>
                            <el-input class="input-new-tag"
                                v-if="row.inputVisible"
                                v-model="row.inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="$event.target.blur"
                                @blur="handleInputConfirm(row)">
                            </el-input>
                            <el-button v-else
                                class="button-new-tag"
                                size="small"
                                @click="addSaleAttrValue(row)">添加
                            </el-button>
                        </template>
                    </el-table-column>

                    <el-table-column prop="spuName"
                        label="操作"
                        width="width">
                        <template slot-scope="{row,$index}">
                            <el-button type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="spu.spuSaleAttrList.splice($index, 1)">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                    @click="addOrUpdateSpu">保存</el-button>
                <el-button @click="cancle">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'SpuForm',
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            spu: {
                category3Id: 0,
                description: '',
                spuName: "",
                tmId: '',
                spuImageList: [
                    /* {
                        id: 0,
                        imgName:"" ,
                        imgUrl: '',
                    spuId: 0
                    } */
                ],
                spuSaleAttrList: [
                    /* {
                        baseSaleAttrId: 0,
                        id: 0,
                        saleAttrName: "",
                        spuId: 0,
                        spuSaleAttrValueList: [
                            {
                                baseSaleAttrId: 0,
                                id: 0,
                                isChecked: "",
                                saleAttrName: "",
                                saleAttrValueName: "",
                                spuId: 0
                            }
                        ]
                    } */
                ]
            },
            tradeMarkList: [],
            spuImageList: [],
            saleAttrList: [],
            attrIdAndName: '',

            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: ''
        };
    },
    methods: {
        // 删除图片触发 file->删除的图片  fileList-> 剩下的图片
        handleRemove(file, fileList) {
            this.spuImageList = fileList
            // console.log(file, fileList);
        },
        // 预览图片触发
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 上传成功的回调
        handlerSuccess(response, file, fileList) {
            console.log(response, file, fileList);
        },
        async initSpuData(spu) {
            let spuResult = await this.$API.spu.reqSpu(spu.id)
            if (spuResult.code == 200) {
                this.spu = spuResult.data
            }
            let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
            if (tradeMarkResult.code == 200) {
                this.tradeMarkList = tradeMarkResult.data
            }
            let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
            if (spuImageResult.code == 200) {
                let listArr = spuImageResult.data
                listArr.forEach(item => {
                    item.name = item.imgName
                    item.url = item.imgUrl
                });
                this.spuImageList = listArr
            }
            let saleResult = await this.$API.spu.reqBaseSaleAttrList()
            if (saleResult.code == 200) {
                this.saleAttrList = saleResult.data
            }
        },
        handleInputConfirm(row) {
            const { baseSaleAttrId, inputValue } = row
            // this.$refs.saveTagInput.focus()
            if (inputValue.trim() == '') {
                this.$message('不能为空')
                this.$refs.saveTagInput.focus()
                return
            }
            let res = row.spuSaleAttrValueList.some(item => item.saleAttrValueName.trim() == inputValue.trim())
            if (res) {
                this.$message('不能重复')
                this.$refs.saveTagInput.focus()
                return
            }
            let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
            row.spuSaleAttrValueList.push(newSaleAttrValue)
            row.inputVisible = false
        },
        // 添加销售属性
        addSaleAttr() {
            const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':')
            let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
            this.spu.spuSaleAttrList.push(newSaleAttr)
            this.attrIdAndName = ''
        },
        addSaleAttrValue(row) {
            this.$set(row, 'inputVisible', true);
            this.$set(row, 'inputValue', '');
        },
        async addOrUpdateSpu() {
            // console.log('aaaa');
            this.spu.spuImageList = [],
                this.spu.spuImageList = this.spuImageList.map(item => {
                    return {
                        imgName: item.name,
                        imgUrl: (item.response && item.response.data) || item.url
                    }
                })
            let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
            if (result.code == 200) {
                this.$message({ type: 'success', message: '保存成功' })
                this.$emit('changeFlag', {flag:0,choice:this.spu.id?'修改':'添加'})
            }
            Object.assign(this._data,this.$options.data())
        },
        async addSPUData(category3Id) {
            this.spu.category3Id = category3Id
            // console.log('aa');
            let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
            if (tradeMarkResult.code == 200) {
                this.tradeMarkList = tradeMarkResult.data
            }
            let saleResult = await this.$API.spu.reqBaseSaleAttrList()
            if (saleResult.code == 200) {
                this.saleAttrList = saleResult.data
            }
        },
        cancle(){
            this.$emit('changeFlag', {flag:0,choice:''})
            Object.assign(this._data,this.$options.data())
        }
    },
    computed: {
        unSelectSaleAttr() {
            return this.saleAttrList.filter(item => {
                return this.spu.spuSaleAttrList.every(item1 => {
                    return item.name != item1.saleAttrName
                })
            })
        }
    }
};
</script>

<style>
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>