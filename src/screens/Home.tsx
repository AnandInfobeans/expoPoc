import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
// NOTE: These imports are required for a real Expo/React Native app.
// They may cause compilation errors in a web-only environment like this one.
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

// Configuration for API and colors
const API_URL = 'https://fakestoreapi.com/products';
const PRIMARY_COLOR =  '#1a691fff' ;//'#1a691fff' ; //'#1A3B69'; // Tomato Red for "Quick Buy"
const SECONDARY_COLOR = '#97c3efff'; // Steel Blue for buttons
const TEXT_COLOR = '#1F2937'; // Dark gray

// --- Component: ProductCard ---
// Displays a single product item using React Native components
const ProductCard = React.memo(({ product, onAddToCart }) => (
  <View style={styles.card}>
    <Image
      style={styles.productImage}
      source={{ 
        uri: product.image,
      }}
      resizeMode="contain"
    />
    <View style={styles.cardDetails}>
      <Text style={styles.productTitle} numberOfLines={2}>
        {product.title}
      </Text>
      <Text style={styles.productCategory}>{product.category}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.productRatingText}>
            {product.rating.rate} 
          </Text>
          <Text style={styles.starIcon}>⭐</Text>
          <Text style={styles.ratingCount}> ({product.rating.count})</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => onAddToCart(product)}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  </View>
));

// --- Main Component: App ---
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // NOTE: This hook needs to be wrapped in a conditional check for web environments 
  // or a mock provider if running on the web, but for native code, it is essential.
  // We'll assume the provider is set up in a real Expo environment.
  const insets = useSafeAreaInsets ? useSafeAreaInsets() : { top: 0 }; 

  // Function to fetch data from the open API with exponential backoff
  const fetchProducts = useCallback(async () => {
    try {
      setProducts([]); 
      setLoading(true);
      const maxRetries = 3;
      let response;
      for (let i = 0; i < maxRetries; i++) {
        try {
          response = await fetch(API_URL);
          if (response.ok) break; 
        } catch (error) {
          if (i < maxRetries - 1) {
            const delay = Math.pow(2, i) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
          } else {
            throw error; 
          }
        }
      }
      
      if (!response || !response.ok) {
        throw new Error(`HTTP error! status: ${response ? response.status : 'Network Failed'}`);
      }

      const data = await response.json();
      setProducts(data);

    } catch (error) {
      console.error('Failed to fetch products:', error);
      Alert.alert("Error", "Could not load products. Please check your network and refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handler for adding a product to the cart (simulated)
  const handleAddToCart = useCallback((product) => {
    Alert.alert(
      "Added to Cart",
      `"${product.title.substring(0, 30)}..." has been added to your cart!`
    );
  }, []);

  // Render function for each item in the FlatList
  const renderProduct = ({ item }) => (
    <ProductCard product={item} onAddToCart={handleAddToCart} />
  );

  // Conditional Rendering for Loading State
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    // SafeAreaView handles padding for device notches/bars
    <View
        style={[styles.safeArea]}
        >
      <View style={[styles.header,  {paddingTop: insets.top + 20}]}>
        <Text style={styles.headerTitle}>Quick Buy</Text>
        <Text style={styles.headerSubtitle}>Discover Your Next Favorite Thing</Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text >No products found. Try refreshing.</Text>
            <TouchableOpacity onPress={fetchProducts}>
              <Text >Refresh</Text>
            </TouchableOpacity>
          </View>
        )}
      />
        </View>
  );
}

// --- Stylesheet for Components (Using RN StyleSheet) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR, // Light gray background
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10, 
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  header: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // Native shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FEE2E2', 
    textAlign: 'center',
    marginTop: 4,
    fontStyle: 'italic',
  },
  listContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    // Native shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#E5E7EB', // Placeholder color
  },
  cardDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 12,
    color: '#6B7280', 
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: PRIMARY_COLOR,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productRatingText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  starIcon: {
    fontSize: 10, // Adjust size for the emoji
    marginLeft: 2,
  },
  ratingCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  addButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
  }
})
