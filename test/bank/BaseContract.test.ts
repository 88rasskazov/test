import { BaseContract } from '../../src/BaseContract'
import { DepositContract } from '../../src/BaseContract'
import { LoanContract } from '../../src/BaseContract'
import { InsuranceContract } from '../../src/BaseContract'

describe('tests BaseContract', () => {
  let contract: BaseContract

  beforeEach(() => {
    contract = new BaseContract('11', 'Petr', true)
  })
  afterEach(() => {
    contract.deactivate()
    console.log(
      `Contract ${contract.contractId} has been deactivated after test.`,
    )
  })
  test('All fields of BaseContract saves correctly', () => {
    expect(contract.contractId).toBe('11')
    expect(contract.clientName).toBe('Petr')
    expect(contract.isActive).toBe(true)
  })

  test('activate true', () => {
    contract.isActive = false
    contract.activate()
    expect(contract.isActive).toBeTruthy()
  })

  test('deactivate false', () => {
    contract.isActive = true
    contract.deactivate()
    expect(contract.isActive).toBeFalsy()
  })
})

describe('Tests DepositContract', () => {
  let contract: DepositContract

  beforeEach(() => {
    contract = new DepositContract('22', 'Ivan', true, 1000, 8)
  })

  afterEach(() => {
    contract.deactivate()
    console.log(
      `Contract ${contract.contractId} has been deactivated after test.`,
    )
  })

  test('All fields of DepositContract saves correctly', () => {
    expect(contract.contractId).toBe('22')
    expect(contract.clientName).toBe('Ivan')
    expect(contract.isActive).toBe(true)
    expect(contract.amount).toBe(1000)
    expect(contract.interestRate).toBe(8)
  })

  test('calculateInterest', () => {
    expect(contract.calculateInterest()).toBe(80)
  })
})

describe('Tests LoanContract', () => {
  let contract: LoanContract

  beforeEach(() => {
    contract = new LoanContract('33', 'Vasiliy', true, 1000, 8, 16)
  })

  afterEach(() => {
    contract.deactivate()
    console.log(
      `Contract ${contract.contractId} has been deactivated after test.`,
    )
  })

  test('All fields of LoanContract saves correctly', () => {
    expect(contract.contractId).toBe('33')
    expect(contract.clientName).toBe('Vasiliy')
    expect(contract.isActive).toBe(true)
    expect(contract.loanAmount).toBe(1000)
    expect(contract.monthlyPayment).toBe(8)
    expect(contract.loanTermMonths).toBe(16)
  })

  test('calculateTotalPayment returns correct value', () => {
    expect(contract.calculateTotalPayment()).toBe(128)
  })
})

describe('Tests InsuranceContract', () => {
  let contract: InsuranceContract

  beforeEach(() => {
    contract = new InsuranceContract('112233', 'Ivan', true, 'Health', 8, 7)
  })

  afterEach(() => {
    contract.deactivate()
    console.log(
      `Contract ${contract.contractId} has been deactivated after test.`,
    )
  })

  test('All fields of InsuranceContract saves correctly', () => {
    expect(contract.contractId).toBe('112233')
    expect(contract.clientName).toBe('Ivan')
    expect(contract.isActive).toBe(true)
    expect(contract.insuranceType).toBe('Health')
    expect(contract.premium).toBe(8)
    expect(contract.termYears).toBe(7)
  })

  test('calculateTotalPremium returns correct value', () => {
    expect(contract.calculateTotalPremium()).toBe(56)
  })
})
