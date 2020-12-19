/**
 *  postcss配置文件
 */ 

module.exports = {
    plugins: {
      autoprefixer: {
        browsers: ['Android >= 4.0', 'iOS >= 8'],
      },
      'postcss-pxtorem': {
        rootValue ({file}) {
          return file.includes('vant') ? 37.5 : 75
        },//根据文件路径是否包含vant字符串,包含就是vant的样式,设置1rem = 37.5px,没包含就是我们自己的样式,设置1rem = 75px
        propList: ['*'],
         exclude: 'github-markdown',
      },
    },
  };