'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ShoppingCart, Minus, Plus, X, Clock, User, Sun, Moon } from 'lucide-react'
import { useTheme } from "next-themes"
import { usePathname} from 'next/navigation'
import Image from 'next/image';


const menuItems = {
  breakfast: [
    { id: 1, name: 'Idli Sambar', description: 'South Indian steamed rice cakes with lentil soup', price: 50, image: '/images/breakfast/idli.jpg?height=200&width=300' },
    { id: 2, name: 'Masala Dosa', description: 'Crispy rice crepe with spiced potato filling', price: 100, image: '/images/breakfast/masaladosa.jpg?height=200&width=300' },
    { id: 3, name: 'Plain Dosa', description: 'Crispy rice crepe', price: 60, image: '/images/breakfast/dosa.jpg?height=200&width=300' },
    { id: 4, name: 'Aloo Paratha', description: 'Wheat flatbread stuffed with spiced potatoes', price: 70, image: '/images/breakfast/aalooparatha.png?height=200&width=300' },
    { id: 5, name: 'Poha', description: 'Flattened rice with spices and peanuts', price: 40, image: '/images/breakfast/Poha.jpg?height=200&width=300' },
    { id: 6, name: 'Upma', description: 'Savory semolina porridge', price: 50, image: '/images/breakfast/upma.png?height=200&width=300' },
    { id: 7, name: 'Vada (Medu Vada)', description: 'Crispy lentil doughnuts', price: 50, image: '/images/breakfast/vada.png?height=200&width=300' },
    { id: 8, name: 'Chole Bhature', description: 'Spiced chickpeas with fried bread', price: 100, image: '/images/breakfast/cholebh.jpg?height=200&width=300' },
    { id: 9, name: 'Puri Sabzi', description: 'Deep-fried bread with potato curry', price: 70, image: '/images/breakfast/purisabzi.jpg?height=200&width=300' },
    { id: 10, name: 'Omelette', description: 'Classic egg omelette', price: 50, image: '/images/breakfast/omlette.jpg?height=200&width=300' },
    { id: 11, name: 'Pongal', description: 'Rice and lentil porridge', price: 60, image: '/images/breakfast/pongal.jpg?height=200&width=300' },
    { id: 12, name: 'Dhokla', description: 'Steamed fermented rice and chickpea cake', price: 40, image: '/images/breakfast/dhokla.jpg?height=200&width=300' },
    { id: 13, name: 'Pav Bhaji', description: 'Spiced vegetable mash with buttered rolls', price: 100, image: '/images/breakfast/pavbhaji.jpg?height=200&width=300' },
    { id: 14, name: 'Tea (Chai)', description: 'Indian spiced tea', price: 15, image: '/images/breakfast/tea.jpg?height=200&width=300' },
    { id: 15, name: 'Filter Coffee', description: 'South Indian filter coffee', price: 40, image: '/images/breakfast/fcoffee.jpg?height=200&width=300' },
  ],
  lunch: [
    { id: 16, name: 'Dal Tadka', description: 'Tempered yellow lentils', price: 150, image: '/images/lunch/Dal-Tadka-2.jpg?height=200&width=300' },
    { id: 17, name: 'Paneer Butter Masala', description: 'Cottage cheese in rich tomato gravy', price: 220, image: '/images/lunch/Paneer-butter-masala.jpg?height=200&width=300' },
    { id: 18, name: 'Veg Biryani', description: 'Fragrant rice dish with mixed vegetables', price: 180, image: '/images/lunch/Veg-Biryani.jpg?height=200&width=300' },
    { id: 19, name: 'Butter Naan', description: 'Buttered flatbread', price: 40, image: '/images/lunch/Butter Naan.jpg?height=200&width=300' },
    { id: 20, name: 'Aloo Paratha', description: 'Wheat flatbread stuffed with spiced potatoes', price: 60, image: '/images/lunch/Aloo Paratha.jpg?height=200&width=300' },
    { id: 21, name: 'Jeera Rice', description: 'Cumin flavored rice', price: 120, image: '/images/lunch/jeera-rice.jpg?height=200&width=300' },
    { id: 22, name: 'Chicken Curry', description: 'Classic Indian chicken curry', price: 250, image: '/images/lunch/Chicken-Curry.jpg?height=200&width=300' },
    { id: 23, name: 'Mutton Rogan Josh', description: 'Kashmiri style lamb curry', price: 350, image: '/images/lunch/Mutton Rogan Josh.jpg?height=200&width=300' },
    { id: 24, name: 'Fish Fry', description: 'Crispy fried fish', price: 200, image: '/images/lunch/masala-fish-fry.jpg?height=200&width=300' },
    { id: 25, name: 'Raita (Yogurt)', description: 'Yogurt with mild spices and vegetables', price: 60, image: '/images/lunch/Boondi-Raita.jpg?height=200&width=300' },
    { id: 26, name: 'Gulab Jamun', description: 'Deep-fried milk solids in sugar syrup', price: 40, image: '/images/lunch/Gulab Jamun.jpeg?height=200&width=300' },
    { id: 27, name: 'Buttermilk', description: 'Spiced yogurt drink', price: 30, image: '/images/lunch/buttermilk.jpg?height=200&width=300' },
  ],
  snacks: [
    { id: 28, name: 'Samosa', description: 'Crispy pastry with savory filling', price: 15, image: '/images/snacks/Samosa.jpeg?height=200&width=300' },
    { id: 29, name: 'Kachori', description: 'Deep-fried pastry with spicy filling', price: 25, image: '/images/snacks/Kachori .jpeg?height=200&width=300' },
    { id: 30, name: 'Aloo Tikki', description: 'Crispy potato patties', price: 40, image: '/images/snacks/aloot.jpg?height=200&width=300' },
    { id: 31, name: 'Pani Puri (Gol Gappa)', description: 'Hollow crisp filled with flavored water', price: 30, image: '/images/snacks/Pani Puri.jpeg?height=200&width=300' },
    { id: 32, name: 'Pav Bhaji', description: 'Spiced vegetable mash with buttered rolls', price: 90, image: '/images/breakfast/pavbhaji.jpg?height=200&width=300' },
    { id: 33, name: 'Vada Pav', description: 'Spicy potato fritter in a bun', price: 30, image: '/images/snacks/Vada Pav.jpeg?height=200&width=300' },
    { id: 34, name: 'Pakora (Vegetable/Paneer)', description: 'Assorted fritters', price: 80, image: '/images/snacks/Bread Pakora.jpeg?height=200&width=300' },
    { id: 35, name: 'Chaat', description: 'Assorted savory snacks', price: 50, image: '/images/snacks/Bhelpuri.jpeg?height=200&width=300' },
    { id: 36, name: 'Masala Dosa', description: 'Crispy rice crepe with spiced potato filling', price: 100, image: '/images/breakfast/masaladosa.jpg?height=200&width=300' },
    { id: 37, name: 'Onion Bhaji (Pakora)', description: 'Crispy onion fritters', price: 60, image: '/images/snacks/Pakora onion.jpeg?height=200&width=300' },
    { id: 38, name: 'Dhokla', description: 'Steamed fermented rice and chickpea cake', price: 40, image: '/images/breakfast/dhokla.jpg?height=200&width=300' },
    { id: 39, name: 'Idli Sambar', description: 'South Indian steamed rice cakes with lentil soup', price: 60, image: '/images/breakfast/idli.jpg?height=200&width=300' },
    { id: 40, name: 'Tea (Chai)', description: 'Indian spiced tea', price: 15, image: '/images/breakfast/tea.jpg?height=200&width=300' },
    { id: 41, name: 'Cold Coffee', description: 'Chilled coffee beverage', price: 70, image: '/images/snacks/coldc.jpg?height=200&width=300' },
  ],
  dinner: [
    { id: 42, name: 'Tandoori Roti', description: 'Whole wheat flatbread', price: 30, image: '/images/dinner/Tandoori-Roti.jpg?height=200&width=300' },
    { id: 43, name: 'Butter Naan', description: 'Buttered flatbread', price: 40, image: '/images/dinner/Butter naan.jpg?height=200&width=300' },
    { id: 44, name: 'Shahi Paneer', description: 'Rich creamy cottage cheese curry', price: 220, image: '/images/dinner/Shahi Panner .jpeg?height=200&width=300' },
    { id: 45, name: 'Palak Paneer', description: 'Cottage cheese in spinach gravy', price: 200, image: '/images/dinner/Palak.jpg?height=200&width=300' },
    { id: 46, name: 'Dal Makhani', description: 'Creamy black lentils', price: 180, image: '/images/dinner/Dal Makhani.jpeg?height=200&width=300' },
    { id: 47, name: 'Chicken Tikka Masala', description: 'Grilled chicken in spiced tomato gravy', price: 260, image: '/images/dinner/Chicken tikk masla.jpg?height=200&width=300' },
    { id: 48, name: 'Mutton Biryani', description: 'Fragrant rice dish with tender mutton', price: 350, image: '/images/dinner/Mutton biryani.jpeg?height=200&width=300' },
    { id: 49, name: 'Paneer Tikka', description: 'Grilled cottage cheese with spices', price: 220, image: '/images/dinner/Paneer tika .jpeg?height=200&width=300' },
    { id: 50, name: 'Kadhai Chicken', description: 'Spicy chicken curry with bell peppers', price: 240, image: '/images/dinner/Kadai Chicken.jpeg?height=200&width=300' },
    { id: 51, name: 'Veg Pulao', description: 'Mildly spiced rice with vegetables', price: 150, image: '/images/dinner/Veg pulao.jpeg?height=200&width=300' },
    { id: 52, name: 'Mixed Veg Curry', description: 'Assorted vegetables in a spiced gravy', price: 180, image: '/images/dinner/vegetablec.jpg?height=200&width=300' },
    { id: 53, name: 'Rasgulla', description: 'Soft cheese balls in sugar syrup', price: 40, image: '/images/dinner/Rasgulla.jpeg?height=200&width=300' },
    { id: 54, name: 'Lassi (Sweet/Salted)', description: 'Traditional yogurt-based drink', price: 60, image: '/images/dinner/Lassi.jpeg?height=200&width=300' },
  ],
}

export default function Home() {
  return (
    <FoodCourtApp />
  )
}

function FoodCourtApp() {
  const [mounted, setMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('breakfast')
  const [cart, setCart] = useState<{ id: number; name: string; description: string; price: number; image: string; quantity: number }[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [timeSlots, setTimeSlots] = useState<{ time: string; seats: number }[]>([])
  const [orderHistory, setOrderHistory] = useState<{ id: number; items: { id: number; name: string; description: string; price: number; image: string; quantity: number; }[]; total: number; timeSlot: string; date: string; }[]>([])
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: 'Aman Khanna',
    photo: '/images/profile-pic.png?height=100&width=300',
    walletBalance: 1000.00
  })
  const [searchQuery, setSearchQuery] = useState('')
  const { toast } = useToast()
  const { theme = 'light', setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    setTimeSlots(generateTimeSlots(activeTab))
    
    // Check login state from localStorage
    const storedLoginState = localStorage.getItem('isLoggedIn')
    if (storedLoginState === 'true') {
      setIsLoggedIn(true)
      const storedUserInfo = localStorage.getItem('userInfo')
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo))
      }
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        setCart(JSON.parse(storedCart))
      }
      const storedOrderHistory = localStorage.getItem('orderHistory')
      if (storedOrderHistory) {
        setOrderHistory(JSON.parse(storedOrderHistory))
      }
    }
  }, [activeTab])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    if (!userId || !password) {
      setLoginError('Please enter both user ID and password.')
      return
    }

    if (userId === 'student' && password === 'password') {
      setIsLoggedIn(true)
      localStorage.setItem('isLoggedIn', 'true')
      
      // Retrieve stored user info and order history
      const storedUserInfo = localStorage.getItem('userInfo')
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo)
        setUserInfo(parsedUserInfo)
      } else {
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
      }

      const storedOrderHistory = localStorage.getItem('orderHistory')
      if (storedOrderHistory) {
        setOrderHistory(JSON.parse(storedOrderHistory))
      }

      toast({
        title: "Login Successful",
        description: "Welcome to QuickPlate!",
      })
    } else {
      setLoginError('Invalid user ID or password. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserId('')
    setPassword('')
    setCart([])
    setActiveTab('breakfast')
    setIsUserPanelOpen(false)
    localStorage.setItem('isLoggedIn', 'false')
    localStorage.removeItem('cart')
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const handleAddToCart = (item: { id: number; name: string; description: string; price: number; image: string }) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(cartItem => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }]
    }
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    toast({
      title: "Item Added",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleRemoveFromCart = (itemId: number) => {
    const updatedCart = cart.filter(item => item.id !== itemId)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(itemId)
    } else {
      const updatedCart = cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    if ((activeTab === 'lunch' || activeTab === 'dinner') && !selectedTimeSlot) {
      toast({
        title: "Time slot required",
        description: "Please select a time slot for your meal.",
        variant: "destructive",
      })
      return
    }

    const orderTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    if (orderTotal > userInfo.walletBalance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance to complete this order.",
        variant: "destructive",
      })
      return
    }

    const orderToken = Math.floor(100000 + Math.random() * 900000)
    const newOrder = {
      id: orderToken,
      items: cart,
      total: orderTotal,
      timeSlot: selectedTimeSlot,
      date: new Date().toLocaleString(),
    }

    const updatedOrderHistory = [newOrder, ...orderHistory]
    setOrderHistory(updatedOrderHistory)
    localStorage.setItem('orderHistory', JSON.stringify(updatedOrderHistory))

    const updatedUserInfo = {
      ...userInfo,
      walletBalance: userInfo.walletBalance - orderTotal
    }
    setUserInfo(updatedUserInfo)
    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo))

    toast({
      title: "Order Placed Successfully!",
      description: `Your order token is: ${orderToken}`,
    })

    setCart([])
    localStorage.setItem('cart', JSON.stringify([]))
    setIsCartOpen(false)
    setSelectedTimeSlot('')
  }

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const generateTimeSlots = (meal: string) => {
    const baseSlots = meal === 'lunch' 
      ? ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM','2:00 PM'] 
      : ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM','9:00 PM']
    
    return baseSlots.map(slot => ({
      time: slot,
      seats: Math.floor(Math.random() * 20) + 1
    }))
  }

  const filteredMenuItems = Object.entries(menuItems).reduce((acc: { [key: string]: typeof menuItems.breakfast }, [meal, items]) => {
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (filteredItems.length > 0) {
      acc[meal] = filteredItems
    }
    return acc
  }, {})

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return null
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-background text-foreground">
        <LoginForm onLogin={handleLogin} userId={userId} setUserId={setUserId} password={password} setPassword={setPassword} loginError={loginError} />
        <Footer />
        <Toaster />
      </div>
    )
  }

  let content;
  switch (pathname) {
    case '/about':
      content = <AboutPage />;
      break;
    case '/contact':
      content = <ContactPage />;
      break;
    default:
      content = (
        <main className="bg-background flex-grow">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                  <TabsTrigger value="lunch">Lunch</TabsTrigger>
                  <TabsTrigger value="snacks">Snacks</TabsTrigger>
                  <TabsTrigger value="dinner">Dinner</TabsTrigger>
                </TabsList>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                {Object.entries(filteredMenuItems).map(([meal, items]) => (
                  <TabsContent key={meal} value={meal}>
                    <MenuSection title={meal.charAt(0).toUpperCase() + meal.slice(1)} items={items} onAddToCart={handleAddToCart} />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </main>
      );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header 
        cart={cart} 
        isCartOpen={isCartOpen} 
        setIsCartOpen={setIsCartOpen} 
        onLogout={handleLogout}
        setIsUserPanelOpen={setIsUserPanelOpen}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      {content}
      <Footer />
      <CartDialog
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        activeTab={activeTab}
        timeSlots={timeSlots}
        selectedTimeSlot={selectedTimeSlot}
        setSelectedTimeSlot={setSelectedTimeSlot}
        totalAmount={totalAmount}
        onCheckout={handleCheckout}
      />
      <UserAccountPanel
        isOpen={isUserPanelOpen}
        onOpenChange={setIsUserPanelOpen}
        userInfo={userInfo}
        orderHistory={orderHistory}
      />
      <Toaster />
    </div>
  )
}

function LoginForm({ onLogin, userId, setUserId, password, setPassword, loginError }: { 
  onLogin: (e: React.FormEvent) => void; 
  userId: string; 
  setUserId: React.Dispatch<React.SetStateAction<string>>; 
  password: string; 
  setPassword: React.Dispatch<React.SetStateAction<string>>; 
  loginError: string 
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Student Login</CardTitle>
          <CardDescription>Enter your credentials to access the food court system.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userId">User ID</Label>
                <Input 
                  id="userId" 
                  placeholder="Enter your user ID" 
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}
            <Button className="w-full mt-4" type="submit">Log in</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

interface HeaderProps {
  cart: { id: number; name: string; description: string; price: number; image: string; quantity: number }[];
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
  setIsUserPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
  theme: string;
}

function Header({ cart, isCartOpen, setIsCartOpen, onLogout, setIsUserPanelOpen, toggleTheme, theme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">QuickPlate</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/">Home</a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/about">About</a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/contact">Contact</a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Cart ({cart.length})
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button variant="outline" onClick={() => setIsUserPanelOpen(true)} className="flex items-center">
              <User className="mr-2 h-4 w-4" /> Account
            </Button>
            <Button variant="ghost" onClick={onLogout}>Log out</Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

function SearchBar({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <div className="mt-4">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search menu items..."
          className="w-full pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  )
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

function MenuSection({ title, items, onAddToCart }: MenuSectionProps) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <Image src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-lg font-semibold">₹{item.price.toFixed(2)}</span>
                <Button onClick={() => onAddToCart(item)}>Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface CartDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  cart: { id: number; name: string; description: string; price: number; image: string; quantity: number }[];
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onRemoveFromCart: (itemId: number) => void;
  activeTab: string;
  timeSlots: { time: string; seats: number }[];
  selectedTimeSlot: string;
  setSelectedTimeSlot: (timeSlot: string) => void;
  totalAmount: number;
  onCheckout: () => void;
}

function CartDialog({ isOpen, onOpenChange, cart, onUpdateQuantity, onRemoveFromCart, activeTab, timeSlots, selectedTimeSlot, setSelectedTimeSlot, totalAmount, onCheckout }: CartDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
          <DialogDescription>
            Review your items and proceed to checkout.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[60vh]">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Image src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        {(activeTab === 'lunch' || activeTab === 'dinner') && (
          <div className="mt-4">
            <Label htmlFor="timeSlot"></Label>
            <Select onValueChange={setSelectedTimeSlot} value={selectedTimeSlot}>
              <SelectTrigger id="timeSlot">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) =>
                  <SelectItem key={slot.time} value={slot.time}>
                    {slot.time} - {slot.seats} seats available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        )}
        <DialogFooter className="mt-6">
          <div className="flex justify-between items-center w-full mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
          </div>
          <Button onClick={onCheckout} className="w-full">
            Checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface UserAccountPanelProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  userInfo: {
    name: string;
    photo: string;
    walletBalance: number;
  };
  orderHistory: {
    id: number;
    items: { id: number; name: string; description: string; price: number; image: string; quantity: number }[];
    total: number;
    timeSlot: string;
    date: string;
  }[];
}

function UserAccountPanel({ isOpen, onOpenChange, userInfo, orderHistory }: UserAccountPanelProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>User Account</DialogTitle>
          <DialogDescription>
            View your account information and order history.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Account Info</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <div className="flex items-center space-x-4 mt-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={userInfo.photo} alt={userInfo.name} />
                <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{userInfo.name}</h3>
                <p className="text-sm text-muted-foreground">Wallet Balance: ₹{userInfo.walletBalance.toFixed(2)}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="history">
            <ScrollArea className="h-[300px] mt-4">
              {orderHistory.length === 0 ? (
                <p className="text-center text-muted-foreground">No order history available.</p>
              ) : (
                orderHistory.map((order) => (
                  <Card key={order.id} className="mb-4">
                    <CardHeader>
                      <CardTitle>Order #{order.id}</CardTitle>
                      <CardDescription>{order.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id} className="flex justify-between">
                            <span>{item.name} x{item.quantity}</span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹{order.total.toFixed(2)}</span>
                      </div>
                      {order.timeSlot && (
                        <Badge className="mt-2">
                          <Clock className="mr-1 h-3 w-3" />
                          {order.timeSlot}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">QuickPlate</h2>
            <p className="mt-2">Delicious food, delivered fast.</p>
          </div>
          <div className="text-center md:text-right">
            <p>Made by Aman Khanna</p>
            <p>Email: aamankhanna1112@gmail.com</p>
            <p>Phone: +91 9039242459</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 QuickPlate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function AboutPage() {
  return (
    <main className="bg-background flex-grow">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold mb-4">About QuickPlate</h1>
          <p className="mb-4">
          QuickPlate is a seamless and intuitive food court management platform designed to simplify your dining experience. Our goal is to make ordering food easier, faster, and more efficient for everyone.
          </p>
          <p className="mb-4">
  Whether you&apos;re a student, staff member, or visitor, QuickPlate allows you to browse a wide variety of menu options from different vendors. You can select your preferred meal and convenient time slots with just a few clicks.
</p>
          <p className="mb-4">
          Say goodbye to long queues and waiting times! QuickPlate ensures a smooth ordering process, so you can focus on enjoying your meal without the hassle.
          </p>
          <p>Join us in revolutionizing the food court experience, where delicious meals are just a tap away.</p>
        </div>
      </div>
    </main>
  )
}

function ContactPage() {
  return (
    <main className="bg-background flex-grow">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="mb-4">
  We&apos;re here to help! If you have any questions, concerns, or feedback about QuickPlate, please don&apos;t hesitate to reach out to us.
</p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Customer Support</h2>
            <p>Email: support@quickplate.com</p>
            <p>Phone: +91 9039242458 </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Business Inquiries</h2>
            <p>Email: business@quickplate.com</p>
            <p>Phone: +91 9039242458</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Office Address</h2>
            <p>QuickPlate Headquarters</p>
            <p>VIT Chennai</p>
            <p>Vandalur Kelambakkam Road 600127</p>
            <p>Tamil Nadu</p>
          </div>
        </div>
      </div>
    </main>
  )
}