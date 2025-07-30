import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T;
    render?: (value: any) => React.ReactNode;
  }[];
  className?: string;
}

export function DataTable<T>({ data, columns, className }: DataTableProps<T>) {
  return (
    <div className={`w-full overflow-auto ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {columns.map((column, j) => (
                <TableCell key={`${i}-${j}`}>
                  {column.render
                    ? column.render(row[column.accessorKey])
                    : row[column.accessorKey] as React.ReactNode}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
