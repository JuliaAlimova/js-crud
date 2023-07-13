// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []
  constructor(name, price, description) {
    this.id = Math.floor(Math.random() * 90000) + 10000
    this.createDate = new Date().toISOString()
    this.name = name
    this.price = price
    this.description = description
  }

  static getList = () => this.#list
  static add = (product) => this.#list.push(product)
  static getById = (id) =>
    this.#list.find((product) => product.id === id)
  static updateById = (
    id,
    { name, price, description },
  ) => {
    const productIndex = this.#list.findIndex(
      (product) => product.id === id,
    )

    if (productIndex !== -1) {
      const product = this.#list[productIndex]

      if (name && price && description) {
        product.name = name
        product.price = price
        product.description = description
        return true
      }
    }

    return false
  }
  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.get('/product-create', function (req, res) {
  res.render('product-create', {
    style: 'product-create',
  })
})

// ================================================================

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body

  if (name && price && description) {
    const product = new Product(name, price, description)
    Product.add(product)

    res.render('alert', {
      style: 'alert',
      info: 'Success! Product created!',
      success: true,
    })
  } else {
    res.render('alert', {
      style: 'alert',
      info: 'Error! Failed to create product! Enter all fields!',
      success: false,
    })
  }
})

// ================================================================

router.get('/product-list', function (req, res) {
  const list = Product.getList()

  res.render('product-list', {
    style: 'product-list',

    products: {
      list,
      isEmpty: list.length === 0,
    },
  })
})

// ================================================================

router.get('/product-edit', function (req, res) {
  const id = Number(req.query.id)
  const product = Product.getById(id)

  res.render('product-edit', {
    style: 'product-edit',
    product,
  })
})

// ================================================================

router.post('/product-edit', function (req, res) {
  const { id, name, price, description } = req.body

  const success = Product.updateById(Number(id), {
    name,
    price,
    description,
  })

  if (success) {
    res.render('alert', {
      style: 'alert',
      info: 'Success! Product updated!',
      success: true,
    })
  } else {
    res.render('alert', {
      style: 'alert',
      info: 'Error! Product not found!',
      success: false,
    })
  }
})

// ================================================================

router.get('/product-delete', function (req, res) {
  const id = Number(req.query.id)
  const success = Product.deleteById(id)

  if (success) {
    res.render('alert', {
      style: 'alert',
      info: 'Success! Product deleted!',
      success: true,
    })
  } else {
    res.render('alert', {
      style: 'alert',
      info: 'Error! Product not found! Failed to delete product!',
      success: false,
    })
  }
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
