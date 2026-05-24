interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 animate-fade-in">
      <div className="min-w-0 flex-1">
        <h1 className="text-xl sm:text-2xl font-bold text-primary break-words">{title}</h1>
        {description && <p className="text-neutral-500 mt-1 text-sm break-words">{description}</p>}
      </div>
      {action && <div className="w-full sm:w-auto sm:flex-shrink-0 [&_button]:w-full sm:[&_button]:w-auto">{action}</div>}
    </div>
  );
}
