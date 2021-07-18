import React from 'react'
import { useTable } from 'react-table'


export default function TransactionsComponent() {
    const data = React.useMemo(
        () => [
            {
                wallet: '0x9aFf..20a3',
                amount: '5 DAI',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x1223...213a',
                amount: '5 USDC',
                duration: '3 months',
                support: 'stream',
            },
            {
                wallet: 'shawman.ens',
                amount: '0.5 ETH',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x9aFf..20a3',
                amount: '5 DAI',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x1223...213a',
                amount: '5 USDC',
                duration: '3 months',
                support: 'stream',
            },
            {
                wallet: 'shawman.ens',
                amount: '0.5 ETH',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x9aFf..20a3',
                amount: '5 DAI',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x1223...213a',
                amount: '5 USDC',
                duration: '3 months',
                support: 'stream',
            },
            {
                wallet: 'shawman.ens',
                amount: '0.5 ETH',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x9aFf..20a3',
                amount: '5 DAI',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x9aFf..20a3',
                amount: '5 DAI',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x1223...213a',
                amount: '5 USDC',
                duration: '3 months',
                support: 'stream',
            },
            {
                wallet: 'shawman.ens',
                amount: '0.5 ETH',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x9aFf..20a3',
                amount: '5 DAI',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x1223...213a',
                amount: '5 USDC',
                duration: '3 months',
                support: 'stream',
            },
            {
                wallet: 'shawman.ens',
                amount: '0.5 ETH',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x9aFf..20a3',
                amount: '5 DAI',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x1223...213a',
                amount: '5 USDC',
                duration: '3 months',
                support: 'stream',
            },
            {
                wallet: 'shawman.ens',
                amount: '0.5 ETH',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x9aFf..20a3',
                amount: '5 DAI',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x1223...213a',
                amount: '5 USDC',
                duration: '3 months',
                support: 'stream',
            },
            {
                wallet: 'shawman.ens',
                amount: '0.5 ETH',
                duration: '-',
                support: 'one-timer',
            },
            {
                wallet: '0x9aFf..20a3',
                amount: '5 DAI',
                duration: '-',
                support: 'one-timer',
            },
            

        ],
        []

    )

    const columns = React.useMemo(

        () => [
            {
                Header: 'Supporter',
                accessor: 'wallet', // accessor is the "key" in the data
            },
            {
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Kind',
                accessor: 'support',
            },
            {
                Header: 'Duration',
                accessor: 'duration',
            },
        ],
        []
    )
    const tableInstance = useTable({ columns, data })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (

        // apply the table props
        <table className="text-left w-full bg-white" {...getTableProps()}>
            <thead className=" flex w-full p-2">
                {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                        // Apply the header row props
                        <tr  className="flex w-full mb-4" {...headerGroup.getHeaderGroupProps()}>
                            {// Loop over the headers in each row
                                headerGroup.headers.map(column => (
                                    // Apply the header cell props
                                    <th className =" px-4 py-2 w-1/4" {...column.getHeaderProps()}>
                                        {// Render the header
                                            column.render('Header')}
                                    </th>
                                ))}
                        </tr>
                    ))}
            </thead>
            {/* Apply the table body props */}
            <tbody className="flex flex-col items-center justify-between overflow-y-scroll w-full h-80" {...getTableBodyProps()}>
                {// Loop over the table rows
                    rows.map(row => {
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                            // Apply the row props
                            <tr className="flex w-full" {...row.getRowProps()}>
                                {// Loop over the rows cells
                                    row.cells.map(cell => {
                                        // Apply the cell props
                                        return (
                                            <td className =" px-4 py-3 w-1/4 border-t" {...cell.getCellProps()}>
                                                {// Render the cell contents
                                                    cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}
