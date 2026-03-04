import React from "react";

interface TableProps {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full">{children}</table>
    </div>
  );
};

interface TableHeaderProps {
  children: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return (
    <thead className="bg-card/50 border-b border-border">{children}</thead>
  );
};

interface TableBodyProps {
  children: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return <tbody className="divide-y divide-border">{children}</tbody>;
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
    <tr className={`hover:bg-card/30 transition-colors ${className}`}>
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
      className={`px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider ${className}`}
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
    <td className={`px-6 py-4 text-sm text-card-foreground ${className}`}>
      {children}
    </td>
  );
};
