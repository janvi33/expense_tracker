import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';
import { dollar } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalContext';
import History from '../History/History';

function Dashboard() {
    const {totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() =>{
        getIncomes()
        getExpenses()
    }, [])
    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className='stats-con'>
                    <div className='chart-con'>
                        <Chart />
                        <div className='amount-con'>
                            <div className='income'>
                              <h2>Total Income</h2>
                              <p>
                                {dollar} {totalIncome()}
                              </p>
                            </div>
                            <div className='expense'>
                              <h2>Total Expense</h2>
                              <p>
                                  {dollar} {totalExpenses()}
                              </p>
                            </div>
                            <div className='balance'>
                              <h2> Total Balance</h2>
                              <p>
                                {dollar} {totalBalance()}
                              </p>
                            </div>
                        </div>
                    </div>
                    <div className='history-con'>
                        <History />
                        <h2 className='salary-title'>Min <span>Salary</span>Max</h2>
                        <div className='salary-items'>
                            <p>
                                {Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                                {Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className='salary-title'>Min <span>Expense</span>Max</h2>
                        <div className='salary-items'>
                            <p>
                                {Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                                {Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
                  </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                  grid-column: span 2;
                }
                .income, .expense, .balance{
                  background: #FCF6F9;
                  border: 2px solid #FFFFFF;
                  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
                  padding: 1rem;
                  border-radius: 20px;
                  p{
                    font-size: 3.5rem;
                    font-weight: 700;        
                  }
                }
                .income{
                  p{
                    color: var(--color-green);
                  }
                }
                .expense{
                  p{
                    color: red;
                  }
                }
                .balance{
                  grid-column: 2 / 4;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  p{
                      color: rgba(160, 32, 240, 0.9);
                      opacity: 0.6rem;
                      font-size: 4.5rem;
                  }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
              .salary-title{
                  font-size: 1.2rem;
                  span{
                    font-size: 1.8rem;
                  }
              }
              .salary-items{
                  background: #FCF6F9;
                  border: 2px solid #FFFFFF;
                  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
                  padding: 1rem;
                  border-radius: 20px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  p{
                      font-size: 1.6rem;
                      font-weight: 600;
                  }
              }
        }


    }
`;

export default Dashboard