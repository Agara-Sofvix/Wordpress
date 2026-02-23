import { ColumnDef, flexRender, getCoreRowModel, useReactTable, HeaderGroup, Row, Cell, Header } from '@tanstack/react-table';
import { motion } from 'framer-motion';

type Props<T> = {
    data: T[];
    columns: ColumnDef<T, any>[];
};

export function DataTable<T extends object>({ data, columns }: Props<T>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl bg-white/5 backdrop-blur-md">
            <table className="min-w-full divide-y divide-white/5">
                <thead className="bg-white/[0.03]">
                    {table.getHeaderGroups().map((headerGroup: HeaderGroup<T>) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header: Header<T, any>) => (
                                <th
                                    key={header.id}
                                    className="px-8 py-5 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-white/5">
                    {table.getRowModel().rows.map((row: Row<T>) => (
                        <motion.tr
                            key={row.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.1 }}
                            className="hover:bg-primary/[0.05] transition-colors"
                        >
                            {row.getVisibleCells().map((cell: Cell<T, any>) => (
                                <td key={cell.id} className="px-8 py-5 text-sm text-gray-300 font-medium">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
