import React from 'react'
import { Button } from './ui/Button'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              TidyCal
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            {['Dashboard', 'Projects', 'Time Tracking', 'Settings'].map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
