// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

router.get('/alert', function (req, res) {
  res.render('alert', {
    style: 'alert',

    data: {
      message: 'Успішне виконання дії',
      info: 'Замовлення успішно було створено',
      success: true,
      linkBack: '/test-path',
      linkBackText: 'creation',
      linkList: '/test-path',
      linkListText: 'list',
    },
  })
})

// ================================================================

class ProductPurchase {
  static #list = []

  static #count = 0

  constructor(
    img,
    title,
    description,
    category,
    price,
    amount = 0,
  ) {
    this.id = ++ProductPurchase.#count
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.amount = amount
  }

  static add = (...data) => {
    const newProduct = new ProductPurchase(...data)

    this.#list.push(newProduct)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static getRandomList = (id) => {
    const filteredList = this.#list.filter(
      (product) => product.id !== id,
    )

    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )

    return shuffledList.slice(0, 3)
  }
}

ProductPurchase.add(
  '/img/comp-1.png',
  "Комп'ютер Artline Gaming X66 v22 (X66v22) AMD Ryzen 5 5600X",
  'AMD Ryzen 5 5600X (3.7 — 4.6 ГГц) / RAM 16 ГБ / HDD 2 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3060 Ti, 8 ГБ / без ОД / LAN / без ОС',
  [
    { id: 1, text: 'Готовий до відправлення' },
    { id: 2, text: 'Топ продажів' },
  ],
  39480,
  10,
)

ProductPurchase.add(
  '/img/comp-2.png',
  "Комп'ютер ARTLINE Gaming by ASUS TUF v119 (TUFv119) Intel",
  'Intel Core i9-13900KF (3.0 - 5.8 ГГц) / RAM 64 ГБ / SSD 2 ТБ (2 x 1 ТБ) / nVidia GeForce RTX 4070 Ti, 12 ГБ / без ОД / LAN / Wi-Fi / Bluetooth / без ОС',
  [{ id: 2, text: 'Топ продажів' }],
  113109,
  10,
)

ProductPurchase.add(
  '/img/comp-3.png',
  "Комп'ютер QUBE Ігровий (Ri510400FRTX306012GB1621)",
  'Intel Core i5-10400F (2.9 — 4.3 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 240 ГБ / nVidia GeForce RTX 3060, 12 ГБ / без ОД / LAN / без ОС',
  [{ id: 1, text: 'Готовий до відправлення' }],
  28999,
  10,
)

ProductPurchase.add(
  '/img/comp-1.png',
  "Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/",
  'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС',
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
  10,
)

ProductPurchase.add(
  '/img/comp-2.png',
  "Комп'ютер COBRA Advanced (I11F.8.H1S2.15T.13356) Intel",
  'Intel Core i3-10100F (3.6 - 4.3 ГГц) / RAM 8 ГБ / HDD 1 ТБ + SSD 240 ГБ / GeForce GTX 1050 Ti, 4 ГБ / без ОД / LAN / Linux',
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  17000,
  10,
)

ProductPurchase.add(
  '/img/comp-3.png',
  "Комп'ютер ARTLINE Gaming by ASUS TUF v119 (TUFv119)",
  'Intel Core i9-13900KF (3.0 - 5.8 ГГц) / RAM 64 ГБ / SSD 2 ТБ (2 x 1 ТБ) / nVidia GeForce RTX 4070 Ti, 12 ГБ / без ОД / LAN / Wi-Fi / Bluetooth / без ОС',
  [{ id: 1, text: 'Готовий до відправлення' }],
  113109,
  10,
)

// ================================================================

class Purchase {
  static DELIVERY_PRICE = 150
  static #BONUS_FACTOR = 0.1

  static #count = 0
  static #list = []

  static #bonusAccount = new Map()

  static getBonusBalance = (email) =>
    Purchase.#bonusAccount.get(email) || 0

  static calcBonusAmount = (value) =>
    Math.round(value * Purchase.#BONUS_FACTOR)

  static updateBonusBalance = (
    email,
    price,
    bonusUse = 0,
  ) => {
    const amount = this.calcBonusAmount(price)

    const currentBalance = Purchase.getBonusBalance(email)

    const updateBalance = currentBalance + amount - bonusUse

    Purchase.#bonusAccount.set(email, updateBalance)

    // console.log(email, updateBalance)

    return amount
  }

  constructor(data, product) {
    this.id = ++Purchase.#count

    this.firstname = data.firstname
    this.lastname = data.lastname

    this.phone = data.phone
    this.email = data.email

    this.comment = data.comment || null

    this.bonus = data.bonus || 0

    this.promocode = data.promocode || null

    this.totalPrice = data.totalPrice
    this.productPrice = data.productPrice
    this.deliveryPrice = data.deliveryPrice
    this.amount = data.amount

    this.product = product
  }

  static add = (...arg) => {
    const newPurchase = new Purchase(...arg)
    this.#list.push(newPurchase)
    return newPurchase
  }

  static getList = () => {
    return Purchase.#list
      .slice()
      .reverse()
      .map((purchase) => {
        return {
          id: purchase.id,
          title: purchase.product.title,
          totalPrice: purchase.totalPrice,
          bonus: Purchase.calcBonusAmount(
            purchase.totalPrice,
          ),
        }
      })
  }

  static getById = (id) =>
    Purchase.#list.find((item) => item.id === id)

  static updateById = (id, data) => {
    const purchase = Purchase.getById(id)

    if (purchase) {
      if (data.firstname)
        purchase.firstname = data.firstname
      if (data.lastname) purchase.lastname = data.lastname
      if (data.phone) purchase.phone = data.phone
      if (data.email) purchase.email = data.email

      return true
    } else {
      return false
    }
  }
}

// ================================================================

class Promocode {
  static #list = []

  constructor(name, factor) {
    this.name = name
    this.factor = factor
  }

  static add = (name, factor) => {
    const newPromocode = new Promocode(name, factor)
    this.#list.push(newPromocode)
    return newPromocode
  }

  static getByName = (name) =>
    this.#list.find((promo) => promo.name === name)

  static calc = (promo, price) => price * promo.factor
}

Promocode.add('SUMMER2023', 0.9)
Promocode.add('DISCOUNT50', 0.5)
Promocode.add('SALE25', 0.75)

// ================================================================

router.get('/purchase', function (req, res) {
  res.render('purchase-index', {
    style: 'purchase-index',

    data: {
      list: ProductPurchase.getList(),
    },
  })
})

router.get('/purchase-product', function (req, res) {
  const id = Number(req.query.id)

  res.render('purchase-product', {
    style: 'purchase-product',

    data: {
      list: ProductPurchase.getRandomList(id),
      product: ProductPurchase.getById(id),
    },
  })
})

router.post('/purchase-create', function (req, res) {
  const id = Number(req.query.id)
  const amount = Number(req.body.amount)

  if (amount < 1) {
    return res.render('alert', {
      style: 'alert',

      message: 'Error!',
      info: 'Incorrect item quantity',
      success: false,
      linkBack: `purchase-product?id=${id}`,
      linkBackText: 'purchase product',
    })
  }

  const product = ProductPurchase.getById(id)

  if (product.amount < 1) {
    return res.render('alert', {
      style: 'alert',

      message: 'Error!',
      info: 'This quantity is not available',
      success: false,
      linkBack: `purchase-product?id=${id}`,
      linkBackText: 'purchase product',
    })
  }

  const productPrice = product.price * amount
  const totalPrice = productPrice + Purchase.DELIVERY_PRICE
  const bonus = Purchase.calcBonusAmount(totalPrice)

  res.render('purchase-create', {
    style: 'purchase-create',

    data: {
      id: product.id,

      cart: [
        {
          text: `${product.title} (${amount} шт)`,
          price: productPrice,
        },
        {
          text: `Вартість доставки`,
          price: Purchase.DELIVERY_PRICE,
        },
      ],
      totalPrice,
      productPrice,
      deliveryPrice: Purchase.DELIVERY_PRICE,
      amount,
      bonus,
    },
  })
})

router.post('/purchase-submit', function (req, res) {
  const id = Number(req.query.id)

  let {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,

    firstname,
    lastname,
    email,
    phone,
    comment,

    promocode,
    bonus,
  } = req.body

  const product = ProductPurchase.getById(id)

  if (!product) {
    return res.render('alert', {
      style: 'alert',

      message: 'Error!',
      info: 'Product not found',
      success: false,
      linkBack: `purchase-list`,
      linkBackText: 'purchase list',
    })
  }

  if (product.amount < amount) {
    return res.render('alert', {
      style: 'alert',

      message: 'Error!',
      info: 'There are not so many products',
      success: false,
      linkBack: `purchase-list`,
      linkBackText: 'purchase list',
    })
  }

  totalPrice = Number(totalPrice)
  productPrice = Number(productPrice)
  deliveryPrice = Number(deliveryPrice)
  amount = Number(amount)
  bonus = Number(bonus)

  if (
    isNaN(totalPrice) ||
    isNaN(productPrice) ||
    isNaN(deliveryPrice) ||
    isNaN(amount) ||
    isNaN(bonus)
  ) {
    return res.render('alert', {
      style: 'alert',

      message: 'Error!',
      info: 'Incorrect data',
      success: false,
      linkBack: `purchase-list`,
      linkBackText: 'purchase list',
    })
  }

  if (!firstname || !lastname || !email || !phone) {
    return res.render('alert', {
      style: 'alert',

      message: 'Error!',
      info: 'Fill in required fields',
      success: false,
      linkBack: `purchase-list`,
      linkBackText: 'purchase list',
    })
  }

  if (bonus || bonus > 0) {
    const bonusAmount = Purchase.getBonusBalance(email)

    if (bonus > bonusAmount) {
      bonus = bonusAmount
    }

    Purchase.updateBonusBalance(email, totalPrice, bonus)

    totalPrice -= bonus

    // console.log('bonusAmount = ' + bonusAmount)
  } else {
    Purchase.updateBonusBalance(email, totalPrice, 0)
  }

  if (promocode) {
    promocode = Promocode.getByName(promocode)

    if (promocode) {
      totalPrice = Promocode.calc(promocode, totalPrice)
    }
  }

  if (totalPrice < 0) totalPrice = 0

  const purchase = Purchase.add(
    {
      totalPrice,
      productPrice,
      deliveryPrice,
      amount,
      bonus,

      firstname,
      lastname,
      email,
      phone,

      promocode,
      comment,
    },
    product,
  )

  // console.log(purchase)
  // console.log(Purchase.getList())

  res.render('alert', {
    style: 'alert',

    message: 'Success!',
    info: 'Purchase created!',
    success: true,
    linkBack: `purchase-list`,
    linkBackText: 'purchase list',
  })
})

router.get('/purchase-list', function (req, res) {
  res.render('purchase-list', {
    style: 'purchase-list',
    data: {
      list: Purchase.getList(),
    },
  })
})

router.get('/purchase-info', function (req, res) {
  const id = Number(req.query.id)
  const purchase = Purchase.getById(id)
  const bonus = Purchase.calcBonusAmount(
    purchase.totalPrice,
  )

  console.log('purchase: ', Purchase.getById(id))

  res.render('purchase-info', {
    style: 'purchase-info',
    data: {
      purchase: purchase,
      bonus: bonus,
    },
  })
})

router.get('/purchase-edit', function (req, res) {
  const id = Number(req.query.id)

  res.render('purchase-edit', {
    style: 'purchase-edit',
    data: {
      purchase: Purchase.getById(id),
    },
  })
})

router.post('/purchase-edit', function (req, res) {
  const id = Number(req.query.id)

  let { firstname, lastname, email, phone } = req.body

  const purchase = Purchase.getById(id)

  if (!purchase) {
    return res.render('alert', {
      style: 'alert',
      message: 'Error!',
      info: 'Order not found',
      success: false,
      linkBack: `purchase-list`,
      linkBackText: 'purchase list',
    })
  }

  const updateResult = Purchase.updateById(id, {
    firstname,
    lastname,
    email,
    phone,
  })

  if (!updateResult) {
    return res.render('alert', {
      style: 'alert',
      message: 'Error!',
      info: 'Failed to update order',
      success: false,
      linkBack: `purchase-list`,
      linkBackText: 'purchase list',
    })
  }

  res.render('alert', {
    style: 'alert',
    message: 'Success!',
    info: 'Order updated successfully!',
    success: true,
    linkBack: `purchase-list`,
    linkBackText: 'purchase list',
  })
})

// ================================================================
// ================================================================
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

      message: 'Success!',
      info: 'Product created!',
      success: true,
      linkBack: 'product-create',
      linkBackText: 'product create',
      linkList: 'product-list',
      linkListText: 'product list',
    })
  } else {
    res.render('alert', {
      style: 'alert',

      message: 'Error!',
      info: 'Failed to create product! Enter all fields!',
      success: false,
      linkBack: 'product-create',
      linkBackText: 'product create',
      linkList: 'product-list',
      linkListText: 'product list',
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

      message: 'Success!',
      info: 'Product updated!',
      success: true,
      linkBack: 'product-create',
      linkBackText: 'product create',
      linkList: 'product-list',
      linkListText: 'product list',
    })
  } else {
    res.render('alert', {
      style: 'alert',

      message: 'Error!',
      info: 'Product not found!',
      success: false,
      linkBack: 'product-create',
      linkBackText: 'product create',
      linkList: 'product-list',
      linkListText: 'product list',
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

      message: 'Success!',
      info: 'Product deleted!',
      success: true,
      linkBack: 'product-create',
      linkBackText: 'product create',
      linkList: 'product-list',
      linkListText: 'product list',
    })
  } else {
    res.render('alert', {
      style: 'alert',

      message: 'Error!',
      info: 'Product not found! Failed to delete product!',
      success: false,
      linkBack: 'product-create',
      linkBackText: 'product create',
      linkList: 'product-list',
      linkListText: 'product list',
    })
  }
})

// ================================================================
// ================================================================
// ================================================================

class User {
  static #list = []

  constructor(email, login, password) {
    this.email = email
    this.login = login
    this.password = password
    this.id = new Date().getTime()
  }

  verifyPassword = (password) => this.password === password

  static add = (user) => {
    this.#list.push(user)
  }

  static getList = () => this.#list

  static getByID = (id) =>
    this.#list.find((user) => user.id === id)

  static deleteByID = (id) => {
    const index = this.#list.findIndex(
      (user) => user.id === id,
    )
  }

  static updateByID = (id, data) => {
    const user = this.getByID(id)

    if (user) {
      this.update(user, data)
      return true
    } else {
      return false
    }
  }

  static update = (user, { email }) => {
    if (email) {
      user.email = email
    }
  }
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = User.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',

    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.post('/user-create', function (req, res) {
  const { email, login, password } = req.body

  const user = new User(email, login, password)

  User.add(user)

  res.render('success-info', {
    style: 'success-info',
    info: 'User created',
  })
})

// ================================================================

router.get('/user-delete', function (req, res) {
  const { id } = req.query

  User.deleteByID(Number(id))

  res.render('success-info', {
    style: 'success-info',
    info: 'User deleted',
  })
})

// ================================================================

router.post('/user-update', function (req, res) {
  const { email, password, id } = req.body

  let result = false

  const user = User.getByID(Number(id))

  if (user.verifyPassword(password)) {
    User.update(user, { email })
    result = true
  }

  res.render('success-info', {
    style: 'success-info',
    info: result ? 'User update' : 'Error update user',
  })
})

// Підключаємо роутер до бек-енду

module.exports = router
