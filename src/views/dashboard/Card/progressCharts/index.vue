<template>
    <div class="charts"
        ref="charts">
        </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: '',
    mounted() {
        let progressCharts = echarts.init(this.$refs.charts)
        progressCharts.setOption({
            xAxis: {
                show: false,
                min: 0,
                max: 100
            },
            yAxis: {
                show: false,
                type: 'category'
            },
            series: [
                {
                    type:'bar',
                    data: [78],
                    color: 'red',
                    barWidth:10,
                    color:'skyblue',
                    showBackground:true,
                    backgroundStyle:{
                        color:'#EEE'
                    },
                    label:{
                        show:true,
                        formatter:'|',
                        position:'right'
                    }
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            },
        })
    },
};
</script>

<style >
.charts {
    width: 100%;
    height: 100%;
}
</style>