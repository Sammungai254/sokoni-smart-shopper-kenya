import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { ShoppingItem } from '@/types/shopping';

interface AddItemFormProps {
  onAdd: (item: Omit<ShoppingItem, 'id'>) => void;
}

const categories = [
  'Fruits & Vegetables',
  'Dairy & Eggs',
  'Meat & Poultry',
  'Bakery',
  'Pantry',
  'Beverages',
  'Snacks',
  'Household',
  'Personal Care',
  'Other'
];

const units = ['pcs', 'kg', 'g', 'l', 'ml', 'pack', 'bottle', 'can'];

export const AddItemForm = ({ onAdd }: AddItemFormProps) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('pcs');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !category) {
      return;
    }

    onAdd({
      name: name.trim(),
      quantity,
      unit,
      category
    });

    // Reset form
    setName('');
    setQuantity(1);
    setUnit('pcs');
    setCategory('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Item
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                placeholder="Item name (e.g., Bananas)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                required
              />
            </div>
            
            <div>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={!name.trim() || !category}>
            Add to List
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};