import React from 'react'
import Content from '../template/Content'
import MoneyUnity from './MoneyUnity'
import axios from '../../config/axios'
import alienHappy from '../../assets/img/alien-happy.svg'
import alienMid from '../../assets/img/alien-mid.svg'
import alienBad from '../../assets/img/alien-bad.svg'
import './Money.css'

const defaultState = {
    moneyStatusImg: alienMid,
    moneyStatusText: 'Sem Status',
    moneyLastTransactionValue: 'R$ 0,00',
    moneyLastTransactionLocal: 'Sem transação',
    moneyAllTransactionsUser: [],
    local: '',
    tipo: '',
    valor: '',
    mes: 'janeiro',
    ano: '2020',
    error: ''
}

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@token')}`

export default class Money extends React.Component {

    state = { ...defaultState }

    componentDidMount = async () => {
        this.getLastUserTransaction()
        this.getAllUserTransactions()
        this.getUserTransactionState()
    }

    handleLocal = (e) => {
        this.setState({ local: e.target.value })
    }
    
    handleTipo = (e) => {
        this.setState({ tipo: e.target.value })
    }

    handleValor = (e) => {
        this.setState({ valor: e.target.value })
    }

    handleMes = (e) => {
        this.setState({ mes: e.target.value })
    }

    handleAno = (e) => {
        this.setState({ ano: e.target.value })
    }

    addNewTransaction = async (e) => {
        e.preventDefault()
        const { local, tipo, valor, mes, ano } = { ...this.state }

        if(!local || !tipo || !valor || !mes || !ano) {
            this.setState({ error: 'Preencha todos os campos!' })
            return
        }

        const user_id = localStorage.getItem('@user_id')

        const data = {
            local: this.state.local,
            tipo: this.state.tipo,
            valor: this.state.valor,
            mes: this.state.mes,
            ano: this.state.ano,
            user_id
        }
 
        const resultAPI = await axios.post('/money', data)

        if(resultAPI.status === 201) {
            this.componentDidMount()
        } else {
            this.setState({ error: 'Falha no cadastro!' })
        }
        this.setState({ local: '', tipo: '', valor: '', mes: '', ano: '' })
        
    }

    getLastUserTransaction = async () => {
        const user_id = localStorage.getItem('@user_id')
        await axios.get(`/money/last/${user_id}`)
            .then(lasttransact => {
                if(lasttransact.data.local && lasttransact.data.valor) {
                    if(lasttransact.data.tipo === 'Saldo' ) {
                        this.setState({ moneyLastTransactionLocal: lasttransact.data.local, 
                        moneyLastTransactionValue: `R$ +${Math.ceil(lasttransact.data.valor)},00` })
                    } else {
                       this.setState({ moneyLastTransactionLocal: lasttransact.data.local, 
                        moneyLastTransactionValue: `R$ -${Math.ceil(lasttransact.data.valor)},00` }) 
                    }
                }
            })
            .catch(error => this.setState({ moneyLastTransactionLocal: 'Sem transação', 
                moneyLastTransactionValue: 'RS 0,00' }))
    }

    getAllUserTransactions = async () => {
        const user_id = localStorage.getItem('@user_id')
        await axios.get(`/money/${user_id}`)
            .then(transaction => {
                if(transaction.data) this.setState({ moneyAllTransactionsUser: transaction.data })
            })
            .catch(error => this.setState({ moneyAllTransactionsUser: [] }))
    }

    getUserTransactionState = async () => {
        const sum = (acumulator, current) => acumulator + current.valor

        const user_id = localStorage.getItem('@user_id')
        const transaction = await axios.get(`/money/${user_id}`).then(tran => { return tran.data })

        const positive = transaction.filter(tran => tran.tipo === 'Saldo').reduce(sum, 0)
        const negative = transaction.filter(tran => tran.tipo === 'Gasto').reduce(sum, 0)
        const result = positive - negative

        if(result < 300) {
            this.setState({ moneyStatusImg: alienBad, moneyStatusText: `Valor atual: R$ ${Math.floor(result)},00` }) 
            return
        }
        if(result >= 300 && result < 500) {
            this.setState({ moneyStatusImg: alienMid, moneyStatusText: `Valor atual: R$ ${Math.floor(result)},00` }) 
            return
        }
        if(result >= 500) {
            this.setState({ moneyStatusImg: alienHappy, moneyStatusText: `Valor atual: R$ ${Math.floor(result)},00` }) 
            return
        }
    }

    render(){
        return(
            <Content>
                <div className='money'>

                    <div className='money-admin'>

                        <div className='money-info'>
                            <h2><i className="fa fa-line-chart" aria-hidden="true"></i> Seu Status Atual</h2>
                            <hr />
                            <div className='money-info-container'>
                                <div className='money-info-status'>
                                    <div className='money-info-status-img'>
                                        <img src={this.state.moneyStatusImg} alt='Status' />
                                        <p>{this.state.moneyStatusText}</p>
                                    </div>
                                    <div className='money-info-status-legend d-flex'>
                                        <p>Positivo: Acima de R$ 500</p>
                                        <p>Mediano: Acima de R$ 300</p>
                                        <p>Ruim: Abaixo de R$ 300</p>
                                    </div>
                                </div>
                                <div className='money-info-lasttransfer'>
                                    <p><i className="fa fa-refresh" aria-hidden="true"></i> Última Transação</p>
                                    <div className='money-info-lasttransfer-status d-flex'>
                                        <h3>{this.state.moneyLastTransactionValue}</h3>
                                        <h4>{this.state.moneyLastTransactionLocal}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='money-add'>
                            <h2><i className="fa fa-cart-plus" aria-hidden="true"></i> Cadastrar Transação</h2>
                            <hr />
                            <form name='moneyadd' autoComplete='off' autoCapitalize='off'>
                                <div className='row'>
                                    <label>Local</label>
                                    <input value={this.state.local} onChange={this.handleLocal} name='local' type='text' placeholder='local Gasto/Saldo' />
                                    <label>Tipo</label>
                                    <select value={this.state.tipo} onChange={this.handleTipo} name='tipo'>
                                        <option>Selecione...</option>
                                        <option value='Gasto'>Negativo</option>
                                        <option value='Saldo'>Positivo</option>
                                    </select>
                                </div>
                                <div className='row'>
                                    <label>Valor</label>
                                    <input value={this.state.valor} onChange={this.handleValor} name='valor' type='text' placeholder='R$ 0.00' />
                                    <label>Mes</label>
                                    <select value={this.state.mes} onChange={this.handleMes} name='mes'>
                                        <option>Selecione...</option>
                                        <option value='janeiro'>Janeiro</option>
                                        <option value='fevereiro'>Fevereiro</option>
                                        <option value='marco'>Março</option>
                                        <option value='abril'>Abril</option>
                                        <option value='maio'>Maio</option>
                                        <option value='junho'>Junho</option>
                                        <option value='julho'>Julho</option>
                                        <option value='agosto'>Agosto</option>
                                        <option value='setembro'>Setembro</option>
                                        <option value='outubro'>Outubro</option>
                                        <option value='novembro'>Novembro</option>
                                        <option value='dezembro'>Dezembro</option>
                                    </select>
                                    <label>Ano</label>
                                    <select value={this.state.ano} onChange={this.handleAno} name='ano'>
                                        <option>Selecione...</option>
                                        <option value='2020'>2020</option>
                                        <option value='2021'>2021</option>
                                        <option value='2022'>2022</option>
                                        <option value='2023'>2023</option>
                                        <option value='2024'>2024</option>
                                    </select>
                                </div>

                                <div className='row-btn'>
                                    <button type='reset' className='taskclear'>Limpar</button>
                                    <button onClick={this.addNewTransaction} type='submit' className='tasksubmit'>Cadastrar</button>
                                </div>
                                <p className='errField'>{this.state.error}</p>
                            </form>
                        </div>

                    </div>

                    <div className='money-content'>

                        <div className='money-status-header'>
                            <h2><i className="fa fa-credit-card" aria-hidden="true"></i> Ultimas Transações</h2>
                        </div>
                        <hr />

                           {/*Log here */} 
                           {
                               this.state.moneyAllTransactionsUser.map(data => {
                                   return <MoneyUnity key={data.id} status={data.tipo} local={data.local} valor={data.valor} mes={data.mes} ano={data.ano} tipo={data.tipo} />
                               })
                           }
                    </div>

                </div>
            </Content>
        )
    }
}