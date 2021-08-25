module.exports = {
  babel: {
    plugins: [
        [
        'styled-jsx/babel',
          {
            plugins: [
                '@styled-jsx/plugin-sass'
            ]
          }
        ]
    ]
  },
  devServer(dev) {

    console.log(dev)

    dev.open = false

    return dev
  }
}
