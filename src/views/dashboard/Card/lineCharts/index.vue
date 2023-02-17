<template>
    <div class="charts"
        ref="charts">

</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: '',

    data() {
        return {

        };
    },

    mounted() {
        let lineCharts = echarts.init(this.$refs.charts)
        lineCharts.setOption({
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
                    data: [10, 30, 20, 35, 10,19,5,50],
                    itemStyle: {
                        opacity: 0
                    },
                    lineStyle: {
                        color: 'purple'
                    },
                    smooth:true,
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'purple' // 0% 处的颜色
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
        })
    },

    methods: {

    },
};
</script>

<style scoped>
.charts {
    width: 100%;
    height: 100%;
}
</style>