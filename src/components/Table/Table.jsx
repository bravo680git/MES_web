import { useState, useMemo } from "react"
import { useTable, useSortBy } from "react-table"
import { HiPencil } from "react-icons/hi"
import { BiSortDown, BiSortUp } from "react-icons/bi"
import cl from "classnames"

function Table({ activable, onRowClick, onEdit, headers = [], body = [], className, primary, sticky }) {
    const [activeId, setActiveId] = useState(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const columns = useMemo(() => headers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = useMemo(() => body, [body.length])
    const tableInstance = useTable({ columns, data }, useSortBy)
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    const handleRowClick = (row) => {
        if (!onRowClick) return

        setActiveId(row.id)
        onRowClick(row.original.id ?? row.id)
    }

    const handleEdit = (e, row) => {
        e.stopPropagation()
        onEdit(row.original.id ?? row.id)
    }

    return (
        <div data-component="Table" className={cl(className)}>
            <table
                {...getTableProps()}
                className={cl("w-full table-auto", {
                    " border-separate border-spacing-y-2": !activable,
                    "rounded-lg shadow-sub": activable,
                })}
            >
                {activable ? (
                    <>
                        <thead
                            className={cl({
                                "sticky top-0 z-10": sticky,
                                "bg-primary-1": primary,
                                "bg-primary-2": !primary,
                            })}
                        >
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} className={cl("text-16-b text-neutron-4")}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            className="first:rounded-tl-lg last:rounded-tr-lg"
                                        >
                                            <div className="flex h-11 items-center rounded-tl-lg rounded-tr-lg p-2 text-left">
                                                {column.render("Header")}
                                                <span className="heading-20-b">
                                                    {column.isSorted ? (
                                                        column.isSortedDesc ? (
                                                            <BiSortDown />
                                                        ) : (
                                                            <BiSortUp />
                                                        )
                                                    ) : null}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row)

                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        className={cl("group relative", {
                                            "even:bg-neutron-3": activeId !== row.id,
                                            "cursor-pointer hover:bg-hoverBg": onRowClick && activeId !== row.id,
                                            "bg-primary-2 text-neutron-4": activeId === row.id,
                                        })}
                                        onClick={() => handleRowClick(row)}
                                    >
                                        {row.cells.map((cell, index) => (
                                            <td
                                                {...cell.getCellProps()}
                                                className="h-11 p-2 group-last:first:rounded-bl-lg group-last:last:rounded-br-lg"
                                            >
                                                {cell.render("Cell")}
                                                {onEdit && index === headers.length - 1 && activeId === row.id && (
                                                    <i
                                                        className={cl(
                                                            "absolute right-3 top-[50%] h-[30px] w-[30px] translate-y-[-50%]",
                                                            "flex items-center justify-center rounded-full bg-accent-1 text-neutron-4",
                                                            "heading-20-b cursor-pointer",
                                                        )}
                                                        onClick={(e) => handleEdit(e, row)}
                                                    >
                                                        <HiPencil />
                                                    </i>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </>
                ) : (
                    <>
                        <thead className={cl({ "sticky top-0 z-10 bg-neutron-4": sticky })}>
                            {headerGroups.map((headerGroup) => (
                                <tr className="text-16-b text-left " {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            <div className="flex items-center p-2">
                                                {column.render("Header")}
                                                <span className="heading-20-b">
                                                    {column.isSorted ? (
                                                        column.isSortedDesc ? (
                                                            <BiSortDown />
                                                        ) : (
                                                            <BiSortUp />
                                                        )
                                                    ) : null}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row)

                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        className={cl(" rounded-md bg-neutron-4", {
                                            "cursor-pointer hover:bg-hoverBg": onRowClick,
                                        })}
                                        onClick={() => handleRowClick(row)}
                                    >
                                        {row.cells.map((cell) => (
                                            <td
                                                {...cell.getCellProps()}
                                                className={cl(
                                                    "h-11 border-t-[1px] border-b-[1px] border-primary-2 p-2 ",
                                                    "first:rounded-bl-lg first:rounded-tl-lg first:border-l-[1px]",
                                                    "last:rounded-br-lg last:rounded-tr-lg last:border-r-[1px]",
                                                )}
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </>
                )}
            </table>
        </div>
    )
}

export default Table
