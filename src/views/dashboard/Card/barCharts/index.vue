<template>
    <div class="charts"
        ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: '',
    mounted() {
        let barCharts = echarts.init(this.$refs.charts)
        barCharts.setOption({
            xAxis: {
                type: 'category',
                show: false
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    type: 'bar',
                    data: [10, 30, 20, 35, 10, 19, 5, 50],
                    color:'yellow'
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            },
            tooltip:{}
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