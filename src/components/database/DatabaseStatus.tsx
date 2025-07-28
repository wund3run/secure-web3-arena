import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Database, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { withErrorHandling } from '@/utils/apiErrorHandler';

interface TableStatus {
  name: string;
  rowCount: number;
  status: 'active' | 'error' | 'empty';
  error?: string;
}

type TableName = 'profiles' | 'extended_profiles' | 'services' | 'audit_requests' | 'escrow_contracts' | 'reviews' | 'transactions' | 'milestones' | 'disputes';

export function DatabaseStatus() {
  const [tableStatuses, setTableStatuses] = useState<TableStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const tables: TableName[] = [
    'profiles',
    'extended_profiles', 
    'services',
    'audit_requests',
    'escrow_contracts',
    'reviews',
    'transactions',
    'milestones',
    'disputes'
  ];

  const checkTableStatus = async () => {
    setLoading(true);
    console.log("Checking database table statuses...");
    
    const statuses: TableStatus[] = [];
    
    for (const tableName of tables) {
      try {
        const { count, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          statuses.push({
            name: tableName,
            rowCount: 0,
            status: 'error',
            error: error.message
          });
        } else {
          statuses.push({
            name: tableName,
            rowCount: count || 0,
            status: count === 0 ? 'empty' : 'active'
          });
        }
      } catch (err: unknown) {
        statuses.push({
          name: tableName,
          rowCount: 0,
          status: 'error',
          error: err instanceof Error ? err.message : String(err)
        });
      }
    }
    
    setTableStatuses(statuses);
    setLastChecked(new Date());
    setLoading(false);
    
    const errorCount = statuses.filter(s => s.status === 'error').length;
    if (errorCount === 0) {
      toast.success(`Database check complete - all ${tables.length} tables accessible`);
    } else {
      toast.warning(`Database check complete - ${errorCount} tables have issues`);
    }
  };

  useEffect(() => {
    checkTableStatus();
  }, [checkTableStatus]);

  const getStatusBadge = (status: TableStatus['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'empty':
        return <Badge variant="secondary">Empty</Badge>;
      case 'error':
        return <Badge variant="error">Error</Badge>;
    }
  };

  const getStatusIcon = (status: TableStatus['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'empty':
        return <Database className="h-4 w-4 text-gray-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <div>
            <CardTitle>Database Status</CardTitle>
            {lastChecked && (
              <p className="text-sm text-muted-foreground">
                Last checked: {lastChecked.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <Button 
          onClick={checkTableStatus}
          disabled={loading}
          size="sm"
          variant="outline"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tableStatuses.map((table) => (
            <div 
              key={table.name}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-2">
                {getStatusIcon(table.status)}
                <div>
                  <p className="font-medium text-sm">{table.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {table.status === 'error' ? 'Error' : `${table.rowCount} rows`}
                  </p>
                  {table.error && (
                    <p className="text-xs text-red-600 mt-1">{table.error}</p>
                  )}
                </div>
              </div>
              {getStatusBadge(table.status)}
            </div>
          ))}
        </div>
        
        {loading && (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Checking database status...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
