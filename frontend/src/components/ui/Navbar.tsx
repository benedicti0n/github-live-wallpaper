import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { LucideIcon, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react"
import { GlowEffect } from "./glow-effect"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-30 bg-background border border-border backdrop-blur-lg py-1 px-1.5 rounded-full shadow-lg">

        <div className="flex items-center gap-1">
          <img src="/logo.png" alt="" className="w-10" />
          <h1 className="text-sm font-semibold">GitPaper</h1>
        </div>

        <div>
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                  "text-foreground/80 hover:text-primary",
                  isActive && "bg-muted text-primary",
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                      <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>


        <div className="relative">
          <SignedOut>
            <GlowEffect
              colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
              mode='colorShift'
              blur='soft'
              duration={3}
              scale={0.9}
            />
            <SignInButton>
              <button className="relative bg-background cursor-pointer text-sm font-semibold px-6 py-2 gap-2 rounded-full flex items-center justify-center">
                <h1>SignIn</h1>
                <ArrowRight size={18} strokeWidth={2} />
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <GlowEffect
              colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
              mode='colorShift'
              blur='soft'
              duration={3}
              scale={0.9}
            />
            <button className="relative bg-background cursor-pointer text-sm font-semibold rounded-full flex items-center justify-center">
              <UserButton />
            </button>
          </SignedIn>
        </div>
      </div>
    </div>
  )
}
