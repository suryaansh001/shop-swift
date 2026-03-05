'use client';

import { useState, useEffect } from 'react';
import { Edit2, Lock, Unlock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/components/AdminLayout';
export type CustomerCredit = {
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  creditLimit: number;
  creditUsed: number;
  status: 'active' | 'blocked';
};

export const SAMPLE_CUSTOMER_CREDITS: CustomerCredit[] = [
  {
    customerId: 'CUST-001',
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234-567-8900',
    creditLimit: 50000,
    creditUsed: 15000,
    status: 'active',
  },
  {
    customerId: 'CUST-002',
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 987-654-3210',
    creditLimit: 100000,
    creditUsed: 85000,
    status: 'active',
  },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerCredit[]>(SAMPLE_CUSTOMER_CREDITS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<CustomerCredit>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEdit = (customer: CustomerCredit) => {
    setEditingId(customer.customerId);
    setEditData(customer);
  };

  const handleSave = (customerId: string) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((c) =>
        c.customerId === customerId ? { ...c, ...editData } : c
      )
    );
    setEditingId(null);
  };

  const toggleBlockStatus = (customerId: string) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((c) =>
        c.customerId === customerId
          ? { ...c, status: c.status === 'active' ? 'blocked' : 'active' }
          : c
      )
    );
  };

  const getRemainingCredit = (customer: CustomerCredit) => {
    return customer.creditLimit - customer.creditUsed;
  };

  const getUtilizationPercentage = (customer: CustomerCredit) => {
    return (customer.creditUsed / customer.creditLimit) * 100;
  };

  if (!mounted) return null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Premium Feature Banner */}
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-yellow-900 dark:text-yellow-100 text-sm">
              Customer Credit Management is a Premium Feature
            </p>
            <p className="text-xs text-yellow-800 dark:text-yellow-200 mt-1">
              Customer login/signup and automated credit tracking will only be enabled in the premium version.
            </p>
          </div>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Credits</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer credit accounts and limits
          </p>
        </div>

        {/* Customers Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Credit Limit
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Used
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Remaining
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {customers.map((customer) => (
                  <tr
                    key={customer.customerId}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {customer.customerName}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground text-ellipsis">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {editingId === customer.customerId ? (
                        <Input
                          type="number"
                          value={editData.creditLimit || 0}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              creditLimit: Number(e.target.value),
                            })
                          }
                          className="w-32 text-sm"
                        />
                      ) : (
                        `₹${customer.creditLimit.toLocaleString('en-IN')}`
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      ₹{customer.creditUsed.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-accent">
                          ₹{getRemainingCredit(customer).toLocaleString('en-IN')}
                        </p>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${getUtilizationPercentage(customer) > 80
                              ? 'bg-destructive'
                              : 'bg-green-500'
                              }`}
                            style={{
                              width: `${Math.min(
                                getUtilizationPercentage(customer),
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${customer.status === 'active'
                          ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                          : 'bg-red-500/20 text-red-700 dark:text-red-400'
                          }`}
                      >
                        {customer.status === 'active' ? 'Active' : 'Blocked'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2 flex">
                      {editingId === customer.customerId ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleSave(customer.customerId)}
                            className="bg-accent hover:bg-accent/90 text-accent-foreground text-xs"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                            className="text-xs"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(customer)}
                            className="text-xs"
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleBlockStatus(customer.customerId)}
                            className={`text-xs ${customer.status === 'blocked'
                              ? 'text-green-600 dark:text-green-400 hover:bg-green-500/10'
                              : 'text-red-600 dark:text-red-400 hover:bg-red-500/10'
                              }`}
                          >
                            {customer.status === 'blocked' ? (
                              <Unlock className="w-3 h-3" />
                            ) : (
                              <Lock className="w-3 h-3" />
                            )}
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-muted/30 border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Credit System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-foreground mb-2">
                <strong>Credit Limit:</strong> Maximum amount a customer can purchase on credit
              </p>
              <p className="text-sm text-foreground">
                <strong>Credit Used:</strong> Current outstanding balance of the customer
              </p>
            </div>
            <div>
              <p className="text-sm text-foreground mb-2">
                <strong>Remaining Credit:</strong> Available credit for new purchases
              </p>
              <p className="text-sm text-foreground">
                <strong>Status:</strong> Active customers can place orders, Blocked customers cannot
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
