<template>
    <div>
        <el-row :gutter="20">
            <!-- 1111111111111111 -->
            <el-col :span="6">
                <el-card shadow="always">
                    <Detail title="总销售额" count="￥110086">
                        <template slot="charts">
                            <span>周同比56.67% <i class="el-icon-caret-top" style="color: greenyellow;"></i></span>
                            <span>日同比6.67% <i class="el-icon-caret-bottom" style="color: red;"></i></span>
                        </template>
                        <template slot="footer">
                            <span>日销售额 ￥1100</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <!-- 2222222222222222222222222 -->
            <el-col :span="6">
                <el-card shadow="always">
                    <Detail title="访问量" count="10086">
                        <template slot="charts">
                            <lineCharts></lineCharts>
                        </template>
                        <template slot="footer">
                            <span>日销访问量100</span>
                        </template>                        
                    </Detail>
                </el-card>
            </el-col>
            <!-- 3333333333333333333 -->
            <el-col :span="6">
                <el-card shadow="always">
                    <Detail title="支付笔数" count="10086">
                        <template slot="charts">
                            <barCharts></barCharts>
                        </template>
                        <template slot="footer">
                            <span>转化率65%</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <!-- 44444444444444444444444444444 -->
            <el-col :span="6">
                <el-card shadow="always">
                    <Detail title="运营活动效果" count="78%">
                        <template slot="charts">
                            <progressCharts></progressCharts>
                        </template>
                        <template slot="footer">
                            <span>周同比12% <i class="el-icon-caret-top" style="color: greenyellow;"></i></span>
                            <span>日同比11% <i class="el-icon-caret-bottom" style="color: red;"></i></span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
        </el-row>
</div>
</template>

<script>
import Detail from './Detail'
import lineCharts from './lineCharts'
import barCharts from './barCharts'
import progressCharts from './progressCharts'
export default {
    name: 'Card',
    components: {
        Detail,lineCharts,barCharts,progressCharts
    },
    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>