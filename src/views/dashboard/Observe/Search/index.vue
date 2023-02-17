<template>
    <el-card shadow="always"
        :body-style="{ padding: '20px' }">
        <div slot="header"
            class="clearfix">
            <span>线上热门搜索</span>
            <!-- <i class="el-icon-more"></i> -->
            <el-dropdown>
                <span>
                    <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item>双皮奶</el-dropdown-item>
                    <el-dropdown-item>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="main">
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="title-l">
                        <span>搜索用户数</span>
                        <i class="el-icon-warning-outline"></i>
                    </div>
                    <div class="trend-l">
                        <span>12532</span>
                        <span class="trend-per">11.3%
                            <i class="el-icon-caret-top"
                                style="color: greenyellow;"></i>
                            <i class="el-icon-caret-bottom"
                                style="color: red;"></i>
                        </span>
                    </div>
                    <div class="lineCharts1"
                        ref="lineCharts1">

                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="title-r">
                        <span>趋势</span>
                        <i class="el-icon-warning-outline"></i>
                    </div>
                    <div class="trend-r">
                        <span>532</span>
                        <span class="trend-per">9.3%
                            <i class="el-icon-caret-top"
                                style="color: greenyellow;"></i>
                            <i class="el-icon-caret-bottom"
                                style="color: red;"></i>
                        </span>
                    </div>
                    <div class="lineCharts2"
                        ref="lineCharts2">

                    </div>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-table :data="tableData"
                style="width: 100%"
                border>
                <el-table-column prop="prop"
                    label="排名"
                    width="80"
                    type="index">
                </el-table-column>
                <el-table-column prop="prop"
                    label="搜索关键字"
                    width="100">
                </el-table-column>
                <el-table-column prop="prop"
                    label="用户数"
                    sortable>
                </el-table-column>
                <el-table-column prop="prop"
                    label="周涨幅"
                    sortable>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination layout="prev, pager, next"
                :total="1000" >
            </el-pagination>
        </div>
</el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: '',

    data() {
        return {
            tableData: []
        };
    },

    mounted() {
        let myChart1 = echarts.init(this.$refs.lineCharts1);
        let myChart2 = echarts.init(this.$refs.lineCharts2);
        let option1;
        let option2;

        option1 = {
            xAxis: {
                type: 'category',
                show: false
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    type: 'line',
                    data: [10, 30, 20, 35, 10, 19, 5, 50],
                    itemStyle: {
                        opacity: 0
                    },
                    lineStyle: {
                        color: 'red'
                    },
                    smooth: true,
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'red' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'white' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            }
        };

        option2 = {
            xAxis: {
                type: 'category',
                show: false
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    type: 'line',
                    data: [10, 50, 29, 15, 20, 39, 35, 10],
                    itemStyle: {
                        opacity: 0
                    },
                    lineStyle: {
                        color: 'blue'
                    },
                    smooth: true,
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'blue' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'white' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            }
        };

        option1 && myChart1.setOption(option1);
        option2 && myChart2.setOption(option2);
    },

    methods: {

    },
};
</script>

<style scoped>
.el-dropdown {
    display: block;
    float: right;
}

.lineCharts1,
.lineCharts2 {
    width: 100%;
    height: 50px;
}

.title-l span,
.title-r span {
    margin-right: 20px;
}

.trend-l span,
.trend-r span {
    margin-right: 30px;
}

.trend-per {
    font-size: 16px;
    color: rgb(168, 159, 159);
}

.el-pagination{
    float: right;
}
</style>