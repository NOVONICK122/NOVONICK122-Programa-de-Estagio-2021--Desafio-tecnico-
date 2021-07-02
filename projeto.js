const eventList = []
const vendorList = []
const data = {
  productList: [
    {
      name: 'joia',
      codigo: '000'
    },
    {
      name: 'brinquedos',
      codigo: '888'
    },
    {
      name: 'livros',
      codigo: '111'
    },
    {
      name: 'eletronicos',
      codigo: '333'
    },
    {
      name: 'bebidas',
      codigo: '555'
    }
  ],
  region: [
    {
      name: 'Centro-oeste',
      codigo: '111'
    },
    {
      name: 'Nordeste',
      codigo: '333'
    },
    {
      name: 'Norte',
      codigo: '555'
    },
    {
      name: 'Sudeste',
      codigo: '888'
    },
    {
      name: 'Sul',
      codigo: '000'
    }
  ],
  codeLoggi: [
    {
      name: 'Loggi',
      codigo: '555'
    }
  ]
}

let codeBarData = {}

/*  CAPTURE Events*/
const form = document.querySelector('#formulario')

form.addEventListener('submit', function (e) {
  e.preventDefault()

  codeBarData = {
    destination: '',
    origin: '',
    codeLoggi: '',
    typeProduct: '',
    valid: {
      isValid: true,
      messages: []
    }
  }

  const inputDetails = e.target.querySelector('#details')

  const info = String(inputDetails.value)

  if (info.length !== 15 || !Number(info)) {
    codeBarData.valid.isValid = false
    codeBarData.valid.messages.push('Por favor insira um código com 15 dígitos')
    document.getElementById('resultado').innerHTML = codeBarData.valid.messages
  } else {
    const arrayWithThreeCrack = info.match(/.{1,3}/g)

    codeBarData.origin = data.region.find(
      d => d.codigo === arrayWithThreeCrack[0]
    )

    codeBarData.destination = data.region.find(
      d => d.codigo === arrayWithThreeCrack[1]
    )

    codeBarData.codeLoggi = data.codeLoggi.find(
      d => d.codigo === arrayWithThreeCrack[2]
    )

    codeBarData.codeSeller = arrayWithThreeCrack[3]
    var exists = false

    codeBarData.typeProduct = data.productList.find(
      d => d.codigo === arrayWithThreeCrack[4]
    )
    verifyConditionalsValidCode(codeBarData)

    if (codeBarData.valid.isValid) {
      vendorList.forEach(function (item) {
        if (codeBarData.codeSeller === item.codigo) {
          item.quantidade = item.quantidade + 1
          exists = true
        }
      })
      if (exists === false) {
        const vendor = {
          codigo: codeBarData.codeSeller,
          quantidade: 1
        }
        vendorList.push(vendor)
      }
    }
    console.log(vendorList)

    var quantidade = 0
    vendorList.forEach(function (item) {
      if (item.codigo === codeBarData.codeSeller) {
        quantidade = item.quantidade
      }
    })
    if (codeBarData.valid.isValid) {
      document.getElementById('resultado').innerHTML =
        'A origem do produto é do ' +
        codeBarData.origin.name +
        ' com direção para ' +
        codeBarData.destination.name +
        ' e possui o Código LOGGI de número ' +
        codeBarData.codeLoggi.codigo +
        ' e partiu do vendedor ' +
        codeBarData.codeSeller +
        ' e é um produto do tipo ' +
        codeBarData.typeProduct.name +
        ' e esse vendedor já vendeu ' +
        quantidade +
        ' produto(s)'

      eventList.push(codeBarData)
    } else {
      document.getElementById('resultado').innerHTML =
        codeBarData.valid.messages
    }

    myFunction()
    document.getElementById('details').value = ''
  }
})

function myFunction() {
  document.getElementById('event-list').innerHTML = ''

  eventList.forEach(function (item) {
    document.getElementById('event-list').innerHTML +=
      '<li>' +
      'A origem do produto é do ' +
      item.origin.name +
      ' com direção para ' +
      item.destination.name +
      ' e possui o Código LOGGI de número ' +
      item.codeLoggi.codigo +
      ' e partiu do vendedor ' +
      item.codeSeller +
      ' e é um produto do tipo ' +
      item.typeProduct.name +
      '</li>'
  })
}

function verifyConditionalsValidCode(codeBarData) {
  if (
    codeBarData.origin.name === 'Centro-oeste' &&
    codeBarData.typeProduct === 'Jóias'
  ) {
    codeBarData.valid.isValid = false
    codeBarData.valid.messages.push('Destino centro oeste não entrega Jóias')
  }

  if (codeBarData.codeSeller === '584') {
    codeBarData.valid.isValid = false
    codeBarData.valid.messages.push('O vendedor 584 está com seu CNPJ inativo ')
  }

  if (codeBarData.typeProduct === undefined) {
    codeBarData.valid.isValid = false
    codeBarData.valid.messages.push('Tipo de produto não suportado')
  }

  console.log(codeBarData)
}
