import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingItem } from '@/types/shopping';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface ShoppingListItemProps {
  item: ShoppingItem;
  onUpdate: (id: string, updates: Partial<ShoppingItem>) => void;
  onRemove: (id: string) => void;
}

export const ShoppingListItemComponent = ({ item, onUpdate, onRemove }: ShoppingListItemProps) => {
  const updateQuantity = (delta: number) => {
    const newQuantity = Math.max(1, item.quantity + delta);
    onUpdate(item.id, { quantity: newQuantity });
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
      <div className="flex-1">
        <Input
          value={item.name}
          onChange={(e) => onUpdate(item.id, { name: e.target.value })}
          className="font-medium border-none px-0 h-auto bg-transparent focus-visible:ring-0"
          placeholder="Item name"
        />
        <div className="text-sm text-muted-foreground mt-1">
          {item.category}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(-1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <div className="w-12 text-center">
          <span className="font-medium">{item.quantity}</span>
          <div className="text-xs text-muted-foreground">{item.unit}</div>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};