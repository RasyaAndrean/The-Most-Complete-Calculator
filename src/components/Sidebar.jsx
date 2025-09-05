import { 
  Calculator, 
  Function, 
  Ruler, 
  DollarSign, 
  BarChart3, 
  Atom, 
  Zap,
  TrendingUp,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const categories = [
  { id: 'basic', name: 'Kalkulator Dasar', icon: Calculator },
  { id: 'scientific', name: 'Kalkulator Ilmiah', icon: Function },
  { id: 'math', name: 'Rumus Matematika', icon: Function },
  { id: 'physics', name: 'Rumus Fisika', icon: Zap },
  { id: 'chemistry', name: 'Rumus Kimia', icon: Atom },
  { id: 'converter', name: 'Konversi Satuan', icon: Ruler },
  { id: 'financial', name: 'Kalkulator Finansial', icon: DollarSign },
  { id: 'statistics', name: 'Statistik', icon: BarChart3 },
  { id: 'graphing', name: 'Grafik Fungsi', icon: TrendingUp },
]

export function Sidebar({ activeCategory, setActiveCategory }) {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-4">
      <nav className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveCategory(category.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {category.name}
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}

