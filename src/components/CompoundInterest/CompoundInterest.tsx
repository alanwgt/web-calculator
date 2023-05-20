import Style from './compound-interest.module.css';
import NumberInput from '../Input/NumberInput';
import Container from '../Container/Container';
import Flex from '../Flex/Flex';
import Button from '../Button/Button';
import { useState } from 'preact/hooks';
import InputWithSelect from './InputWithSelect';
import Select from '../Input/Select';

const DEFAULT_DATA = {
    initial_amount: '',
    monthly_amount: '',
    interest_rate: '',
    period: '',
    interest_rate_type: 'a.a',
    period_type: 'meses',
};

function calculateCompoundInterest(
    initialAmount,
    monthlyAmount,
    interestRate,
    rateType,
    periodInMonths
) {
    initialAmount = Number(initialAmount);
    monthlyAmount = Number(monthlyAmount);
    interestRate = Number(interestRate);
    periodInMonths = Number(periodInMonths);

    let totalAmount = initialAmount;
    let interestRatePerPeriod;

    // Check the rate type and convert it to an appropriate rate per period
    if (rateType === 'a.a') {
        interestRatePerPeriod = interestRate / 12 / 100;
    } else if (rateType === 'a.m') {
        interestRatePerPeriod = interestRate / 100;
    } else {
        return 'Invalid rate type. Please enter "month" or "year".';
    }

    // Calculate the compound interest for each month
    for (let i = 0; i < periodInMonths; i++) {
        totalAmount = totalAmount + totalAmount * interestRatePerPeriod;
        totalAmount = totalAmount + monthlyAmount;
    }

    return {
        totalAmount: totalAmount.toFixed(2),
        totalInterest: (
            totalAmount -
            initialAmount -
            monthlyAmount * periodInMonths
        ).toFixed(2),
        initialAmount: initialAmount.toFixed(2),
        monthlyAmount: monthlyAmount.toFixed(2),
        interestRate: interestRate.toFixed(2),
        periodInMonths: periodInMonths.toFixed(2),
        totalAmountCurrency: totalAmount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }),
        totalInterestCurrency: (
            totalAmount -
            initialAmount -
            monthlyAmount * periodInMonths
        ).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }),
        totalInvested: (initialAmount + monthlyAmount * periodInMonths).toFixed(
            2
        ),
        totalInvestedCurrency: (
            initialAmount +
            monthlyAmount * periodInMonths
        ).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }),
    };
}

const CompoundInterest = () => {
    const [result, setResult] = useState(null);
    const [data, setData] = useState({
        ...DEFAULT_DATA,
    });

    const handleChange = ({ id, value }) => {
        setData({ ...data, [id]: value });
    };

    return (
        <Container variant="primary">
            <NumberInput
                label="Valor inicial"
                id="initial_amount"
                onChange={handleChange}
                value={data.initial_amount}
                placeholder="R$ 0,00"
            />
            <NumberInput
                label="Valor mensal"
                id="monthly_amount"
                onChange={handleChange}
                value={data.monthly_amount}
                placeholder="R$ 0,00"
            />
            <InputWithSelect>
                <NumberInput
                    label="Taxa de juros (%)"
                    id="interest_rate"
                    onChange={handleChange}
                    value={data.interest_rate}
                    placeholder="5"
                />
                <Select
                    options={['a.a', 'a.m']}
                    onChange={handleChange}
                    id="interest_rate_type"
                    value={data.interest_rate_type}
                />
            </InputWithSelect>
            <InputWithSelect>
                <NumberInput
                    label="Período em"
                    id="period"
                    onChange={handleChange}
                    value={data.period}
                    placeholder="12"
                />
                <Select
                    options={['meses', 'anos']}
                    onChange={handleChange}
                    id="period_type"
                    value={data.period_type}
                />
            </InputWithSelect>
            <Flex justify="flex-end" gap="10px">
                <Button
                    variant="text"
                    onClick={() => {
                        setData({ ...DEFAULT_DATA });
                        setResult(null);
                    }}
                >
                    limpar
                </Button>
                <Button
                    variant="filled"
                    onClick={() => {
                        const result = calculateCompoundInterest(
                            data.initial_amount,
                            data.monthly_amount,
                            data.interest_rate,
                            data.interest_rate_type,
                            data.period_type === 'meses'
                                ? data.period
                                : data.period * 12
                        );
                        setResult(result);
                    }}
                >
                    calcular
                </Button>
            </Flex>
            {result && (
                <Container variant="tertiary" className={Style.result}>
                    <div className={Style.container}>
                        <p className={Style.label}>Valor investido:</p>
                        <p className={Style.value}>{result.totalInvestedCurrency}</p>
                    </div>
                    <div className={Style.container}>
                        <p className={Style.label}>Valor dos juros:</p>
                        <p className={Style.value}>{result.totalInterestCurrency}</p>
                    </div>
                    <div className={Style.container}>
                        <p className={Style.label}>Valor total:</p>
                        <p className={Style.value}>{result.totalAmountCurrency}</p>
                    </div>
                </Container>
            )}
        </Container>
    );
};

export default CompoundInterest;
