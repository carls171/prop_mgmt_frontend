import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { propertyService, incomeService, expenseService, reportService } from '@/services/api';
import { Property, Income, Expense, NetIncome } from '@/types';
import { Loader2, ArrowLeft, Plus, Trash2, Edit, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const propertyId = parseInt(id || '0');

  const [property, setProperty] = useState<Property | null>(null);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [netIncome, setNetIncome] = useState<NetIncome | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [newIncome, setNewIncome] = useState({ amount: 0, date: format(new Date(), 'yyyy-MM-dd'), description: '' });
  const [newExpense, setNewExpense] = useState({ amount: 0, date: format(new Date(), 'yyyy-MM-dd'), category: '', vendor: '', description: '' });

  useEffect(() => {
    if (propertyId) {
      fetchData();
    }
  }, [propertyId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [propRes, incRes, expRes, netRes] = await Promise.all([
        propertyService.getById(propertyId),
        incomeService.getByPropertyId(propertyId),
        expenseService.getByPropertyId(propertyId),
        reportService.getNetIncome(propertyId),
      ]);
      setProperty(propRes.data);
      setIncomes(incRes.data);
      setExpenses(expRes.data);
      setNetIncome(netRes.data);
    } catch (err) {
      console.error('Failed to fetch property details:', err);
      toast.error('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await incomeService.create(propertyId, newIncome);
      toast.success('Income record added');
      setIsIncomeDialogOpen(false);
      setNewIncome({ amount: 0, date: format(new Date(), 'yyyy-MM-dd'), description: '' });
      fetchData();
    } catch (err) {
      toast.error('Failed to add income');
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await expenseService.create(propertyId, newExpense);
      toast.success('Expense record added');
      setIsExpenseDialogOpen(false);
      setNewExpense({ amount: 0, date: format(new Date(), 'yyyy-MM-dd'), category: '', vendor: '', description: '' });
      fetchData();
    } catch (err) {
      toast.error('Failed to add expense');
    }
  };

  const handleDeleteIncome = async (incomeId: number) => {
    if (!window.confirm('Are you sure you want to delete this income record?')) return;
    try {
      await incomeService.delete(propertyId, incomeId);
      toast.success('Income record deleted');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete income');
    }
  };

  const handleDeleteProperty = async () => {
    if (!window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) return;
    try {
      await propertyService.delete(propertyId);
      toast.success('Property deleted');
      navigate('/');
    } catch (err) {
      toast.error('Failed to delete property');
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!property) return <div>Property not found</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/')} className="text-slate-500">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <div className="flex gap-2">
          <Link to={`/properties/${propertyId}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </Link>
          <Button variant="destructive" onClick={handleDeleteProperty}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">{property.name}</h1>
            <div className="flex flex-wrap gap-4 text-slate-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {property.address}, {property.city}, {property.state} {property.postal_code}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" /> {property.tenant_name}
              </div>
            </div>
          </div>

          <Tabs defaultValue="income" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1">
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="income" className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Income History</h3>
                <Dialog open={isIncomeDialogOpen} onOpenChange={setIsIncomeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-slate-900 text-white">
                      <Plus className="mr-2 h-4 w-4" /> Record Payment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Record Rent Payment</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddIncome} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount ($)</Label>
                        <Input
                          id="amount"
                          type="number"
                          required
                          value={newIncome.amount}
                          onChange={(e) => setNewIncome({ ...newIncome, amount: parseFloat(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          required
                          value={newIncome.date}
                          onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="desc">Description</Label>
                        <Input
                          id="desc"
                          placeholder="e.g. April Rent"
                          value={newIncome.description}
                          onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-slate-900 text-white">Save Record</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50">
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                          No income records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      incomes.map((inc) => (
                        <TableRow key={inc.income_id}>
                          <TableCell className="font-medium">{format(new Date(inc.date), 'MMM d, yyyy')}</TableCell>
                          <TableCell>{inc.description}</TableCell>
                          <TableCell className="text-right font-semibold text-green-600">
                            ${inc.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-slate-400 hover:text-red-600"
                              onClick={() => handleDeleteIncome(inc.income_id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="expenses" className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Expense Logs</h3>
                <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-slate-900 text-white">
                      <Plus className="mr-2 h-4 w-4" /> Record Expense
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Record New Expense</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddExpense} className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="exp-amount">Amount ($)</Label>
                          <Input
                            id="exp-amount"
                            type="number"
                            required
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="exp-date">Date</Label>
                          <Input
                            id="exp-date"
                            type="date"
                            required
                            value={newExpense.date}
                            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          placeholder="e.g. Maintenance, Insurance"
                          required
                          value={newExpense.category}
                          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vendor">Vendor</Label>
                        <Input
                          id="vendor"
                          placeholder="e.g. Home Depot"
                          value={newExpense.vendor}
                          onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exp-desc">Description</Label>
                        <Input
                          id="exp-desc"
                          value={newExpense.description}
                          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-slate-900 text-white">Save Record</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50">
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                          No expense records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      expenses.map((exp) => (
                        <TableRow key={exp.expense_id}>
                          <TableCell className="font-medium">{format(new Date(exp.date), 'MMM d, yyyy')}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                              {exp.category}
                            </span>
                          </TableCell>
                          <TableCell>{exp.vendor}</TableCell>
                          <TableCell className="text-right font-semibold text-red-600">
                            ${exp.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-none bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-slate-500">Financial Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-xs text-slate-400">Monthly Rent</div>
                <div className="text-3xl font-light text-slate-900">${property.monthly_rent.toLocaleString()}</div>
              </div>
              <div className="h-px bg-slate-100" />
              <div>
                <div className="text-xs text-slate-400">Net Income (All Time)</div>
                <div className={`text-3xl font-semibold ${netIncome && netIncome.net_income >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${netIncome ? netIncome.net_income.toLocaleString() : '0'}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-slate-500">Property Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Type</span>
                <span className="font-medium">{property.property_type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Tenant</span>
                <span className="font-medium">{property.tenant_name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">City</span>
                <span className="font-medium">{property.city}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
