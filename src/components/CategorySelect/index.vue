<template>
    <div>
        <el-form :inline="true" class="demo-form-inline" :model="cForm">
            <el-form-item label="一级分类">
                <el-select :disabled="show" placeholder="请选择" v-model="cForm.category1Id" @change="handler1">
                    <el-option v-for="(c1, index) in list1" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select :disabled="show" placeholder="请选择" v-model="cForm.category2Id" @change="handler2">
                    <el-option v-for="(c2, index) in list2" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select :disabled="show" placeholder="请选择" v-model="cForm.category3Id" @change="handler3">
                    <el-option v-for="(c3, index) in list3" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'CategorySelect',
    props:['show'],
    data() {
        return {
            list1: [],
            list2: [],
            list3: [],
            cForm: {
                category1Id: '',
                category2Id: '',
                category3Id: '',
            }
        };
    },
    mounted() {
        this.getCategoryList()
    },
    methods: {
        async getCategoryList() {
            let result = await this.$API.attr.reqCategory1List()
            //    console.log(result);
            if (result.code == 200) {
                this.list1 = result.data
            }
        },
        async handler1() {
            this.list2 = []
            this.list3 = []
            this.cForm.category2Id = ''
            this.cForm.category3Id = ''
            const { category1Id } = this.cForm
            this.$emit('getCategotyId', {categoryId:category1Id,level:1});
            let result = await this.$API.attr.reqCategory2List(category1Id)
            if (result.code == 200) {
                this.list2 = result.data
            }
        },
        async handler2() {
            this.list3 = []
            this.cForm.category3Id = ''
            const { category2Id } = this.cForm
            this.$emit('getCategotyId', {categoryId:category2Id,level:2});
            let result = await this.$API.attr.reqCategory3List(category2Id)
            if (result.code == 200) {
                this.list3 = result.data
            }
        },
        handler3() {
            const { category3Id } = this.cForm
            this.$emit('getCategotyId', {categoryId:category3Id,level:3});
            
        }
    },
};
</script>

<style lang="scss" scoped>

</style>