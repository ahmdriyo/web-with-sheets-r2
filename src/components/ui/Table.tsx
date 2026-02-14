import React from "react";

interface TableProps {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full">{children}</table>
    </div>
  );
};

interface TableHeaderProps {
  children: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return (
    <thead className="bg-zinc-900/50 border-b border-zinc-800">
      {children}
    </thead>
  );
};

interface TableBodyProps {
  children: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return <tbody className="divide-y divide-zinc-800">{children}</tbody>;
};

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className = "",
}) => {
  return (
    <tr className={`hover:bg-zinc-900/30 transition-colors ${className}`}>
      {children}
    </tr>
  );
};

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

export const TableHead: React.FC<TableHeadProps> = ({
  children,
  className = "",
}) => {
  return (
    <th
      className={`px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className = "",
}) => {
  return (
    <td className={`px-6 py-4 text-sm text-zinc-300 ${className}`}>
      {children}
    </td>
  );
};
