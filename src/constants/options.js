const genderOptions = [
  { value: 'FEM', label: 'Feminino' },
  { value: 'MASC', label: 'Masculino' },
  { value: '-', label: 'Outro' },
]
const typeUserOptions = [
  { value: 'PF', label: 'Pessoa física' },
  { value: 'PJ', label: 'Pessoa jurídica' },
]
const personType = [
  { value: 1, label: 'Guia de turismo' },
  { value: 2, label: 'Agente de turismo' },
  { value: 0, label: 'Outros' },
]
const corporateType = [
  { value: 1, label: 'Microempreendedor' },
  { value: 2, label: 'Agencia de turismo' },
  { value: 0, label: 'Outros' },
]
const paymentType = [
  { value: 1, isInstallable: false, label: 'Dinheiro', _value: 'MONEY' },
  { value: 2, isInstallable: true, label: 'Cartão de crédito', _value: 'CREDITCARD' },
  { value: 3, isInstallable: false, label: 'Cartão de débito', _value: 'DEBIT' },
  { value: 4, isInstallable: true, label: 'Boleto', _value: 'PAYMENTBANKSLIP' },
  { value: 5, isInstallable: false, label: 'Transferência', _value: 'BANKTRANSFER' },
]

exports.genderOptions = genderOptions
exports.typeUserOptions = typeUserOptions
exports.personType = personType
exports.corporateType = corporateType
exports.paymentType = paymentType
