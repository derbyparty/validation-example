module.exports = {
  schemas: {
    products: {
      fields: {
        name: {
          type: 'string',
          validators: {
            required: true,
            min: 6
          }
        },
        price: {
          type: 'string'
        }
      }
    }
  }
}