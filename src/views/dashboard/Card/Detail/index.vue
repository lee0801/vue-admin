<template>
    <div>
        <div class="card-header"><span>{{ title }}</span>
            <i class="el-icon-warning-outline"></i>
        </div>
        <div class="card-content">{{ count }}</div>
        <div class="card-charts">
            <slot name="charts">

            </slot>
        </div>
        <div class="card-footer">
            <slot name="footer">

            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    props:['title','count'],
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

<style scoped>
    .card-header{
        display: flex;
        justify-content: space-between;
        color: rgb(196, 187, 187);
    }
    .card-content{
        font-size: 30px;
        padding: 10px 0px;
    }

    .card-charts{
        height: 50px;
    }

    .card-footer{
        border-top: 1px solid rgb(197, 192, 192);
        padding-top: 10px;
    }
</style>