import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, SetIncomes] = useState([])
    const [expenses, SetExpenses] = useState([])
    const [error, setError] = useState(null)


    // calculate income
    const addIncomes = async (income) =>{
        const response = await axios.post(`${BASE_URL}add-incomes`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () =>{
        const response = await axios.get(`${BASE_URL}get-incomes`)
        SetIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncomes = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-incomes/${id}`)
        getIncomes()
    }


    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const addExpense = async (expense) =>{
        const response = await axios.post(`${BASE_URL}add-expense`, expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () =>{
        const response = await axios.get(`${BASE_URL}get-expenses`)
        SetExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }


    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            totalExpense = totalExpense + expense.amount
        })

        return totalExpense;
    }


    const totalBalance = () =>{
        return totalIncome() - totalExpenses()
    }


    const transactionHistory = () =>{
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 4)
    }


    return(
        <GlobalContext.Provider value={{
            addIncomes,
            getIncomes,
            incomes,
            deleteIncomes,
            totalIncome,
            addExpense,
            getExpenses,
            totalExpenses,
            deleteExpense,
            expenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}