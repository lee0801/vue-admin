<template>
    <el-card class="box-card">
        <!-- 头部 -->
        <div slot="header"
            class="clearfix">
            <!-- @tab-click="handleClick" -->

            <!-- 左侧 -->
            <el-tabs class="tab"
                v-model="activeName">
                <el-tab-pane label="销售额"
                    name="sale">
                </el-tab-pane>
                <el-tab-pane label="访问量"
                    name="visit">
                </el-tab-pane>
            </el-tabs>

            <!-- 右侧 -->
            <div class="right">
                <span @click="setDay">今日</span>
                <span @click="setWeek">本周</span>
                <span @click="setMonth">本月</span>
                <span @click="setYear">本年</span>
                <!-- v-model="value1" -->
                <el-date-picker v-model="date"
                    class="date"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
        </div>
        <!-- 内容 -->
        <div>
            <el-row :gutter="20">
                <el-col :span="18">
                    <div class="charts"
                        ref="charts"></div>
                </el-col>
                <!-- <el-col :span="18"
                    v-show="activeName === 'visit'">
                    <div class="visit"
                        ref="visit">

                    </div>
                </el-col> -->
                <el-col :span="6">
                    <div class="nav-right">
                        <h3>门店{{ title }}排名</h3>
                        <ul>
                            <li>
                                <span class="nav-rank">1</span>
                                <span>肯德基</span>
                                <span class="nav-num">1996</span>
                            </li>
                            <li>
                                <span class="nav-rank">2</span>
                                <span>肯德基</span>
                                <span class="nav-num">1996</span>
                            </li>
                            <li>
                                <span class="nav-rank">3</span>
                                <span>肯德基</span>
                                <span class="nav-num">1996</span>
                            </li>
                            <li>
                                <span class="nav-rank">4</span>
                                <span>肯德基</span>
                                <span class="nav-num">1996</span>
                            </li>
                            <li>
                                <span class="nav-rank">5</span>
                                <span>肯德基</span>
                                <span class="nav-num">1996</span>
                            </li>
                            <li>
                                <span class="nav-rank">6</span>
                                <span>肯德基</span>
                                <span class="nav-num">1996</span>
                            </li>
                            <li>
                                <span class="nav-rank">7</span>
                                <span>肯德基</span>
                                <span class="nav-num">1996</span>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>

        </div>
</el-card>
</template>

<script>
import * as echarts from 'echarts';
import dayjs from 'dayjs'
import { mapState } from 'vuex';
export default {
    name: 'Sale',

    data() {
        return {
            activeName: 'sale',
            myChart: null,
            date: [],
        };
    },
    computed: {
        title() {
            return this.activeName == 'sale' ? '销售额' : '访问量'
        },
        ...mapState({listState:state=>state.home.list})
    },
    mounted() {
        this.myChart = echarts.init(this.$refs.charts);
        let option;

        option = {
            title: {
                text: '销售额趋势'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    // data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十', '十一月', '十二月'],
                    data: [],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data:[] ,
                    // data: [10, 52, 200, 334, 390, 330, 220, 250, 289, 199, 360, 400],
                    color: 'yellowgreen'
                }
            ]
        };

        option && this.myChart.setOption(option);
    },
    watch: {
        title() {
            // this.myChart = echarts.init(this.$refs.charts);
            let option;

            option = {
                title: {
                    text: this.title
                },
                xAxis: [
                    {
                        // type: 'category',
                        // data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十', '十一月', '十二月'],
                        data: this.title == '销售额'?this.listState.orderFullYearAxis:this.listState.userFullYearAxis,
                        // axisTick: {
                        //     alignWithLabel: true
                        // }
                    }
                ],
                // yAxis: [
                //     {
                //         type: 'value'
                //     }
                // ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.title == '销售额'?this.listState.orderFullYear:this.listState.userFullYear,
                        // data: [10, 152, 300, 34, 90, 130, 220, 250, 89, 299, 260, 400],
                        color: 'red'
                    }
                ]
            };

            option && this.myChart.setOption(option);
        },
        listState(){
            let option;

        option = {
            title: {
                text: '销售额趋势'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    // data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十', '十一月', '十二月'],
                    data: this.listState.orderFullYearAxis,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data:this.listState.orderFullYear ,
                    // data: [10, 52, 200, 334, 390, 330, 220, 250, 289, 199, 360, 400],
                    color: 'yellowgreen'
                }
            ]
        };

        option && this.myChart.setOption(option);
        }
    },
    methods: {
        setDay() {
            const date = dayjs().format('YYYY-MM-DD')
            this.date = [date, date]
        },
        setWeek() {
            const start = dayjs().day(1).format('YYYY-MM-DD')
            const end = dayjs().day(7).format('YYYY-MM-DD')
            this.date = [start,end]
        },
        setMonth() { 
            const start = dayjs().startOf('month').format('YYYY-MM-DD')
            const end = dayjs().endOf('month').format('YYYY-MM-DD')
            this.date = [start,end]

        },
        setYear() { 
            const start = dayjs().startOf('year').format('YYYY-MM-DD')
            const end = dayjs().endOf('year').format('YYYY-MM-DD')
            this.date = [start,end]
        },
    },
};
</script>

<style>

</style>
<style scoped>
>>>.el-card__header {
    border-bottom: none;
}

.box-card {
    /* width: 480px; */
    margin-top: 10px;
}

.clearfix {
    display: flex;
    justify-content: space-between;
    position: relative;
}

.tab {
    width: 100%;
}

.right {
    position: absolute;
    right: 0;
}

.right span {
    margin: 0px 10px;
    display: inline-block;
}

.date {
    width: 250px;
    margin-left: 20px;
}

.charts {
    width: 100%;
    height: 300px;
}

/* .visit {
    width: 1200px;
    height: 300px;
} */

.nav-right>h3 {
    margin: 0;
    padding: 0;
    font-size: 16PX;
}

ul {
    list-style: none;
    width: 100%;
    height: 300px;
    margin: 0;
    padding: 0;
}

ul li {
    height: 10%;
    margin-top: 10px;
}

ul li span {
    margin: 0px 20px;
}

.nav-rank {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: black;
    color: white;
    text-align: center;
    margin-left: 0px;
    padding-left: 0px;
}

.nav-num {
    float: right;
}
</style>