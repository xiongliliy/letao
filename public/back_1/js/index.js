$(function(){

//图表的配置
var echarts_left = echarts.init(document.querySelector('.echarts_left'));

// 指定图表的配置项和数据
var option1 = {
    title: {
        text: '2019销量状况'
    },
    tooltip: {},
    legend: {
        data:['销量','用户']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
    },{
        name: '用户',
        type: 'line',
        data: [10, 30, 100, 10, 15, 30]
    }]
};

// 使用刚指定的配置项和数据显示图表。
echarts_left.setOption(option1);

var echarts_right = echarts.init(document.querySelector('.echarts_right'));

option2 = {
    title : {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
        {
            name: '访问',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
 echarts_right.setOption(option2);
})


