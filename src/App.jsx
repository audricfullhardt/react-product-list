import { useState } from "react"
import { Input } from "./components/forms/input"
import { Checkbox } from "./components/forms/checkbox"
import { ProductCategoryRaw } from "./components/forms/products/ProductCategoryRaw"
import { ProductRaw } from "./components/forms/products/ProductRaw"
import { Range } from "./components/forms/Range"

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function App() {

  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [range, setRange] = useState(0)

  const visibleProducts = PRODUCTS.filter(product => {
    if (showStockedOnly && !product.stocked) {
      return false
    }
  
    // if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
    //   return false
    // }
    if (range > 0 && parseFloat(product.price.replace('$', '')) > Number(range)) {
      return false
    } 
  
    return true
  })
  

  return <div className="container my-3">
    <SearchBar
      search={search}
      onSearchChange={setSearch}
      showStockedOnly={showStockedOnly} 
      onStockedOnlyChange={setShowStockedOnly}
      range={range}
      onRangeChange={setRange}
    />
    <ProductTable products={visibleProducts}/>
  </div>
}

function SearchBar ({showStockedOnly, onStockedOnlyChange, search, onSearchChange, range, onRangeChange}) {
  return <div>
    <div className="mb-3">
      <Input 
        value={search} 
        onChange={onSearchChange} 
        placeholder="Rechercher"
      />
      <Range
        min={1}
        max={5}
        value={range}
        onChange={onRangeChange}
      />
      <Checkbox 
        id="stocked" 
        checked={showStockedOnly} 
        onChange={onStockedOnlyChange} 
        label="N'afficher que les produits en stock"
      />
    </div>
  </div>
}

function ProductTable ({products}){

  const rows = []
  let lastCategory = null

  for (let product of products){
    if (product.category !== lastCategory){
      rows.push(<ProductCategoryRaw key={product.category} name={product.category}/>)
    }
    lastCategory = product.category
    rows.push(<ProductRaw product={product} key={product.name}/>)
  }

  return <table className="table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
}

export default App
