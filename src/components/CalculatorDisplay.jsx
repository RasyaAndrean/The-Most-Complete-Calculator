import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

export function CalculatorDisplay({ title, children }) {
  return (
    <div className="flex-1 p-6">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

