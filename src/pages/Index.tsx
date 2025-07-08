import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AddItemForm } from '@/components/AddItemForm';
import { ShoppingListItemComponent } from '@/components/ShoppingListItem';
import { useShoppingList } from '@/hooks/useShoppingList';
import { useLocation } from '@/hooks/useLocation';
import { MapPin, ShoppingCart, Store, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { nairobiFamilyMart } from '@/data/stores';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'stores' | 'recommendations'>('list');
  const { items, addItem, updateItem, removeItem, clearList, getTotalItems } = useShoppingList();
  const { location, loading: locationLoading, error: locationError, refetch } = useLocation();
  const { toast } = useToast();

  const handleLocationRefresh = () => {
    refetch();
    toast({
      title: "Location Updated",
      description: "Refreshing your current location...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Sokoni Smart Shopper
          </h1>
          <p className="text-primary-foreground/80 text-sm">
            Smart shopping for Nairobi families
          </p>
        </div>
      </div>

      {/* Location Status */}
      <div className="max-w-md mx-auto p-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {locationLoading ? 'Getting location...' : 
                   locationError ? 'Location unavailable' :
                   location ? 'Location found' : 'No location'}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLocationRefresh}>
                <Navigation className="h-4 w-4" />
              </Button>
            </div>
            {locationError && (
              <p className="text-xs text-destructive mt-1">{locationError}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-md mx-auto px-4">
        <div className="flex bg-muted rounded-lg p-1 mb-4">
          <Button
            variant={activeTab === 'list' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setActiveTab('list')}
          >
            Shopping List
            {items.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getTotalItems()}
              </Badge>
            )}
          </Button>
          <Button
            variant={activeTab === 'stores' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setActiveTab('stores')}
          >
            <Store className="h-4 w-4 mr-1" />
            Stores
          </Button>
          <Button
            variant={activeTab === 'recommendations' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setActiveTab('recommendations')}
            disabled={items.length === 0}
          >
            Recommendations
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 pb-8">
        {activeTab === 'list' && (
          <div className="space-y-4">
            <AddItemForm onAdd={addItem} />
            
            {items.length > 0 ? (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg">Your Shopping List</CardTitle>
                  <Button variant="outline" size="sm" onClick={clearList}>
                    Clear All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {items.map((item) => (
                    <ShoppingListItemComponent
                      key={item.id}
                      item={item}
                      onUpdate={updateItem}
                      onRemove={removeItem}
                    />
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">Your shopping list is empty</h3>
                  <p className="text-sm text-muted-foreground">
                    Add items above to get started with smart shopping recommendations
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'stores' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nearby Supermarkets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {nairobiFamilyMart.map((store) => (
                  <div key={store.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold">{store.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {store.location.address}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {store.deliveryOptions.available && (
                        <Badge variant="secondary">
                          Delivery: KSh {store.deliveryOptions.fee}
                        </Badge>
                      )}
                      <Badge variant="outline">
                        {store.contactInfo.phone}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Smart Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Add items to your shopping list to see recommendations
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">Coming Soon!</h3>
                    <p className="text-sm text-muted-foreground">
                      We're working on intelligent price comparison and store recommendations. 
                      This feature will help you find the best deals across Nairobi supermarkets.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
